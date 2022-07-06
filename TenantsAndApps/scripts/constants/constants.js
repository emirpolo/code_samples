const USERS = [
    {
        id: 496,
        account_type: "composer",
        name: "Organization 1",
        email: "organization1@sample.com",
        qrvey_info: {
            userid: "vc1xpuGjz",
            appid: "7QPNzup4O"
        }
    },
    {
        id: 484,
        account_type: "composer",
        name: "Organization 2",
        email: "organization2@sample.com",
        qrvey_info: {
            userid: "K5aX7Ykvh",
            appid: "hvrMRg551"
        }
    },
    {
        id: 3,
        account_type: "viewer",
        organization_id: 496,
        name: "Viewer 1",
        email: "viewer1@sample.com",
    },
    {
        id: 3,
        account_type: "viewer",
        organization_id: 484,
        name: "Viewer 2",
        email: "viewer2@sample.com",
    }
];

const QRVEY_DOMAIN = "https://demo.qrvey.com";
const QRVEY_APIKEY = "DOCUMENTATION_DEMO_API_KEY";
const DATASET_VIEW_NAME = "Main Mysql - orders - View";