let dropdown = document.getElementById("dropdown");

function getUsersFromStorage() {
  let users;
  if (localStorage.getItem("users") === null) {
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("users"));
  }

  return users;
}

document.addEventListener("DOMContentLoaded", function () {
  let users = getUsersFromStorage();

  const userData = localStorage.getItem("users");
  let userId = localStorage.getItem("currentUserID");
  userId = JSON.parse(userId);
  if (userId) {
    let users = JSON.parse(userData);

    users.forEach((info) => {
      if (info.id === userId) {
        let dropdownMenu = document.createElement("div");
        dropdownMenu.classList.add("dropdown-menu");
        dropdownMenu.setAttribute("id", "dropdown-menu");
        let dropdownName = document.createElement("h3");
        dropdownName.innerHTML = info.name;
        let dropdownProfileLink = document.createElement("a");
        dropdownProfileLink.href = "../profile.html";
        dropdownProfileLink.innerHTML = "Profile";
        let dropdownProfileWishlist = document.createElement("a");
        dropdownProfileWishlist.href = "../wishlist.html";
        dropdownProfileWishlist.innerHTML = "Wishlist";
        let dropdownProfileSignOut = document.createElement("a");
        dropdownProfileSignOut.innerHTML = "Sign out";
        dropdownProfileSignOut.setAttribute("id", "signout");
        dropdownMenu.appendChild(dropdownName);
        dropdownMenu.appendChild(dropdownProfileLink);
        dropdownMenu.appendChild(dropdownProfileWishlist);
        dropdownMenu.appendChild(dropdownProfileSignOut);
        dropdown.appendChild(dropdownMenu);
        let cartLink = document.createElement("a");
        cartLink.href = "assets/pages/cart.html";
        cartLink.classList.add("fa-solid", "fa-cart-shopping");
        let cartSpan = document.createElement("span");
        cartSpan.setAttribute("id", "cartLength");
        cartLink.appendChild(cartSpan);
        emptyCart(cartSpan);

        let navLinks = document.getElementById("navLinks");
        navLinks.appendChild(cartLink);
        dropdown.addEventListener("click", () => {
          dropdownMenu.classList.toggle("active");
        });
        dropdownProfileSignOut.addEventListener("click", () => {
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("currentUserID");
          window.location.href = "../../index.html";
        });
      }
    });
  } else {
    let dropdownMenu = document.createElement("div");
    dropdownMenu.classList.add("dropdown-menu-signout");
    dropdownMenu.setAttribute("id", "dropdown-menu");
    let dropdownProfileLink = document.createElement("a");
    dropdownProfileLink.href = "../assets/pages/signup.html";
    dropdownProfileLink.innerHTML =
      "Sign Up <i class='fa-solid fa-right-to-bracket'></i>";
    dropdown.addEventListener("click", () => {
      dropdownMenu.classList.toggle("active");
    });
    dropdownMenu.appendChild(dropdownProfileLink);
    dropdown.appendChild(dropdownMenu);
  }
});
function emptyCart(cartSpan) {
  let cartItem = localStorage.getItem("cart");

  cartItem = JSON.parse(cartItem);
  cartSpan.innerHTML = cartItem.length;
}
