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

function downloadPDF(){
    if(loading) return;

    loading = true;
    loading_element.style.display = "block";
    let payload = {
        "userid": masterObject.userid,
        "appid": masterObject.appid,
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
    };

    startDownload(widget_settings.qv_token, payload).then(res => {
        download_text.innerHTML = 'Building PDF...';
        trackProgress(res.exportTrackerID);
    })
}

function trackProgress(trackerID){
    trackDownload(widget_settings.qv_token, trackerID).then(res => {
        console.log(res);
        if(res.status.text == 'SUCCESSFUL'){
            download_text.innerHTML = 'Downloading file...';
            getPDF(trackerID);
        }else{
            setTimeout(() => {
                trackProgress(trackerID);
            }, 1000);
        }
    })
}

function getPDF(trackerID){
    downloadFile(widget_settings.qv_token, trackerID).then(res => {
        let url = res.urlSigned;
        var link = document.createElement('a');
        link.href = url;
        link.download = 'PDF_Export.pdf';
        link.dispatchEvent(new MouseEvent('click'));

        loading = false;
        loading_element.style.display = "none";
        download_text.innerHTML = 'Starting PDF download...';
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