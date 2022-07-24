var loading = null;
var visuals_list = null;
var downloading_panel = false;

function convertDate(date) {
    date_parts = date.split("-");
    return date ? date_parts[1] + '/' + date_parts[2] + '/' + date_parts[0] : '';
}

// Init Visuals
function initVisuals(view) {
    visuals_content = document.getElementById('visuals-content');
    loading = document.getElementById('loading');
    visual_filters = document.getElementById('visual-filters');
    new_visual_button = document.getElementById('new-visual-button');
    loading.style.display = 'block';
    getJwtToken({}).then(res => {
        const qvtoken = res;
        getVisuals().then(res => {
            visuals_list = [...res.Items];
            visuals_content.innerHTML = getVisualsDashboard(res.Items, view, qvtoken);
            loading.style.display = 'none';
            visual_filters.style.display = 'block';
            new_visual_button.style.display = 'block';
        });
    });
}

function newVisual() {
    loading.style.display = 'block';
    getJwtToken({}).then(res => {
        loading.style.display = 'none';
        var config = {
            domain: DOMAIN,
            qv_token: res,
            qrveyid: QRVEY_ID,
            isNew: true
        }
        window.dispatchEvent(new CustomEvent('ON_OPEN_CHART_BUILDER', {
            detail: config
        }));
    });
}

function editVisual(chartid) {
    loading.style.display = 'block';
    getVisual(chartid).then(res => {
        var chart_model = res;
        getJwtToken({}).then(res => {
            loading.style.display = 'none';
            var config = {
                ...chart_model,
                domain: DOMAIN,
                qv_token: res,
                qrveyid: QRVEY_ID,
                isNew: false,
                chartid: chartid
            }
            window.dispatchEvent(new CustomEvent('ON_OPEN_CHART_BUILDER', {
                detail: config
            }));
        });
    });
}

function favVisual(chartid, favorite) {
    loading.style.display = 'block';
    favorite_element = document.getElementById('fav-' + chartid);
    getVisual(chartid).then(res => {
        let visual_body = res;
        visual_body['favorite_visual'] = !favorite;
        updateVisual(visual_body).then(res => {
            loading.style.display = 'none';
            favorite_element.innerHTML = `<span onclick="favVisual('${visual_body.chartid}',${visual_body.favorite_visual ? true : false})">${visual_body.favorite_visual ? '★' : '☆'}</span>`;
            updateLocalChartConfig(visual_body);
        })
    })
}


function filterVisuals() {
    filter_value = document.getElementById('visual-filters').value;
    visual_content = document.getElementById('visuals-content');
    new_list = null;
    switch (filter_value) {
        case 'favorites':
            let favorites = visuals_list.filter(r => r.favorite_visual);
            let not_favorites = visuals_list.filter(r => !r.favorite_visual);
            new_list = favorites.concat(not_favorites);
            break;
        case 'a-z':
            new_list = visuals_list.sort((a, b) => (a.name > b.name) ? 1 : -1);
            break;
        case 'created':
            new_list = visuals_list.sort((a, b) => (a.createDate < b.createDate) ? 1 : -1);
            break;

        default:
            new_list = [...visuals_list];
            break;
    }
    visual_content.innerHTML = getVisualsDashboard(new_list);
}

function deleteVisualConfirmation(chartid, name) {
    if (confirm('Are you sure you want to delete "' + name.replace("|", "'") + '" visual?')) {
        loading.style.display = 'block';
        deleteVisual(chartid).then(res => {
            visuals_list = visuals_list.filter(r => r.chartid != chartid);
            filterVisuals();
            loading.style.display = 'none';
        })
    }
}

