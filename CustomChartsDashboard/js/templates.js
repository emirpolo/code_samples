function getVisualsDashboard(items, view, qvtoken) {
  if (items.length == 0) {
    return `<h4 class="empty-r-dashboard">You don't have visuals</h4>`;
  } else {

    if (view == "visual") {
      return visualViewport(items, qvtoken)
    } else {
      return listView(items);
    }

  }
}

function listView(items) {
  let dashboard_html = `<table class="reports-table">
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Created at</th>
                    <th class="center-text">JPEG Download</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>`;
  items.forEach(element => {
    let name = element.name.replace("'", '|');
    dashboard_html += `<tr>
                <td class="favorite" id="fav-${element.chartid}"><span onclick="favVisual('${element.chartid}',${element.favorite_visual ? true : false})">${element.favorite_visual ? '★' : '☆'}</span></td>
                <td class="r-name"><span onclick="editVisual('${element.chartid}', '${name}')">${element.name}</span></td>
                <td>${getDateTime(element.createDate)}</td>
                <td class="center-text"><span title="Download JPEG" class="delete icon" onclick="donwloadVisualJPEG('${element.chartid}', '${name}')">⬇️<i class="tooltip">Download</i></span></td>
                <td><span title="Delete" class="delete icon" onclick="deleteVisualConfirmation('${element.chartid}', '${name}')">🗑 <i class="tooltip">Delete</i></span></td>
            </tr>`;
  });
  dashboard_html += `</tbody>
        </table>`;


  return dashboard_html;
}

function visualViewport(items, qvtoken) {
  let dashboard_html = '<div class="visual-view-panels">';
  items.forEach(element => {
    var config = {
      domain: DOMAIN,
      qv_token: qvtoken,
      user_id: element.userid,
      qrvey_id: element.qrveyid,
      type: "CHART",
      chart_id: element.chartid,
      panel: {
        "header": {
          "filter": true,
          "menu": true,
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
      }

    }
    dashboard_html += `<div class="panel-wrap"><an-panel config='${JSON.stringify(config)}'></an-panel></div>`;
  });

  dashboard_html += '</div>'

  return dashboard_html;
}


function getDateTime(time) {
  const d = new Date(time);
  const year = d.getFullYear() // 2019
  const monthIndex = d.getMonth()
  const date = d.getDate() // 23
  const hour = d.getHours();
  const minutes = d.getMinutes();
  return `${monthIndex + 1}/${date}/${year} ${hour}:${minutes}`;
}