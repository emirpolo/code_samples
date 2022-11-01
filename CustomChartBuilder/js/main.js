let loading = true;
let generate_button;

function getSelectValues(select) {
    let result = [];
    let options = select && select.options;
    let opt;

    for (let i = 0, iLen = options.length; i < iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }
    return result;
}

function generateTableChart() {
    if (loading) return;
    const title = document.querySelector('#table_name').value;
    const columns = getSelectValues(document.querySelector('#columns')) || [];
    const output = document.querySelector('#output').value;
    document.querySelector("#chart").innerHTML = '<p class="message">Generating Table...</p>';
    if ((!title || title == '') || columns.length == 0) return;

    loading = true;
    generate_button.innerHTML = "Generating Table...";
    getTableModel().then(res => {
        let table_model = res;
        let new_column_list = [];
        columns.forEach(c => {
            column = table_model.data.chart.fields.columnsList.filter(cl => cl.data.id == c);
            new_column_list.push(column[0]);
        })
        table_model.data.chart.fields.columnsList = new_column_list;
        table_model.data.name = title;
        table_model.data.title = title;
        saveNewChart(table_model, output);
        
    });
}

function saveNewChart(model, output) {
    const product_line = document.querySelector("#product_line").value == 'none' ? false : document.querySelector("#product_line").value;
    const product_scale = document.querySelector("#product_scale").value == 'none' ? false : document.querySelector("#product_scale").value;
    const product_vendor = document.querySelector("#product_vendor").value == 'none' ? false : document.querySelector("#product_vendor").value;


    getJwtToken({"expiresIn": '1w'}).then(res => {
        const qvtoken = res;
        let config = {
            ...model,
            userid: USER_ID,
            appid: APP_ID,
            qrveyid: DATASET_ID,
            domain: DOMAIN,
            qv_token: qvtoken,
            panel: {
                "header": {
                    "filter": false,
                    "menu": ["DOWNLOAD"]
                },
                "body": {
                    "popup": {
                        "items": [
                            {
                                "label": "SEEDATA"
                            },
                            {
                                "label": "FILTERBY"
                            },
                            {
                                "label": "DRILLDOWN"
                            }
                        ]
                    }
                }
            },
            userFilters: {
                "filters": [
                    {
                        "operator": "AND",
                        "expressions": []
                    }
                ]
            }
        }

        if (product_line) {
            config.userFilters.filters[0].expressions.push(
                {
                    "qrveyid": DATASET_ID,
                    "questionid": "vI0CB3Bv8", //Product Line
                    "validationType": "EQUAL",
                    "value": [product_line]
                }
            );
        }

        if (product_scale) {
            config.userFilters.filters[0].expressions.push(
                {
                    "qrveyid": DATASET_ID,
                    "questionid": "ST6kZ7YJf", //Product Scale
                    "validationType": "EQUAL",
                    "value": [product_scale]
                }
            );
        }

        if (product_vendor) {
            config.userFilters.filters[0].expressions.push(
                {
                    "qrveyid": DATASET_ID,
                    "questionid": "g4UMrN3qm", //Product Vendor 
                    "validationType": "EQUAL",
                    "value": [product_vendor]
                }
            );
        }


        console.log(config);

        doOutPut(config, output);

    });
}

function doOutPut(config, output) {
    switch (output) {
        case 'HTML':
            window['panel_config'] = config;
            document.querySelector("#chart").innerHTML = `<div class="panel-wrap"><an-panel config='panel_config'></an-panel></div>`;
            loading = false;
            generate_button.innerHTML = "Generate";
            break;

        default:
            generate_button.innerHTML = "Downloading file...";
            document.querySelector("#chart").innerHTML = '<p class="message">Downloading file...</p>';
            const panel = Object.assign(document.createElement('an-panel'), { config });
            panel.addEventListener('ON_AN_PANEL_CONFIG_READY', function () {
                setTimeout(() => {
                    panel.shadowRoot.querySelector('an-panel-body')
                        .ctx.onMenuOptionSelected('DOWNLOAD->' + output);
                }, 1000);
            })
            document.getElementById("anpanel-export-helper").append(panel);
            break;
    }
}

function buildColumnsSelector() {
    const columns_selector = document.querySelector('#columns');
    getColumns().then(res => {
        loading = false;
        const columns = res.columns;
        let html = '';
        columns.forEach(c => {
            html += `<option value="${c.columnId}">${c.columnName}</option>`;
        });
        columns_selector.innerHTML = html;
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    buildColumnsSelector();
    generate_button = document.querySelector("#generate");
    window['BusStore'] = {store: {stylesSettings: {}}};

    document.addEventListener('ON_AN_PANEL_DOWNLOADED', function (data) {
        console.log(data);
        loading = false;
        generate_button.innerHTML = "Generate";
        // document.querySelector("#chart").innerHTML = '';
    });
})