// Qrvey instance and user values
const DOMAIN = 'https://sandbox.qrveyapp.com',
    API_KEY = 'DOCUMENTATION_DEMO_API_KEY',
    APP_ID = 'H2UuWJeIp',
    USER_ID = 'ZreovaM',
    QRVEY_ID = 'rxGfSUsPzT',
    EXPIRATION_TIME = '60m',
    LOGGED_IN_USER_ID = "user123456";//Emulates a user that's logged in

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

function getVisuals(userid) {
    const GENERATE_URL = `${DOMAIN}/devapi/v4/user/${USER_ID}/app/${APP_ID}/qrvey/${QRVEY_ID}/analytiq/chart/all`;
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


function updateVisual(body) {
    const GENERATE_URL = `${DOMAIN}/devapi/v4/user/${USER_ID}/app/${APP_ID}/qrvey/${QRVEY_ID}/analytiq/chart/${body.chartid}`;
    const GENERATE_CONFIG = {
        headers: {
            "x-api-key": API_KEY,
            "Content-Type": 'application/json'
        }
    };
    return axios
        .put(GENERATE_URL, body, GENERATE_CONFIG)
        .then(response => response.data)
        .catch(error => console.log('Update a Chart Error ->', error));
}

function getVisual(chartid) {
    const GENERATE_URL = `${DOMAIN}/devapi/v4/user/${USER_ID}/app/${APP_ID}/qrvey/${QRVEY_ID}/analytiq/chart/${chartid}`;
    const GENERATE_CONFIG = {
        headers: {
            "x-api-key": API_KEY,
            "Content-Type": 'application/json'
        }
    };
    return axios
        .get(GENERATE_URL, GENERATE_CONFIG)
        .then(response => response.data)
        .catch(error => console.log('Get a Chart Error ->', error));
}

function deleteVisual(chartid) {
    const GENERATE_URL = `${DOMAIN}/devapi/v4/user/${USER_ID}/app/${APP_ID}/qrvey/${QRVEY_ID}/analytiq/chart/${chartid}`;
    const GENERATE_CONFIG = {
        headers: {
            "x-api-key": API_KEY,
            "Content-Type": 'application/json'
        }
    };
    return axios
        .delete(GENERATE_URL, GENERATE_CONFIG)
        .then(response => response.data)
        .catch(error => console.log('Delete Chart Error ->', error));
}