function buildTenantSelector(elements) {
  var html = `
  <option value="" selected>Select</option>`;
  elements.forEach(el => {
      html += `<option value="${el.id}">${el.name}</option>`;
  });
  document.getElementById("tenant").innerHTML = html;
}

function buildUsersSelector(tenant) {
  var html = `
  <option value="" selected>Select Tenant User</option>`;
  tenant.users.forEach(el => {
      html += `<option value="${el.id}">${el.name}</option>`;
  });
  document.getElementById("tenant-users").innerHTML = html;
}