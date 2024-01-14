let users = [];
let usernameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let countryInput = document.getElementById("country");
let passwordInput = document.getElementById("password");
let form = document.querySelector("form");
function signUp(e) {
  e.preventDefault();
  let users = getUserFromStorage();
  let $usernameValue = usernameInput.value;
  let $emailValue = emailInput.value;
  let $countryValue = countryInput.value;
  let $passwordValue = passwordInput.value;
  let user = {
    id: users.length + 1,
    name: $usernameValue,
    email: $emailValue,
    country: $countryValue,
    password: $passwordValue,
  };

  users.push(user);
  localStorage.setItem("currentUserID", JSON.stringify(user.id));
  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "../pages/login.html";
}

function getUserFromStorage() {
  let users;
  if (localStorage.getItem("users") === null) {
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("users"));
  }
  return users;
}

form.addEventListener("submit", signUp);
