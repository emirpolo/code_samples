var widget_settings = {
    domain: DOMAIN
}

var customEUStyle = `
    qeu-filter-sidebar{
        position: fixed !important;
        height: calc(100% - 70px) !important;
        top: 70px !important;
        right: 0 !important;
        z-index: 10 !important;
    }
`;

var loading = null;
var report_list = null;


function loadWidget(page_id) {
    // Build filters if there is any
    const filters = buildFilters();
    tenant_logo = document.getElementById('tenant-logo').querySelector('img');
    tenant_logo.style.display = 'none';
    document.getElementById('widget-container').innerHTML = `<h4 class="loading-widget">Loading...</h4>`;
    // getJwtToken({ page_id, userFilters: { "filters": [filters] }, ...RLS }).then(res => {
    getJwtToken({ page_id, userFilters: { "filters": [filters] } }).then(res => {
        document.getElementById('widget-container').innerHTML = '';
        if (document.querySelector('qrvey-end-user')) {
            document.querySelector('qrvey-end-user').remove();
        }
        widget_settings.qv_token = res;
        page_view = document.createElement('qrvey-end-user');
        page_view.settings = 'widget_settings';
        document.getElementById('widget-container').append(page_view);

        setTimeout(() => {
            runEndUser();
            tenant_logo.style.display = 'block';
        }, 100);
    })
}

function reportsList() {
    const reports = document.getElementById('report-list');
    getReports().then(res => {
        console.log(res);
        const items = res.Items;
        let options = getReportList(items);
        reports.innerHTML = options;
    });
}

function changeReport() {
    const reports = document.getElementById('reports');
    loadWidget(reports.value);
}

function convertDate(date) {
    date_parts = date.split("-");
    return date ? date_parts[1] + '/' + date_parts[2] + '/' + date_parts[0] : '';
}

function buildFilters() {
    const status_since = convertDate(document.getElementById('status_since').value);
    const workgroup_name = document.getElementById('workgroup_name').value;
    const project_name = document.getElementById('project_name').value;
    const color = document.getElementById('color').value;

    const inputs_array = [
        { name: 'status_since', status_since, status_since, columns: ['O57oSENzN'] },
        { name: 'workgroup_name', field: workgroup_name, columns: ['80MkmSawU'] },
        { name: 'project_name', field: project_name, columns: ['nyaHvRrnN'] },
        { name: 'color', field: color, columns: ['3DbvQWF4n', '-tD53steJ'] }
    ];

    let filters = {
        "operator": "AND",
        "expressions": []
    };

    let color_filter_added = false;

    inputs_array.forEach(el => {
        el.columns.forEach(col => {
            if (el.name == 'status_since') {
                if (status_since && status_since != '') {
                    filters.expressions.push({
                        "questionid": col,
                        "validationType": "RANGE",
                        "value": [{
                            "lte": el.status_since,
                            "gte": el.status_since
                        }]
                    });
                }
            } else {
                if (el.field && el.field != '') {
                    if (el.name == 'color') {

                        !color_filter_added && filters.expressions.push({
                            "questionid": el.field == 'green' ? el.columns[0] : el.columns[1],
                            "validationType": "EQUAL",
                            "value": [1]
                        });

                        color_filter_added = true;

                    } else {
                        filters.expressions.push({
                            "questionid": col,
                            "validationType": "EQUAL",
                            "value": [el.field]
                        });
                    }
                }
            }
        });
    });

    return filters;
}

function generateReport() {
    if(!document.querySelector('input[name="selected_report"]:checked')){
        alert("ERROR: Please, select a report");
        return;
    }
    let page_id = document.querySelector('input[name="selected_report"]:checked').value;
    loadWidget(page_id);
}

function clearFilters() {
    document.getElementById('start_date').value = '';
    document.getElementById('end_date').value = '';
    document.getElementById('short_description').value = '';
    document.getElementById('locked').value = '';
    document.getElementById('clear-filters').style.display = 'none';
    filter();
}

