const masterObject = {
    domain: 'https://demo.qrvey.com',
    userid: 'iN3xBZfkO',
    appid: 'vt1gmR0cH',
    pageid: 'd1Hp12018',
    permissions: [
        {
            "dataset_id": "XEHUcHhmI",
            "record_permissions": [
                {
                    "security_name": "customer_number",
                    "values": [141]
                }
            ]
        }
    ]
};

let loading_element, download_text;

let loading = false;

var widget_settings = {
    domain: masterObject.domain
}

function download() {
    if (loading) return;

    loading = true;
    loading_element.style.display = "block";

    let exportOptions = {
        "pages": [
            {
                "pageid": masterObject.pageid
            }
        ],
        "exportType": {
            "context": "PAGE_FLOW",
            "dataType": "VISUAL",
            "fileType": "PDF",
            "origin": "FLOWS"
        }
    }


    let payload = {
        "userid": masterObject.userid,
        "appid": masterObject.appid,
        ...exportOptions
    };

    startDownload(widget_settings.qv_token, payload).then(res => {
        download_text.innerHTML = 'Building File...';
        trackProgress(res.exportTrackerID);
    })
}

function trackProgress(trackerID) {
    trackDownload(widget_settings.qv_token, trackerID).then(res => {
        console.log(res);
        if (res.status.text == 'SUCCESSFUL') {
            download_text.innerHTML = 'Downloading file...';
            getFile(trackerID);
        } else if(res.status.text == 'FAILED'){
            download_text.innerHTML = `Error: ${res.status.message}<br><button onclick="close();">Close</button>`;            
        }else{
            setTimeout(() => {
                trackProgress(trackerID);
            }, 1000);
        }
    })
}

function close(){
    loading = false;
    loading_element.style.display = "none";
    download_text.innerHTML = `Starting download...`;
}

function getFile(trackerID) {
    downloadFile(widget_settings.qv_token, trackerID).then(async (res) => {
        const file_res = await axios({
            responseType: 'blob',
            url: res.urlSigned
        });

        const url = window.URL.createObjectURL(new Blob([file_res.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'FILE_EXPORT')
        document.body.appendChild(link)
        link.click()

        loading = false;
        loading_element.style.display = "none";
        download_text.innerHTML = 'Starting download...';
    })
}


document.addEventListener('DOMContentLoaded', (event) => {
    loading = true;
    getJwtToken(masterObject).then(res => {
        document.getElementById('widget-container').innerHTML = '';
        if (document.querySelector('qrvey-end-user')) {
            document.querySelector('qrvey-end-user').remove();
        }
        widget_settings.qv_token = res;
        page_view = document.createElement('qrvey-end-user');
        page_view.settings = 'widget_settings';
        document.getElementById('widget-container').append(page_view);
        loading = false;
    });

    loading_element = document.querySelector('.loading');
    download_text = document.querySelector('#download-text');
})