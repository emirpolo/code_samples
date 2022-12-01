// Environment VARS
const DOMAIN = 'https://sandbox.qrveyapp.com',
    APIKEY = 'DOCUMENTATION_DEMO_API_KEY',
    USERID = 'oqXEaED'
    APPID = 'xUS9fAfzv';


let widget_container = document.getElementById('widget-container');

function showPage(pageid = 'HXmPMk5Fs') {
    if (typeof window.customEUStyle !== 'undefined' && window.customEUStyle != '') {
        window.customEUStyle = undefined;
    }
    createJWT(pageid).then(res => {
        window['config'] = {
            domain: DOMAIN,
            qv_token: res,
            customCSSRules: reportStyles[pageid]
        }

        if (document.querySelector('qrvey-end-user')) {
            document.querySelector('qrvey-end-user').remove();
        }
        let page_view = document.createElement('qrvey-end-user');
        page_view.setAttribute("settings", "config");
        widget_container.append(page_view);

        // Required CSS injection script function
        
        runEndUser();
    });
}


function createJWT(pageid) {
    const GENERATE_URL = `${DOMAIN}/devapi/v4/core/login/token`;
    let GENERATE_BODY = {
        "userid": USERID,
        "appid": APPID,
        "expiresIn": "1w",
        "clientid": "randomUser",
        "personalization": {
            "enabled": false
        },
        "permissions": [
            {
                "dataset_id": "a8pFoezaV",
                "record_permissions": [
                    {
                        "security_name": "customer_number",
                        "values": [
                            "*"
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
                            "*"
                        ]
                    }
                ]
            }
        ]
    };
    if (pageid) GENERATE_BODY['pageid'] = pageid;
    const GENERATE_CONFIG = {
        headers: {
            "x-api-key": APIKEY,
            "Content-Type": 'application/json'
        }
    };
    return axios
        .post(GENERATE_URL, GENERATE_BODY, GENERATE_CONFIG)
        .then(response => response.data.token)
        .catch(error => console.log('JWT Token Error ->', error));
}

showPage();