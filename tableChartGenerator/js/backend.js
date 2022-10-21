// Qrvey instance and user values
const DOMAIN = 'https://demo.qrvey.com',
    API_KEY = 'DOCUMENTATION_DEMO_API_KEY',
    APP_ID = 'ESAyOQo9u',
    USER_ID = 'iN3xBZfkO',
    DATASET_ID = 'b01ZpGN8G';

function getColumns() {
    const GENERATE_URL = `${DOMAIN}/devapi/v4/user/${USER_ID}/app/${APP_ID}/qollect/dataset/${DATASET_ID}`;
    const GENERATE_CONFIG = {
        headers: {
            "x-api-key": API_KEY,
            "Content-Type": 'application/json'
        }
    };
    return axios
        .get(GENERATE_URL, GENERATE_CONFIG)
        .then(response => {
            return response.data
        })
        .catch(error => console.log('Get Reports Error:', error));
}

function getTableModel(){
    const GENERATE_URL = `table_model.json`;
    const GENERATE_CONFIG = {
        headers: {
            "x-api-key": API_KEY,
            "Content-Type": 'application/json'
        }
    };
    return axios
        .get(GENERATE_URL, GENERATE_CONFIG)
        .then(response => {
            return response.data
        })
        .catch(error => console.log('Get Reports Error:', error));
}

function saveChart(model){
    const GENERATE_URL = `${DOMAIN}/devapi/v4/user/${USER_ID}/app/${APP_ID}/qrvey/${DATASET_ID}/analytiq/chart/`;
    const GENERATE_CONFIG = {
        headers: {
            "x-api-key": API_KEY,
            "Content-Type": 'application/json'
        }
    };
    return axios
        .post(GENERATE_URL, model, GENERATE_CONFIG)
        .then(response => {
            return response.data
        })
        .catch(error => console.log('Get Reports Error:', error));
}

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