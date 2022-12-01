let myStyles = `
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap');
*{
    font-family: 'Source Sans Pro', sans-serif !important;
}
an-panel-header qui-tooltip, an-panel-header button, qui-action-menu{
    display: none !important;
}

.an-panel-header {
    border-bottom: none !important;
}

an-panel{
    border-radius: 4px !important;
    box-shadow: none !important;
    border: 1px solid #F2F2F2 !important;
}

.an-panel-header__title{
    color: #333333 !important;
    font-size: 14px !important;
}
`;

window['config'] = {
    api_key: 'd41d8cd98f00b204e9800998ecf8427e',
    domain: 'https://demo.qrvey.com',
    page_id: '82YzYh8Zu',
    app_id: '7QPNzup4O',
    customCSSRules: myStyles
};

function getRange(op, custom_range) {
    const date = new Date();
    let firstDay, lastDay;
    switch (op) {
        case 'tm':
            firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toLocaleDateString("en-US");
            lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toLocaleDateString("en-US");
            return [firstDay, lastDay];
            break;
        case 'l30':
            const today = new Date();
            firstDay = new Date(new Date().setDate(today.getDate() - 30)).toLocaleDateString("en-US");
            lastDay = date.toLocaleDateString("en-US");
            return [firstDay, lastDay];
            break;
        case 'lm':
            firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1).toLocaleDateString("en-US");
            lastDay = new Date(date.getFullYear(), date.getMonth(), 0).toLocaleDateString("en-US");
            return [firstDay, lastDay];
            break;
        case 'ytd':
            firstDay = new Date(date.getFullYear(), 0).toLocaleDateString("en-US");
            lastDay = date.toLocaleDateString("en-US");
            return [firstDay, lastDay];
            break;

        default:
            date1 = custom_range[0].toLocaleDateString("en-US");
            date2 = custom_range[1].toLocaleDateString("en-US");
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
    let userFilters = {
        filters: []
    }
    if (el && el.classList.contains('active')) {
        updateSelector();
    } else {
        el && updateSelector(el);
        const date_range = getRange(op, custom_range);
        console.log(date_range);
        userFilters.filters = [
            {
                "operator": "AND",
                "expressions": [
                    {
                        "qrveyid": "EqpZUaQqe",
                        "questionid": "t4njmcUtx",
                        "validationType": "RANGE",
                        "value": [
                            {
                                "lte": date_range[1],
                                "gte": date_range[0]
                            }
                        ]
                    }
                ]
            }
        ];
    }

    window.dispatchEvent(new CustomEvent('atApplyUserFilters', { detail: { "filters": userFilters.filters } }));
}

function showCustomDates(el) {
    updateSelector(el);
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

document.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(() => {
        window.runEndUser();
    }, 1000);

})