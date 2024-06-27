// Qrvey instance and user values
const DOMAIN = 'https://sandbox.qrveyapp.com',
    API_KEY = '8TgIyPLlxKnuSeTwUPZUa58zn1LKIg080OkERyxO'; 
    EXPIRATION_TIME = '60m';

function getJwtToken(extra_props) {
    const GENERATE_URL = `${DOMAIN}/devapi/v4/core/login/token`;
    const GENERATE_BODY = {
        ...extra_props,
        "expiresIn": EXPIRATION_TIME
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
