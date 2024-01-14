let cartItem = [];
let container = document.getElementById("slider-image");
let sliderTitle = document.getElementById("slider-h1");
let sliderPrice = document.getElementById("slider-price");
let shopBtn = document.getElementById("shopBtn");
let imageSliderLink = document.getElementById("imageSliderLink");

window.addEventListener("scroll", function () {
  let navbar = this.document.querySelector("#header");
  navbar.classList.toggle("sticky", this.window.scrollY > 0);
});

const apiUrl = "https://fakestoreapi.com/products";
let sliderCounter = 8;

async function listItems() {
  const response = await fetch(apiUrl);
  let data = await response.json();
  console.log(data);
  showProducts(data);
  slider(data);
  setInterval(() => {
    sliderCounter = (sliderCounter + 1) % data.length;

    slider(data);
    if (sliderCounter >= 13) {
      sliderCounter = 8;
    }
  }, 6000);
}

let categoriesRow = document.getElementById("categoriesRow");

async function listCategories() {
  const response = await fetch("https://fakestoreapi.com/products/categories");
  const data = await response.json();
  console.log(data, "cate");
  data.forEach((cat) => {
    let div = document.createElement("div");
    div.classList.add("cat");
    let h4 = document.createElement("h4");
    h4.innerHTML = cat;
    div.appendChild(h4);
    categoriesRow.appendChild(div);
  });
}

function slider(data) {
  let users = getUsersFromStorage();

  const userData = localStorage.getItem("users");
  let userId = localStorage.getItem("currentUserID");
  userId = JSON.parse(userId);
  if (userId) {
    let users = JSON.parse(userData);
    users.forEach((info) => {
      if (info.id === userId) {
        container.src = data[sliderCounter].image;
        container.style.height = "60vh";
        container.style.width = "100%";
        container.style.backgroundRepeat = "no-repeat";
        sliderTitle.innerHTML = data[sliderCounter].title;
        sliderPrice.innerHTML = data[sliderCounter].price + "&euro;";
        shopBtn.innerHTML = "Shop Now";
        shopBtn.href = `../../product.html?id=${data[sliderCounter].id} `;
        imageSliderLink.href = `../../product.html?id=${data[sliderCounter].id} `;
      }
    });
  } else {
    container.src = data[sliderCounter].image;
    container.style.height = "60vh";
    container.style.width = "100%";
    container.style.backgroundRepeat = "no-repeat";
    sliderTitle.innerHTML = data[sliderCounter].title;
    sliderPrice.innerHTML = data[sliderCounter].price + "&euro;";
    shopBtn.innerHTML = "Shop Now";
    shopBtn.href = `javascript: void(0)`;
    imageSliderLink.href = `javascript: void(0)`;
  }
}

function showProducts(data) {
  let productDiv = document.getElementById("products");

  let users = getUsersFromStorage();

  const userData = localStorage.getItem("users");
  let userId = localStorage.getItem("currentUserID");
  userId = JSON.parse(userId);
  if (userId) {
    let users = JSON.parse(userData);

    users.forEach((info) => {
      if (info.id === userId) {
        data.forEach((product) => {
          let productId = product.id;
          let productBox = document.createElement("div");
          productBox.classList.add("product-box");
          let link = document.createElement("a");
          link.href = `../product.html?id=${productId}`;
          let image = document.createElement("img");
          image.src = product.image;
          let productDesc = document.createElement("div");
          productDesc.classList.add("product-desc");
          let productTitle = document.createElement("h3");
          productTitle.innerHTML = product.title;
          let productPrice = document.createElement("h4");
          productPrice.innerHTML = product.price + "&euro;";
          let productIcons = document.createElement("div");
          productIcons.classList.add("product-icons");
          let cart = document.createElement("i");
          cart.classList.add("fa-solid", "fa-cart-shopping");
          cart.setAttribute("id", "cart");
          let heart = document.createElement("i");
          heart.classList.add("fa-regular", "fa-heart");
          cart.addEventListener("click", (e) => {
            let clicked = e.target;
            console.log(productId);

            let cartItem = getCartItems();

            let items = {
              id: productId,
              itemImg: product.image,
              itemTitle: product.title,
              itemPrice: product.price,
            };
            console.log(items, "items");
            console.log(cartItem, "cartitem");
            cartItem.push(items);
            localStorage.setItem("cart", JSON.stringify(cartItem));
          });
          link.appendChild(image);
          productBox.appendChild(link);
          productDesc.appendChild(productTitle);
          productDesc.appendChild(productPrice);
          productBox.appendChild(productDesc);
          productDesc.appendChild(productIcons);
          productIcons.appendChild(cart);
          productIcons.appendChild(heart);
          productDiv.appendChild(productBox);
          console.log(document.querySelectorAll(".product-desc h3"));
        });
      }
    });
  } else {
    data.forEach((product) => {
      let productBoxSec = document.createElement("div");
      productBoxSec.classList.add("product-box");
      let imageSec = document.createElement("img");
      imageSec.src = product.image;
      let productDescSec = document.createElement("div");
      productDescSec.classList.add("product-desc");
      productDescSec.style.justifyContent = "flex-end";
      let productTitleSec = document.createElement("h3");
      productTitleSec.innerHTML = product.title;
      let productPriceSec = document.createElement("h4");
      productPriceSec.innerHTML = product.price + "&euro;";
      productBoxSec.appendChild(imageSec);
      productDescSec.appendChild(productTitleSec);
      productDescSec.appendChild(productPriceSec);
      productBoxSec.appendChild(productDescSec);
      productDiv.appendChild(productBoxSec);
    });
  }
}
function getCartItems() {
  let cartItem;
  if (localStorage.getItem("cart") === null) {
    cartItem = [];
  } else {
    cartItem = JSON.parse(localStorage.getItem("cart"));
  }
  console.log(cartItem.length);
  return cartItem;
}

getCartItems();
listItems();
listCategories();
