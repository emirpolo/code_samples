// Custom CSS to inject
var customCSS = `
    qeu-filter-sidebar{
        position: fixed !important;
        height: calc(100% - 70px) !important;
        top: 70px !important;
        right: 0 !important;
        z-index: 10 !important;
    }
`;

// Widget Configuration object base
var widget_settings = {
    domain: DOMAIN,
    customCSSRules: customCSS
}

// This variable emulates the different tenants, each with Qrvey information (UserId, AppId, PageId) and users(Parent app users)
var tenants = [
    {
        id: "qwerty123",
        name: "Tenant #1",
        qrveyInfo:{
            userid: "oqXEaED",
            appid: "xUS9fAfzv",
            pageid: "FmOQA7nlB"
        },
        users: [
            {
                name: "User #1",
                id: "user1"
            },
            {
                name: "User #2",
                id: "user2"
            }
        ]
    },
    {
        id: "asdfg123",
        name: "Tenant #2",
        qrveyInfo:{
            userid: "ZreovaM",
            appid: "H2UuWJeIp",
            pageid: "kjN1r6zms"
        },
        users: [
            {
                name: "User #3",
                id: "user3"
            },
            {
                name: "User #4",
                id: "user4"
            }
        ]
    }
];

// Turns on when the page is loading the widget
var loading = null;

// Stores the selected tenant from the tenant dropdown.
var active_tenant = null;

// Triggers when a tenant is selected and builds a TenantUsers dropdown.
function getTenantUsers(){
    document.getElementById('widget-container').innerHTML = '';
    var selected_tenant = document.getElementById('tenant').value;
    if(!selected_tenant || selected_tenant == "") return;
    active_tenant = tenants.filter(el => {
        return el.id == selected_tenant;
    })[0];
    buildUsersSelector(active_tenant);
}

// Triggers when a Tenant User is selected, generates a JWT that will be included in the original Widget Config Object (widget_settings)
function loadWidget(user) {    
    document.getElementById('widget-container').innerHTML = `<h4 class="loading-widget">Loading...</h4>`;

    var jwt_payload = {
        appid: active_tenant.qrveyInfo.appid,
        userid: active_tenant.qrveyInfo.userid,
        pageid: active_tenant.qrveyInfo.pageid,
        clientid: user
    }

    getJwtToken(jwt_payload).then(res => {
        document.getElementById('widget-container').innerHTML = '';
        if (document.querySelector('qrvey-end-user')) {
            document.querySelector('qrvey-end-user').remove();
        }
        widget_settings.qv_token = res;
        page_view = document.createElement('qrvey-end-user');
        page_view.setAttribute('settings', 'widget_settings');
        document.getElementById('widget-container').append(page_view);

        // Here we're injecting the custom CSS
        setTimeout(() => {
            runEndUser();
        }, 100);
    })
}

// Load selector when the page loads
document.addEventListener('DOMContentLoaded', (event) => {
    buildTenantSelector(tenants);
})