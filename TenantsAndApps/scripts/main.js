let mainApp;
let loggedUser;
let leftBar;
let dashboardContent;
let newPageModal;
let pagesSelector;
let userPages;
let createNewPageBto;
let creating = false;
let pageBuilderStyles = `
.qpb-navigation-link:nth-child(3),
.qpb-navigation-link:nth-child(2),
.qpb-publish-container > *{
  display: none !important;
  visibility: hidden !important;
}
`;

function startApp() {
  if (!loggedUser) {
    mainApp.innerHTML = loginTemplate();
  } else {
    mainApp.innerHTML = dashboardTemplate();
    leftBar = document.querySelector("#left-bar-content");
    dashboardContent = document.querySelector("#dashboard-content");
    newPageModal = document.querySelector("#new-page-modal");
    pagesSelector = document.querySelector("#pages-selector");
    createNewPageBto = document.querySelector("#create-new-page-bto");
    initLeftBar();
  }
}

function initLeftBar() {
  leftBar.innerHTML = "<span class='loading'>Loading...</span>";

  getPages(loggedUser.qrvey_info.userid, loggedUser.qrvey_info.appid).then(res => {
    console.log(res);
    userPages = res.Items;
    leftBar.innerHTML = pagesListTemplate(res.Items);
    pagesSelector.innerHTML = pagesSelectorTemplate(res.Items);
  })
}

function showPage(pageid, view_only) {
  let asset_permissions = {};
  if (!view_only) {
    asset_permissions = {
      pages: {
        page_ids: [
          pageid
        ]
      }
    }
  }

  let permissions = [
    {
      "dataset_id": "Ev4lk9DeI",
      "record_permissions": [
        {
          "security_name": "customer_number",
          "values": [
            loggedUser.account_type == "composer" ? loggedUser.id : loggedUser.organization_id
          ]
        }
      ]
    }
  ];

  getJwtToken(loggedUser.qrvey_info.userid, loggedUser.qrvey_info.appid, { pageid, asset_permissions, permissions }).then(res => {
    window['config'] = {
      domain: QRVEY_DOMAIN,
      qv_token: res
    }
    if (!view_only && loggedUser.account_type == 'composer') {
      window.config["customCSSRules"] = pageBuilderStyles;
      dashboardContent.innerHTML = pageBuilderWidgetTemplate();
      runEndUser(true /* True if it's pageBuilder, False if it's pageView widget */, false /* False if you want to set your on CSS, True if you want for the script to apply a default pageBuilder Limited view */);
    } else {
      dashboardContent.innerHTML = pageViewWidgetTemplate();
    }
  });
}

function openNewPageModal(show) {
  newPageModal.style.display = show ? 'block' : 'none';
}

function addNewPage() {
  if (creating) return;
  const page_name = document.querySelector("#page-name").value;
  const from_template = document.querySelector("#pages-selector").value;
  if (!page_name || page_name == "") {
    alert("Please, type a page name");
    return;
  }
  createNewPageBto.innerHTML = "Creating Page...";
  creating = true;
  if (from_template && from_template != '') {

    // Doing DeepClone and editing the created page
    clonePage(loggedUser.qrvey_info.userid, loggedUser.qrvey_info.appid, from_template).then(res => {
      getPage(res.pageId, loggedUser.qrvey_info.userid, loggedUser.qrvey_info.appid).then(res2 => {
        res2["system_user_id"] = loggedUser.email;
        res2["name"] = page_name;
        updatePage(res2, loggedUser.qrvey_info.userid, loggedUser.qrvey_info.appid).then(res3 => {
          console.log(res);
          showPage(res.pageId, false);
          initLeftBar();
          openNewPageModal();
          createNewPageBto.innerHTML = "Create";
          creating = false;
        });
      });
    });

  } else {
    createPage(page_name, loggedUser.qrvey_info.userid, loggedUser.qrvey_info.appid).then(res => {
      console.log(res);
      showPage(res.pageid, false);
      initLeftBar();
      openNewPageModal();
      createNewPageBto.innerHTML = "Create";
      creating = false;
    });
  }
}

function login() {
  const email = document.querySelector("#email").value;
  if (!email || email == "") {
    alert("Please, type email and password.");
    return;
  }
  let user = USERS.filter(u => email == u.email)[0];
  if (user) {
    if (user.account_type == "viewer") {
      const organization = USERS.filter(u => user.organization_id == u.id)[0];
      user["qrvey_info"] = organization.qrvey_info;
      user["organization"] = {
        name: organization.name
      };
    }
    localStorage.setItem('loggedUser', JSON.stringify(user));
    loggedUser = user;
    startApp();
  } else {
    alert("Email does not exist.");
    return;
  }

}

function logout() {
  loggedUser = null;
  localStorage.removeItem('loggedUser');
  startApp();
}

document.addEventListener('DOMContentLoaded', (event) => {
  mainApp = document.querySelector("#main-app");
  loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

  document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
      openNewPageModal();
    }
  };
  startApp();
})