function getJwtToken(userid, appid, extra_props) {
  const GENERATE_URL = `${QRVEY_DOMAIN}/devapi/v4/core/login/token`;
  const GENERATE_BODY = {
    ...extra_props,
    "userid": userid,
    "appid": appid,
    "expiresIn": "1w"
  };
  const GENERATE_CONFIG = {
    headers: {
      "x-api-key": QRVEY_APIKEY,
      "Content-Type": 'application/json'
    }
  };
  return axios
    .post(GENERATE_URL, GENERATE_BODY, GENERATE_CONFIG)
    .then(response => response.data.token)
    .catch(error => console.log('JWT Token Error ->', error));
}

function getPages(userid, appid) {
  const GENERATE_URL = `${QRVEY_DOMAIN}/devapi/v3/user/${userid}/app/${appid}/builder/page/?limit=100`;
  const GENERATE_CONFIG = {
    headers: {
      "x-api-key": QRVEY_APIKEY,
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

function createPage(name, userid, appid) {
  const GENERATE_URL = `${QRVEY_DOMAIN}/devapi/v3/user/${userid}/app/${appid}/builder/page`;
  const GENERATE_BODY = {
    "name": name,
    "description": "",
    "private": false,
    "published": false,
    "active": false,
    "editing": true,
    "system_user_id": loggedUser.email //Custom prop
  };
  const GENERATE_CONFIG = {
    headers: {
      "x-api-key": QRVEY_APIKEY,
      "Content-Type": 'application/json'
    }
  };
  return axios
    .post(GENERATE_URL, GENERATE_BODY, GENERATE_CONFIG)
    .then(response => response.data)
    .catch(error => console.log('Create Report Error ->', error));
}


function clonePage(userid, appid, pageid) {
  const GENERATE_URL = `${QRVEY_DOMAIN}/devapi/v4/user/${userid}/app/${appid}/builder/page/${pageid}/clone`;
  const GENERATE_BODY = {
    "name": name,
    "description": "",
    "private": false,
    "published": false,
    "active": false,
    "editing": true,
    "system_user_id": loggedUser.email //Custom prop
  };
  const GENERATE_CONFIG = {
    headers: {
      "x-api-key": QRVEY_APIKEY,
      "Content-Type": 'application/json'
    }
  };
  return axios
    .post(GENERATE_URL, GENERATE_BODY, GENERATE_CONFIG)
    .then(response => response.data)
    .catch(error => console.log('Create Report Error ->', error));
}

function getPage(pageid, userid, appid) {
  const GENERATE_URL = `${QRVEY_DOMAIN}/devapi/v3/user/${userid}/app/${appid}/builder/page/${pageid}`;
  const GENERATE_CONFIG = {
    headers: {
      "x-api-key": QRVEY_APIKEY,
      "Content-Type": 'application/json'
    }
  };
  return axios
    .get(GENERATE_URL, GENERATE_CONFIG)
    .then(response => response.data)
    .catch(error => console.log('Create Report Error ->', error));
}

function updatePage(body, userid, appid) {
  const GENERATE_URL = `${QRVEY_DOMAIN}/devapi/v3/user/${userid}/app/${appid}/builder/page/${body.pageid}`;
  const GENERATE_CONFIG = {
    headers: {
      "x-api-key": QRVEY_APIKEY,
      "Content-Type": 'application/json'
    }
  };
  return axios
    .put(GENERATE_URL, body, GENERATE_CONFIG)
    .then(response => response.data)
    .catch(error => console.log('Create Report Error ->', error));
}

function datasetLookUp(userid, appid) {
  const GENERATE_URL = `${QRVEY_DOMAIN}/devapi/v4/user/${userid}/app/${appid}/qollect/dataset/all`;
  const GENERATE_BODY = {
    "limit": 1,
    "filters": [
      {
        "filterType": "CONTAINS",
        "column": "search",
        "value": DATASET_VIEW_NAME.toLowerCase()
      }
    ],
    "warning": false
  };
  const GENERATE_CONFIG = {
    headers: {
      "x-api-key": QRVEY_APIKEY,
      "Content-Type": 'application/json'
    }
  };
  return axios
    .post(GENERATE_URL, GENERATE_BODY, GENERATE_CONFIG)
    .then(response => response.data)
    .catch(error => console.log('Create Report Error ->', error));
}