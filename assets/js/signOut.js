let signoutBtn = document.getElementById("signout");
console.log(signoutBtn);

function signOut() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUserID");
  window.location.href = "../../index.html";
}
signoutBtn.addEventListener("click", signOut);