// Init
function init() {
    reportsList();
}

// Init Reports
function initReports() {
    reports_content = document.getElementById('reports-content');
    reports_bread = document.getElementById('report-bread');
    loading = document.getElementById('loading');
    report_filters = document.getElementById('report-filters');
    new_report_button = document.getElementById('new-report-button');
    loading.style.display = 'block';
    getReports(LOGGED_IN_USER_ID).then(res => {
        report_list = [...res.Items];
        reports_content.innerHTML = getReportDashboard(res.Items);
        reports_bread.style.display = 'none';
        loading.style.display = 'none';

        report_filters.style.display = 'block';
        new_report_button.style.display = 'block';
    });
}

function editReport(reportid, name) {
    reports_content = document.getElementById('reports-content');
    reports_bread = document.getElementById('report-bread');
    reports_bread_name = document.getElementById('report-bread-name');
    report_filters = document.getElementById('report-filters');
    new_report_button = document.getElementById('new-report-button');
    loading.style.display = 'block';
    getReportConfig().then(res => {
        let builder_config = res;
        builder_config.page_builder.last_visited = reportid;
        updateReportConfig(builder_config).then(res => {
            getJwtToken().then(res => {
                window['enduser_config'] = {
                    domain: DOMAIN,
                    qv_token: res,
                    page_id: reportid
                }
                reports_content.innerHTML = getEditReportTemplate();
                runPageBuilder();
                reports_bread.style.display = 'inline-block';
                reports_bread_name.innerHTML = name.replace("|", "'");
                loading.style.display = 'none';

                report_filters.style.display = 'none';
                new_report_button.style.display = 'none';
            })
        })
    })
}



function newReport() {
    let report_name = prompt("Report Name?");
    if (!report_name) {
        return;
    }
    loading.style.display = 'block';
    createReport(report_name).then(res => {
        editReport(res.pageid, res.name);
    })
}

function favReport(reportid, favorite) {
    loading.style.display = 'block';
    favorite_element = document.getElementById('fav-' + reportid);
    getReport(reportid).then(res => {
        let report_body = res;
        report_body['favorite_report'] = !favorite;
        updateReport(report_body).then(res => {
            loading.style.display = 'none';
            favorite_element.innerHTML = `<span onclick="favReport('${report_body.pageid}',${report_body.favorite_report ? true : false})">${report_body.favorite_report ? '★' : '☆'}</span>`;
        })
    })
}

function filterReports() {
    filter_value = document.getElementById('report-filters').value;
    reports_content = document.getElementById('reports-content');
    new_list = null;
    switch (filter_value) {
        case 'favorites':
            let favorites = report_list.filter(r => r.favorite_report);
            let not_favorites = report_list.filter(r => !r.favorite_report);
            new_list = favorites.concat(not_favorites);
            break;
        case 'a-z':
            new_list = report_list.sort((a, b) => (a.name > b.name) ? 1 : -1);
            break;
        case 'created':
            new_list = report_list.sort((a, b) => (a.createDate < b.createDate) ? 1 : -1);
            break;

        default:
            new_list = [...report_list];
            break;
    }
    reports_content.innerHTML = getReportDashboard(new_list);
}

function deleteReportConfirmation(reportid, name) {
    if (confirm('Are you sure you want to delete "' + name.replace("|", "'") + '" report?')) {
        loading.style.display = 'block';
        deleteReport(reportid).then(res => {
            report_list = report_list.filter(r => r.pageid != reportid);
            filterReports();
            loading.style.display = 'none';
        })
    }
}

function buildRLS() {
    selected_tenant = document.getElementById('tenant').value;
    RLS = {
        "permissions": [
            {
                "dataset_id": "tjQJLKIUq",
                "record_permissions": [
                    {
                        "security_name": "vendor",
                        "values": [
                            selected_tenant
                        ]
                    }
                ]
            }
        ]
    };
}

document.addEventListener('DOMContentLoaded', (event) => {
    user_location = window.location.pathname;
    initReports();
})