function donwloadVisualJPEG(chartid, chartname) {
    downloading_panel = true;
    loading.style.display = 'block';
    loading.querySelector('span').innerHTML = `DOWNLOADING VISUAL "${chartname}" JPEG...`;
    document.getElementById("anpanel-export-helper").innerHTML = '';
    getVisual(chartid).then(res => {
        let visual_body = res;
        getJwtToken({}).then(res => {

            var config = {
                domain: DOMAIN,
                qv_token: res,
                user_id: visual_body.userid,
                qrvey_id: visual_body.qrveyid,
                type: "CHART",
                chart_id: visual_body.chartid,
                panel: {
                    "header": {
                        "menu": ["DOWNLOAD"]
                    },
                    "body": {
                        "popup": {
                            "items": [
                                { "label": "FILTERBY" },
                                { "label": "DRILLDOWN" }
                            ]
                        }
                    }
                }
            }


            const panel = Object.assign(document.createElement('an-panel'), { config });
            // Check if the panel configuration is ready to trigger the JPG download
            panel.addEventListener('ON_AN_PANEL_CONFIG_READY', function () {
                if (downloading_panel) {
                    setTimeout(() => {
                        panel.shadowRoot.querySelector('an-panel-body')
                            .ctx.onMenuOptionSelected('DOWNLOAD->JPG');
                    }, 1000);
                }
            })
            document.getElementById("anpanel-export-helper").append(panel);

        });
    })
}


function changeView() {
    visual_view = document.getElementById('visual-view').value;
    visual_content = document.getElementById('visuals-content');
    visual_content.innerHTML = '';
    initVisuals(visual_view);
}

// This function will set the selected user as a "logged in user" to filter the chart list in the backend.js file using LOGGED_IN_USER global variable.
function setUser() {
    var selected_user = document.getElementById('fake-user').value;
    if (selected_user == '') {
        LOGGED_IN_USER = null;
        localStorage.removeItem('loggedUser');
    } else {
        LOGGED_IN_USER = { id: selected_user };
        localStorage.setItem('loggedUser', JSON.stringify(LOGGED_IN_USER));
    }
    visual_view = document.getElementById('visual-view').value;
    initVisuals(visual_view);
}

// The chart is automatically created after saving it using the chartbuilder widget. This function updates the created chart to have the extra property "system_user_id" that will link the chart to the parent application logged in user.
function updateChartOwner(chart, visual_view) {
    loading.style.display = 'block';
    getVisual(chart.chartid).then(res => {
        let visual_body = res;
        visual_body['system_user_id'] = LOGGED_IN_USER.id;
        updateVisual(visual_body).then(res => {
            initVisuals(visual_view);
        })
    })
}

// Init FakeUsers dropdown
function initUsersSelector(){
    const users = [
        {name:"John Doe",email:"jhondoe@chartssample.com"},
        {name:"Kathy Hawk",email:"kathyhawk@chartssample.com"},
        {name:"Miles Morales",email:"milesmorales@chartssample.com"}
    ];
    let select_html = '<option value="">Select User</option>';
    users.forEach(u => {
        select_html += `<option value="${u.email}" ${LOGGED_IN_USER && LOGGED_IN_USER.id == u.email ? 'selected' : ''}>${u.name}</option>`;
    });
    document.getElementById('fake-user').innerHTML = select_html;
}

document.addEventListener('DOMContentLoaded', (event) => {
    user_location = window.location.pathname;
    LOGGED_IN_USER = localStorage.getItem('loggedUser') ? JSON.parse(localStorage.getItem('loggedUser')) : null;
    initVisuals();
    initUsersSelector();

    // newChartAdded
    document.addEventListener('ON_AN_CHART_BUILDER_SAVED', function (data) {
        console.log(data);
        visual_view = document.getElementById('visual-view').value;
        if (LOGGED_IN_USER) {
            updateChartOwner(data.detail, visual_view);
        } else {
            initVisuals(visual_view);
        }
    });
    // Metrics are different chart models, so we need to listen for that event separately 
    document.addEventListener('ON_AN_METRIC_SAVED', function (data) {
        console.log(data);
        visual_view = document.getElementById('visual-view').value;
        if (LOGGED_IN_USER) {
            updateChartOwner(data.detail, visual_view);
        } else {
            initVisuals(visual_view);
        }
    });
    // When the download is ready, let's hide the loading
    document.addEventListener('ON_AN_PANEL_DOWNLOADED', function (data) {
        console.log(data);
        loading.style.display = 'none';
        loading.querySelector('span').innerHTML = 'LOADING...';
        downloading_panel = false;
    });
})

