// Qrvey instance and user values
const DOMAIN = 'https://sandbox.qrveyapp.com',
    API_KEY = '8TgIyPLlxKnuSeTwUPZUa58zn1LKIg080OkERyxO',
    APP_ID = 'xUS9fAfzv',
    USER_ID = 'oqXEaED',
    EXPIRATION_TIME = '60m',
    LOGGED_IN_USER_ID = "user123456";

function getJwtToken(extra_props) {
    const GENERATE_URL = `${DOMAIN}/devapi/v4/core/login/token`;
    const GENERATE_BODY = {
        ...extra_props,
        "userid": USER_ID,
        "appid": APP_ID,
    };
    const GENERATE_CONFIG = {
        headers: {
            "x-api-key": API_KEY,
            "Content-Type": 'application/json'
        }
    };
    return axios
        .post(GENERATE_URL, GENERATE_BODY, GENERATE_CONFIG)
        .then(response => response.data.token)
        .catch(error => console.log('JWT Token Error ->', error));
}

function getReports(userid) {
    const GENERATE_URL = `${DOMAIN}/devapi/v3/user/${USER_ID}/app/${APP_ID}/builder/page/?limit=100`;
    const GENERATE_CONFIG = {
        headers: {
            "x-api-key": API_KEY,
            "Content-Type": 'application/json'
        }
    };
    return axios
        .get(GENERATE_URL, GENERATE_CONFIG)
        .then(response => {
            if (userid) {
                //Filter reports for logged in user
                response.data.Items = response.data.Items.filter(r => r.system_user_id && r.system_user_id == LOGGED_IN_USER_ID);
                return response.data;
            }
            // Show reports that don't belong to a specific user, this will be the "for all users" reports
            response.data.Items = response.data.Items.filter(r => !r.system_user_id);
            return response.data
        })
        .catch(error => console.log('Get Reports Error:', error));
}

function createReport(name) {
    const GENERATE_URL = `${DOMAIN}/devapi/v3/user/${USER_ID}/app/${APP_ID}/builder/page`;
    const GENERATE_BODY = {
        "name": name,
        "description": "",
        "private": true,
        "published": false,
        "active": false,
        "editing": true,
        "system_user_id": LOGGED_IN_USER_ID //Custom prop
    };
    const GENERATE_CONFIG = {
        headers: {
            "x-api-key": API_KEY,
            "Content-Type": 'application/json'
        }
    };
    return axios
        .post(GENERATE_URL, GENERATE_BODY, GENERATE_CONFIG)
        .then(response => response.data)
        .catch(error => console.log('Create Report Error ->', error));
}

function updateReport(body) {
    const GENERATE_URL = `${DOMAIN}/devapi/v3/user/${USER_ID}/app/${APP_ID}/builder/page/${body.pageid}`;
    const GENERATE_CONFIG = {
        headers: {
            "x-api-key": API_KEY,
            "Content-Type": 'application/json'
        }
    };
    return axios
        .put(GENERATE_URL, body, GENERATE_CONFIG)
        .then(response => response.data)
        .catch(error => console.log('Create Report Error ->', error));
}

function getReport(reportid) {
    const GENERATE_URL = `${DOMAIN}/devapi/v3/user/${USER_ID}/app/${APP_ID}/builder/page/${reportid}`;
    const GENERATE_CONFIG = {
        headers: {
            "x-api-key": API_KEY,
            "Content-Type": 'application/json'
        }
    };
    return axios
        .get(GENERATE_URL, GENERATE_CONFIG)
        .then(response => response.data)
        .catch(error => console.log('Create Report Error ->', error));
}

function deleteReport(reportid) {
    const GENERATE_URL = `${DOMAIN}/devapi/v3/user/${USER_ID}/app/${APP_ID}/builder/page/${reportid}`;
    const GENERATE_CONFIG = {
        headers: {
            "x-api-key": API_KEY,
            "Content-Type": 'application/json'
        }
    };
    return axios
        .delete(GENERATE_URL, GENERATE_CONFIG)
        .then(response => response.data)
        .catch(error => console.log('Create Report Error ->', error));
}