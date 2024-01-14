let usernameInput = document.getElementById("name");
let changeNameInput = document.getElementById("changeName");
let changeEmailInput = document.getElementById("changeEmail");
let changePasswordInput = document.getElementById("changePassword");
let emailInput = document.getElementById("email");
let countryInput = document.getElementById("country");
let passwordInput = document.getElementById("password");

function getUsersFromStorage() {
  let users;
  if (localStorage.getItem("users") === null) {
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("users"));
  }

  return users;
}

// change name
let saveNameBtn = document.getElementById("changeNameButton");
function changeName() {
  let userId = localStorage.getItem("currentUserID");
  userId = JSON.parse(userId);
  let userNewName = localStorage.getItem("users");
  userNewName = JSON.parse(userNewName);
  console.log(userNewName);
  userNewName.forEach((user) => {
    if (user.id === userId) {
      user.name = changeNameInput.value;
      changeNameInput.value = "";
      location.reload();
      localStorage.setItem("users", JSON.stringify(userNewName));
    }
  });
}
saveNameBtn.addEventListener("click", changeName);

// change email
let saveEmailBtn = document.getElementById("changeEmailButton");
function changeEmail() {
  let userId = localStorage.getItem("currentUserID");
  userId = JSON.parse(userId);
  let userNewEmail = localStorage.getItem("users");
  userNewEmail = JSON.parse(userNewEmail);
  console.log(userNewEmail);
  userNewEmail.forEach((user) => {
    if (user.id === userId) {
      user.email = changeEmailInput.value;
      changeEmailInput.value = "";
      location.reload();
      localStorage.setItem("users", JSON.stringify(userNewEmail));
    }
  });
}
saveEmailBtn.addEventListener("click", changeEmail);

// change password
let savePassBtn = document.getElementById("changePassButton");
function changePassword() {
  let userId = localStorage.getItem("currentUserID");
  userId = JSON.parse(userId);
  let userNewPassword = localStorage.getItem("users");
  userNewPassword = JSON.parse(userNewPassword);
  console.log(userNewPassword);
  userNewPassword.forEach((user) => {
    if (user.id === userId) {
      user.password = changePasswordInput.value;
      changePasswordInput.value = "";
      location.reload();
      localStorage.setItem("users", JSON.stringify(userNewPassword));
    }
  });
}
savePassBtn.addEventListener("click", changePassword);
// get informations
document.addEventListener("DOMContentLoaded", function () {
  let users = getUsersFromStorage();

  const userData = localStorage.getItem("users");
  let userId = localStorage.getItem("currentUserID");
  userId = JSON.parse(userId);
  if (userData) {
    let users = JSON.parse(userData);

    users.forEach((info) => {
      if (info.id == userId) {
        console.log(info);
        usernameInput.value = info.name;
        changeNameInput.value = info.name;
        emailInput.value = info.email;
        changeEmailInput.value = info.email;
        countryInput.value = info.country;
        passwordInput.value = info.password;
        changePasswordInput.value = info.password;
      }
    });
  }
});
// function emptyCart() {
//   let cartItem = localStorage.getItem("cart");

//   cartItem = JSON.parse(cartItem);
//   document.getElementById("cartLength").innerHTML = cartItem.length;
// }
// emptyCart();
