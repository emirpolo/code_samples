var anPanelConfig1 = {
    "api_key": "d41d8cd98f00b204e9800998ecf8427e",
    "app_id": "ESAyOQo9u",
    "domain": "https://demo.qrvey.com",
    "user_id": "iN3xBZfkO",
    "qrveyid": "r8N5UAMxa",
    "type": "CHART",
    "chart_id": "gTQ8S4Lwt"
}
var anPanelConfig2 = {
    "api_key": "d41d8cd98f00b204e9800998ecf8427e",
    "app_id": "ESAyOQo9u",
    "domain": "https://demo.qrvey.com",
    "user_id": "iN3xBZfkO",
    "qrveyid": "r8N5UAMxa",
    "type": "CHART",
    "chart_id": "gTQ8S4Lwt"
}

var customPanelsCSS = `
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap');
*{
    font-family: 'Source Sans Pro', sans-serif !important;
}
:host{
    border-radius: 4px !important;
    box-shadow: none !important;
    border: none !important;
}
.an-panel-header__title{
    color: #333333 !important;
    font-size: 14px !important;
}

an-panel-header{
    display: none !important;
}
`;

function getRange(op, compare, custom_range) {
    const date = new Date();
    let firstDay, lastDay;
    switch (op) {
        case 'tm':
            if (!compare) {
                firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toLocaleDateString("en-US");
                lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toLocaleDateString("en-US");
            } else {
                let fd = new Date();
                fd.setDate(1);
                fd.setMonth(fd.getMonth() - 1);
                firstDay = fd.toLocaleDateString("en-US");

                let ld = new Date();
                ld.setDate(0);
                lastDay = ld.toLocaleDateString("en-US");
            }
            return [firstDay, lastDay];

            break;
        case 'l30':
            if (!compare) {
                const today = new Date();
                firstDay = new Date(new Date().setDate(today.getDate() - 30)).toLocaleDateString("en-US");
                lastDay = date.toLocaleDateString("en-US");
            } else {
                const today = new Date();
                firstDay = new Date(new Date().setDate(today.getDate() - 60)).toLocaleDateString("en-US");
                lastDay = new Date(new Date().setDate(today.getDate() - 31)).toLocaleDateString("en-US");
            }
            return [firstDay, lastDay];

            break;
        case 'lm':
            if (!compare) {
                firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1).toLocaleDateString("en-US");
                lastDay = new Date(date.getFullYear(), date.getMonth(), 0).toLocaleDateString("en-US");
            } else {
                firstDay = new Date(date.getFullYear(), date.getMonth() - 2, 1).toLocaleDateString("en-US");
                lastDay = new Date(date.getFullYear(), date.getMonth() - 1, 0).toLocaleDateString("en-US");
            }
            return [firstDay, lastDay];
            break;

        case 'ytd':

            if (!compare) {
                firstDay = new Date(date.getFullYear(), 0);
                lastDay = date;
                firstDay = firstDay.toLocaleDateString("en-US");
                lastDay = lastDay.toLocaleDateString("en-US");
            } else {
                firstDay = date;
                lastDay = new Date(date.getFullYear(), 0);
                blastDay = new Date(date.getFullYear(), 0);

                n_days = firstDay - lastDay;
                total_days = Math.ceil(n_days / (1000 * 3600 * 24));

                lastDay.setDate(0);
                lastDay.setFullYear(lastDay.getFullYear());

                blastDay.setDate(0);
                blastDay.setFullYear(blastDay.getFullYear());


                firstDay = new Date(blastDay.setDate(lastDay.getDate() - total_days)).toLocaleDateString("en-US");
                lastDay = lastDay.toLocaleDateString("en-US");
            }
            return [firstDay, lastDay];
            break;

        default:
            if (!compare) {
                date1 = custom_range[0].toLocaleDateString("en-US");
                date2 = custom_range[1].toLocaleDateString("en-US");
            } else {
                c_date1 = custom_range[0];
                c_date1b = new Date(custom_range[0].getTime());;
                c_date2 = custom_range[1];
                n_days = c_date2 - c_date1;
                total_days = (Math.ceil(n_days / (1000 * 3600 * 24))) + 1;
                console.log("#Days",total_days);

                date1 = new Date(c_date1.setDate(c_date1.getDate() - total_days)).toLocaleDateString("en-US");
                date2 = new Date(c_date1b.setDate(c_date1b.getDate() - 1)).toLocaleDateString("en-US");
            }

            return [date1, date2]
            break;
    }
}


