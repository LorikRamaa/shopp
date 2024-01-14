let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let form = document.querySelector("form");

function login(e) {
  e.preventDefault();
  let emailValue = emailInput.value;
  let passwordValue = passwordInput.value;

  let users = localStorage.getItem("users");
  let data = JSON.parse(users);
  console.log(data);

  data.forEach((user) => {
    if (user.email === emailValue && user.password === passwordValue) {
      console.log(user.name);
      localStorage.setItem("currentUserID", JSON.stringify(user.id));
      localStorage.setItem("isLoggedIn", JSON.stringify(user.name));
      window.location.href = "../../profile.html";
    } else {
      console.log("spobon");
    }
  });
}

form.addEventListener("submit", login);
