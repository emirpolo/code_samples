function getReportDashboard(items) {
  if (items.length == 0) {
    return `<h4 class="empty-r-dashboard">You don't have reports</h4>`;
  } else {
    let reports_html = `<table class="reports-table">
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Created at</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>`;
    items.forEach(element => {
      let name = element.name.replace("'", '|');
      reports_html += `<tr>
                <td class="favorite" id="fav-${element.pageid}"><span onclick="favReport('${element.pageid}',${element.favorite_report ? true : false})">${element.favorite_report ? '★' : '☆'}</span></td>
                <td class="r-name"><span onclick="editReport('${element.pageid}', '${name}')">${element.name}</span></td>
                <td>${getDateTime(element.createDate)}</td>
                <td><span title="Delete" class="delete" onclick="deleteReportConfirmation('${element.pageid}', '${name}')">🗑</span></td>
            </tr>`;
    });
    reports_html += `</tbody>
        </table>`;
    return reports_html;
  }
}

function getEditReportTemplate() {
  return `<qrvey-builders settings="enduser_config"></qrvey-builders>`;
}

function getReportList(items) {
  if (items.length == 0) {
    return `<h4 class="empty-r-dashboard">You don't have reports</h4>`;
  } else {
    let reports_html = '<ul>';
    items.forEach(element => {
      let name = element.name.replace("'", '|');
      reports_html += `<li>
                <label for="fav-${element.pageid}"> <input id="fav-${element.pageid}" type="radio" name="selected_report" value="${element.pageid}"> ${element.name}</label>
            </li>`;
    });
    reports_html += '</ul>';
    return reports_html;
  }
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