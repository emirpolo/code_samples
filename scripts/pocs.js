var pocs = [
    {
        type: 'card',
        name: 'Tenant Emulator',
        url: '/TenantSample/',
        description: 'POC that showcase how to list and display reports based on a selected tenant using pageView widget and also a reports section that display a list of reports with the ability of creating, editing and deleting reports.',
        features: [
            {name:'PageView Widget', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/app-building/widget-page-view'},
            {name:'PageBuilder Widget', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/app-building/widget-page-builder'},
            {name:'Security Token (JWT)', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/embedding-widgets-security-token'},
            {name:'User Filters', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/filters-embedded-scenarios'},
            {name:'Pages API', docUrl: 'https://qrvey.stoplight.io/docs/qrvey-api-doc/786531b0f4c8f-update-a-page'},
            {name:'RLS', docUrl: 'https://partners.qrvey.com/docs/admin/record-level-security'}
        ],
        repository: {
            name: 'Github',
            url: 'https://github.com/qrvey/code_samples/tree/main/TenantSample'
        }
    },
    {
        type: 'card',
        name: 'Charts Dashboard',
        url: '/CustomChartsDashboard/',
        description: 'This POC creates a Custom Charts dashboard in which a list of charts is shown along with the option of donwload the chart as JPEG, delete chart or create a new one using chartBuilder widget. It also has the visual view in which the charts will be show as the actual visualization using the anPanel widgets.',
        features: [
            {name:'Security Token (JWT)', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/embedding-widgets-security-token'},
            {name:'Single Panels Widget', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/analytics/single-panel'}
        ],
        repository: {
            name: 'Github',
            url: 'https://github.com/qrvey/code_samples/tree/main/CustomChartsDashboard'
        }
    },
    {
        type: 'card',
        name: 'Reports Dashboard',
        url: '/ReportsDashboard/',
        description: 'This POC just showcase a reports(Pages) dashboard using pageBuilder.',
        features: [
            {name:'Security Token (JWT)', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/embedding-widgets-security-token'},
            {name:'PageBuilder Widget', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/app-building/widget-page-builder'}
        ],
        repository: {
            name: 'Github',
            url: 'https://github.com/qrvey/code_samples/tree/main/ReportsDashboard'
        }
    },
    {
        type: 'card',
        name: 'Pages Selector',
        url: '/pageSwitch/',
        description: 'This sample has a pages selector and will change the page displayed within pageView widget every time the selector changes.',
        features: [
            {name:'Security Token (JWT)', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/embedding-widgets-security-token'},
            {name:'PageView Widget', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/app-building/widget-page-view'}
        ],
        repository: {
            name: 'Github',
            url: 'https://github.com/qrvey/code_samples/tree/main/pageSwitch'
        }
    },
    {
        type: 'card',
        name: 'Tenants and User Tenants Emulator',
        url: '/TenantsAndUsers/',
        description: 'POC that showcase how to list and display reports based on a selected tenant and user tenant using pageView widget.',
        features: [
            {name:'Security Token (JWT)', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/embedding-widgets-security-token'},
            {name:'PageView Widget', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/app-building/widget-page-view'}
        ],
        repository: {
            name: 'Github',
            url: 'https://github.com/qrvey/code_samples/tree/main/TenantsAndUsers'
        }
    },
    {
        type: 'card',
        name: 'Tenants, Apps and Tenants users',
        url: '/TenantsAndApps/',
        description: 'POC with login and depeding on the organization a list of pages will be displayed from the organization qrvey user, user tenants can also login with a view only mode.',
        features: [
            {name:'Security Token (JWT)', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/embedding-widgets-security-token'},
            {name:'PageView Widget', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/app-building/widget-page-view'},
            {name:'PageBuilder Widget', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/app-building/widget-page-builder'},
            {name:'Pages API', docUrl: 'https://qrvey.stoplight.io/docs/qrvey-api-doc/786531b0f4c8f-update-a-page'},
            {name:'RLS', docUrl: 'https://partners.qrvey.com/docs/admin/record-level-security'}
        ],
        repository: {
            name: 'Github',
            url: 'https://github.com/qrvey/code_samples/tree/main/TenantsAndApps'
        }
    },
    {
        type: 'card',
        name: 'Tiny Transports',
        url: 'https://tinytransports.qrveyapp.com',
        description: 'This is complete application that serves a specific use case about a fictitious company named Tiny Transports. It has multiple sections in which users can build and visualize dashboards and create surveys.',
        features: [
            {name:'PageView Widget', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/app-building/widget-page-view'},
            {name:'PageBuilder Widget', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/app-building/widget-page-builder'},
            {name:'Security Token (JWT)', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/embedding-widgets-security-token'},
            {name:'Webforms Design Widget', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/data-sources/widget-webforms'}
        ]
    },
    {
        type: 'card',
        name: 'Parent Sample App with Login',
        url: 'http://wrappercxqapp-env.eba-cdapkpn9.us-east-1.elasticbeanstalk.com',
        description: 'This application is conected to a specific server(sandbox) and you can logIn using your sandbox QrveyComposer credentials, create reports and share them with other users, and also create new datasets.',
        features: [
            {name:'PageView Widget', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/app-building/widget-page-view'},
            {name:'PageBuilder Widget', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/app-building/widget-page-builder'},
            {name:'Security Token (JWT)', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/embedding-widgets-security-token'},
            {name:'User Login API', docUrl: 'https://qrvey.stoplight.io/docs/qrvey-api-doc/3fa849b42ad0a-user-login'}
        ]
    },
    {
        type: 'card',
        name: 'Simple Sample App',
        url: 'http://simpleapp.qrveyapp.com',
        description: 'This app embeds almost all the popular widgets Qrvey has today. It also has a config section in which you can set all the values to point to specific instance.',
        features: [
            {name:'PageView Widget', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/app-building/widget-page-view'},
            {name:'PageBuilder Widget', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/app-building/widget-page-builder'},
            {name:'Security Token (JWT)', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/embedding-widgets-security-token'},
            {name:'Webforms Design Widget', docUrl: 'https://partners.qrvey.com/docs/embedding/widgets/data-sources/widget-webforms'}
        ]
    },
    {
        type: 'button',
        name: 'Check more samples here',
        url: 'https://docs.google.com/spreadsheets/d/1B1tOXGeRxj47SHZbhKuzyr2qjaNVtKXoRQgaYVo_JVM/edit?pli=1#gid=0',
        features: []
    }
];