function updateSelector(el) {
    const filter_selectors = document.querySelectorAll('ul.options li');
    filter_selectors.forEach(e => {
        e.classList.remove('active');
    })
    if (!el) return;
    el.classList.add('active');
}

function buildFilters(op, el, custom_range) {
    let userFiltersA = {
        filters: []
    }

    let userFiltersB = {
        filters: []
    }

    let panelB = document.getElementById("panelB");
    let _panelB = document.getElementById("_panelB");
    

    let panelA = document.getElementById("panelA");
    let _panelA = document.getElementById("_panelA");
    

    anPanelConfig2['userFilters'] = null
    if (el && el.classList.contains('active')) {
        updateSelector();
    } else {
        el && updateSelector(el);
        const date_rangeA = getRange(op, false, custom_range);
        userFiltersA.filters = [
            {
                "operator": "AND",
                "expressions": [
                    {
                        "qrveyid": "r8N5UAMxa",
                        "questionid": "BKMfFHHRg",
                        "validationType": "RANGE",
                        "value": [
                            {
                                "lte": date_rangeA[1],
                                "gte": date_rangeA[0]
                            }
                        ]
                    }
                ]
            }
        ];

        const date_rangeB = getRange(op, true, custom_range);
        console.log("Requested Date Range", date_rangeA)
        console.log("Compared Date Range", date_rangeB)
        userFiltersB.filters = [
            {
                "operator": "AND",
                "expressions": [
                    {
                        "qrveyid": "r8N5UAMxa",
                        "questionid": "BKMfFHHRg",
                        "validationType": "RANGE",
                        "value": [
                            {
                                "lte": date_rangeB[1],
                                "gte": date_rangeB[0]
                            }
                        ]
                    }
                ]
            }
        ];
    }

    anPanelConfig1['userFilters'] = userFiltersA;
    anPanelConfig2['userFilters'] = userFiltersB;
    
    panelA.remove();
    an = document.createElement("an-panel");
    an.setAttribute("config", "anPanelConfig1");
    an.setAttribute("id", "panelA");
    _panelA.append(an);
    
    panelB.remove();
    an = document.createElement("an-panel");
    an.setAttribute("config", "anPanelConfig2");
    an.setAttribute("id", "panelB");
    _panelB.append(an);

    // panelA.updateData({config:anPanelConfig1});
    // panelB.updateData({config:anPanelConfig2});

    injectCSS();
}

function showCustomDates(el, e) {
    e.stopPropagation();
    updateSelector(el);
    pickers = document.getElementById('date-pickers');
    pickers.classList.add('visible');
}

function closePickers() {
    pickers = document.getElementById('date-pickers');
    pickers.classList.remove('visible');
}

function customFilters() {
    date1 = document.getElementById('date1').value;
    date2 = document.getElementById('date2').value;
    if (!date1 || !date2) return;
    date1 = new Date(convertDate(date1));
    date2 = new Date(convertDate(date2));
    if (date1 > date2) return;
    buildFilters(null, null, [date1, date2]);
}

function convertDate(date) {
    date_parts = date.split("-");
    return date ? date_parts[1] + '/' + date_parts[2] + '/' + date_parts[0] : '';
}

// customCSS for panels

function injectCSS(){
    window.customElements.whenDefined('an-panel').then(function () {
        let panels = document.querySelectorAll('an-panel');
        if (panels.length > 0) {
            for (let index = 0; index < panels.length; index++) {
                const element = panels[index];
                let already_there = false;
                let allStyles = element.shadowRoot.querySelectorAll('style');
                for (let index = 0; index < allStyles.length; index++) {
                    const style_el = allStyles[index];
                    if (style_el.qid && style_el.qid == 'anpanels_custom') {
                        already_there = true;
                        break;
                    }
                }
                if (!already_there) {
                    let anStyles = document.createElement('style');
                    anStyles.innerHTML = customPanelsCSS;
                    anStyles['qid'] = "anpanels_custom";
                    element.shadowRoot.appendChild(anStyles);
                }
            }
        }
    })
}

injectCSS();