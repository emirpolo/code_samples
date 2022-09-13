var masterObject = {
    "appid": "vt1gmR0cH",
    "userid": "iN3xBZfkO",
    "domain": "https://demo.qrvey.com",
    "qrveyid": "XEHUcHhmI"
}

function filterA(config, compare) {
    let filter = document.getElementById("filter");
    let compare_value = document.getElementById("compare");
    let panelA = document.getElementById("panelA"); //Panel Tag
    let panelB = document.getElementById("panelB"); //Panel Tag
    let _panelA = document.getElementById("_panelA"); //Panel Container
    let _panelB = document.getElementById("_panelB"); //Panel Container
    !compare && panelA.remove();
    compare && panelB.remove();
    window[config]['userFilters'] = null
    if (filter.value && filter.value != '') {
        const days = LastDays(+filter.value);
        let dateA, dateB;
        if (+filter.value == 1) {
            dateA = days[0];
            dateB = days[0];
        } else {
            dateA = days[0];
            dateB = days[days.length - 1];
        }

        // build User Filter
        if(compare && compare_value.value && compare_value.value != '')
            userFilters = { "filters": [buildFilters(dateA, dateB, compare, compare_value.value)] };
        else
            userFilters = { "filters": [buildFilters(dateA, dateB)] };
            
        window[config]['userFilters'] = userFilters
    }
    an = document.createElement("an-panel");
    an.setAttribute("config", config);
    an.setAttribute("id", compare ? "panelB" : "panelA");
    _panelA.append(an);
    !compare && _panelA.append(an);
    compare && _panelB.append(an);
    console.log("New Config", window[config]);

    if(!compare && compare_value.value && compare_value.value !=''){
        filterA('anPanelConfig2', true);
    }
}

function buildFilters(a, b, compare, compare_value) {

    let filters = {
        "operator": "AND",
        "expressions": []
    };

    filters.expressions.push({
        "questionid": "Hla0pqMGj",
        "validationType": "RANGE",
        "enabled": true,
        "groupValue": "day",
        "value": [{
            "lte": convertDate(a, compare, compare_value),
            "gte": convertDate(b, compare, compare_value)
        }]
    });

    return filters;
}

function convertDate(date, compare, compare_value) {
    date_parts = date.split("/");
    year = 2019;
    month = +date_parts[1];
    if (compare) {
        switch (compare_value) {
            case 'lmonth':
                month--;
                break;
            case 'lyear':
                year--;
                break;

            default:
                break;
        }
    }
    return date ? month + '/' + date_parts[0] + '/' + year : '';
}


function LastDays(days) {
    return [...Array(days).keys()].map(function (n) {
        var d = new Date();
        d.setDate(d.getDate() - n);

        return (function (day, month, year) {
            return [day < 10 ? '0' + day : day, month < 10 ? '0' + month : month, year].join('/');
        })(d.getDate(), d.getMonth(), d.getFullYear());
    });
}