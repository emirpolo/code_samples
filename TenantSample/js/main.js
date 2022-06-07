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
var selected_tenant = "*";
var RLS = {
    "permissions": [
        {
            "dataset_id": "a8pFoezaV",
            "record_permissions": [
                {
                    "security_name": "customer_number",
                    "values": [
                        selected_tenant
                    ]
                }
            ]
        },
        {
            "dataset_id": "aw9aUFaDH",
            "record_permissions": [
                {
                    "security_name": "customer_number",
                    "values": [
                        selected_tenant
                    ]
                }
            ]
        }
    ]
};

var customers_rls = [
    {
        name: "AV Stores, Co.",
        number: 187
    },
    {
        name: "Alpha Cognac",
        number: 242
    },
    {
        name: "Amica Models & Co. ",
        number: 249
    },
    {
        name: "Australian Gift Network, Co",
        number: 333
    }
]

function buildTenantSelector() {
    var html = `
    <option value="" selected>No Tenant</option>
    <option value="*" selected>All Tenants</option>`;
    customers_rls.forEach(t => {
        html += `<option value="${t.number}">${t.name}</option>`;
    });
    document.getElementById("tenant").innerHTML = html;
}

function loadWidget(page_id) {
    // Build filters if there is any
    const filters = buildFilters();
    tenant_logo = document.getElementById('tenant-logo').querySelector('img');
    tenant_logo.style.display = 'none';
    document.getElementById('widget-container').innerHTML = `<h4 class="loading-widget">Loading...</h4>`;

    if (!selected_tenant) RLS = null;

    getJwtToken({ page_id, userFilters: { "filters": [filters] }, ...RLS }).then(res => {
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
    const start_date = convertDate(document.getElementById('start_date').value);
    const end_date = convertDate(document.getElementById('end_date').value);
    const product_line = document.getElementById('product_line').value;
    const product_scale = document.getElementById('product_scale').value;

    const inputs_array = [
        { name: 'fromto', start_date, end_date, columns: ['XlgFKFJYw'] },
        { name: 'product_line', field: product_line, columns: ['VW5JCEwe4'] },
        { name: 'product_scale', field: product_scale, columns: ['B4D7vwdxL'] },
    ];

    let filters = {
        "operator": "AND",
        "expressions": []
    };

    inputs_array.forEach(el => {
        el.columns.forEach(col => {
            if (el.name == 'fromto') {
                if ((end_date && end_date != '') && (start_date && start_date != '')) {
                    filters.expressions.push({
                        "questionid": col,
                        "validationType": "RANGE",
                        "value": [{
                            "lte": el.end_date,
                            "gte": el.start_date
                        }]
                    });
                }
            } else {
                if (el.field && el.field != '') {
                    filters.expressions.push({
                        "questionid": col,
                        "validationType": "EQUAL",
                        "value": [el.field]
                    });
                }
            }
        });
    });

    return filters;
}

function generateReport() {
    if (!document.querySelector('input[name="selected_report"]:checked')) {
        alert("Please, select a Base Report")
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

    var asset_permissions = {
        pages: {
            page_ids: [
                reportid
            ]
        }
    }

    if (!selected_tenant) RLS = null;
    getJwtToken({ ...RLS, asset_permissions }).then(res => {
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


    // getReportConfig().then(res => {
    //     let builder_config = res;
    //     builder_config.page_builder.last_visited = reportid;
    //     updateReportConfig(builder_config).then(res => {
    //         if (!selected_tenant) RLS = null;
    //         getJwtToken({ ...RLS }).then(res => {
    //             window['enduser_config'] = {
    //                 domain: DOMAIN,
    //                 qv_token: res,
    //                 page_id: reportid
    //             }
    //             reports_content.innerHTML = getEditReportTemplate();
    //             runPageBuilder();
    //             reports_bread.style.display = 'inline-block';
    //             reports_bread_name.innerHTML = name.replace("|", "'");
    //             loading.style.display = 'none';

    //             report_filters.style.display = 'none';
    //             new_report_button.style.display = 'none';
    //         })
    //     })
    // })
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
    if (selected_tenant == '') selected_tenant = null;
    RLS = {
        "permissions": [
            {
                "dataset_id": "a8pFoezaV",
                "record_permissions": [
                    {
                        "security_name": "customer_number",
                        "values": [
                            selected_tenant
                        ]
                    }
                ]
            },
            {
                "dataset_id": "aw9aUFaDH",
                "record_permissions": [
                    {
                        "security_name": "customer_number",
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
    if (user_location.includes('reports')) {
        initReports();
    } else {
        init();
    }
    buildTenantSelector();
})

