function getJwtToken(payload) {
    const GENERATE_URL = `${masterObject.domain}/devapi/v4/core/login/token`;
    const GENERATE_BODY = {
        ...payload,
        expiresIn: '1w'
    };
    const GENERATE_CONFIG = {
        headers: {
            "x-api-key": 'DOCUMENTATION_DEMO_API_KEY',
            "Content-Type": 'application/json'
        }
    };
    return axios
        .post(GENERATE_URL, GENERATE_BODY, GENERATE_CONFIG)
        .then(response => response.data.token)
        .catch(error => console.log('JWT Token Error ->', error));
}

function startDownload(jwt, payload){
    const GENERATE_URL = `${masterObject.domain}/devapi/v5/export/user/undefined/export_init`;
    const GENERATE_BODY = {...payload};
    const GENERATE_CONFIG = {
        headers: {
            "Authorization": `Bearer ${jwt}`,
            "Content-Type": 'application/json'
        }
    };
    return axios
        .post(GENERATE_URL, GENERATE_BODY, GENERATE_CONFIG)
        .then(response => response.data)
        .catch(error => console.log('Download Start Error ->', error));
}

function trackDownload(jwt, trackerID){
    const GENERATE_URL = `${masterObject.domain}/devapi/v5/export/check_status/${trackerID}?fullData=true`;
    const GENERATE_CONFIG = {
        headers: {
            "Authorization": `Bearer ${jwt}`,
            "Content-Type": 'application/json'
        }
    };
    return axios
        .get(GENERATE_URL, GENERATE_CONFIG)
        .then(response => response.data)
        .catch(error => console.log('Tracker Error ->', error));
}

function downloadFile(jwt, trackerID){
    const GENERATE_URL = `${masterObject.domain}/devapi/v5/export/download/${trackerID}`;
    const GENERATE_CONFIG = {
        headers: {
            "Authorization": `Bearer ${jwt}`,
            "Content-Type": 'application/json'
        }
    };
    return axios
        .get(GENERATE_URL, GENERATE_CONFIG)
        .then(response => response.data)
        .catch(error => console.log('Download File Error ->', error));
}