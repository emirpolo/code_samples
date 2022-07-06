const loginTemplate = function () {
  return `<div class="login">
    <h2>Welcome</h2>
    <fieldset>
      <label for="">Email</label>
      <input type="text" placeholder="user@sample.com" id="email">
    </fieldset>
    <fieldset>
      <label for="">Password</label>
       <input type="password" id="password">
    </fieldset>
    <fieldset class="center">
      <button onclick="login()">Log In</button>
    </fieldset>
  </div>`;
}

const dashboardTemplate = function () {
  const org = loggedUser.organization_id ? 
  `<br > Organization: <b>${loggedUser.organization.name}</b>` : '';

  const new_page_bto = loggedUser.account_type == 'composer' ? 
  `<button class="new-page-bto" onclick="openNewPageModal('show')">Create New</button>` : '' ;

  return `<div class="dashboard">
    <div class="left-bar">
      <div class="user-info">
        User Name: <b>${loggedUser.name}</b> <br /> Email: <b>${loggedUser.email}</b> <br /> Account Type: <b class="cap">${loggedUser.account_type}</b> ${org}  <br /><span class="logout" onclick="logout()">Logout</span>
      </div>
      <h3>Pages</h3>
      ${new_page_bto}
      <div id="left-bar-content"></div>
    </div>
    <div class="content" id="dashboard-content"></div>
  </div>`;
}

const pagesListTemplate = function (items) {
  let template = `<ul class="pages-list">`;
  items.forEach(element => {
    template += `<li onclick="showPage('${element.pageid}', ${!element.system_user_id ? true : false})">${element.name} ${!element.system_user_id || loggedUser.account_type == 'viewer'  ? '(View Only)' : ''}</li>`;
  });
  template += `</ul>`;
  return template;
}

const pagesSelectorTemplate = function(items){
  let template = `<option value="">Select</option>`;
  items.forEach(element => {
    template += `<option value="${element.pageid}">${element.name}</option>`;
  });
  return template;
}

const pageViewWidgetTemplate = function () {
  return `<qrvey-end-user settings="config"></qrvey-end-user>
  </div>`;
}

const pageBuilderWidgetTemplate = function () {
  return `<qrvey-builders settings="config"></qrvey-builders>
  </div>`;
}