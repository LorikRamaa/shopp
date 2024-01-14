let cartDiv = document.getElementById("cart");
let allCartDiv = document.getElementById("allCart");
let emptyCartDiv = document.getElementById("emptyCart");
let applyPromo = document.getElementById("applyPromo");
function getUsersFromStorage() {
  let users;
  if (localStorage.getItem("users") === null) {
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("users"));
  }

  return users;
}
let totalPriceCount = 0;
function listCarts() {
  const cartData = localStorage.getItem("cart");
  if (cartData) {
    let data = JSON.parse(cartData);
    console.log(data);
    data.forEach((cartInfo) => {
      let cartBox = document.createElement("div");
      cartBox.classList.add("cart-box");
      cartBox.innerHTML = `
              <div class="img">
                <img src="${cartInfo.itemImg}" alt="" />
              </div>
              <div class="cart-info">
                <div class="info-left">
                  <h3>${cartInfo.itemTitle}</h3>
                  <h1 id="itemPrice">${cartInfo.itemPrice}&euro;</h1>
                </div>
                <div class="info-right">
                  <input type="number" id="itemQuantity" min="1" max="5" onInput="count(this, ${cartInfo.itemPrice})" value="1" />
                  <i class="fa-solid fa-xmark" onClick="deleteProduct(${cartInfo.id})"></i>
                </div>
              </div>
        `;
      cartDiv.appendChild(cartBox);
      let totalPrice = document.getElementById("totalPrice");
      totalPriceCount = totalPriceCount + cartInfo.itemPrice;
      totalPrice.innerHTML = totalPriceCount + "&euro;";
      document.getElementById("totalDue").innerHTML =
        "Total due: " + totalPriceCount + "&euro;";
      document.getElementById("totalCheck").innerHTML =
        totalPriceCount + "&euro;";
      document.getElementById("orderTotalCheck").innerHTML =
        totalPriceCount + "&euro;";
      applyPromo.addEventListener("click", () => {
        console.log("promo");
        let promoCodes = {
          first: "lorik",
          firstPromo: 25.0,
          second: "egzon",
          secondPromo: 15.0,
          third: "pellumb",
          thirdPromo: 35.0,
          forth: "shop",
          forthPromo: 5.0,
        };
        let promo = document.getElementById("promo");
        let promoValue = promo.value.toLowerCase().trim();
        console.log(promoValue);
        let smallPromo = document.getElementById("promoSmall");

        if (promoValue === promoCodes.first) {
          applyPromo.disabled = true;
          document.getElementById("discount").innerHTML =
            "Discount: -" + promoCodes.firstPromo + "&euro;";
          document.getElementById("discountCheck").innerHTML =
            "-" + promoCodes.firstPromo + "&euro;";
          document.getElementById("totalDue").innerHTML =
            "Total due: " + totalPriceCount.toFixed(2) + "&euro;";
          document.getElementById("orderTotalCheck").innerHTML =
            totalPriceCount.toFixed(2) + "&euro;";
          totalPriceCount = totalPriceCount - promoCodes.firstPromo;

          promo.style.borderColor = "#007bff";
          smallPromo.style.display = "block";
          smallPromo.innerHTML = "You enetered Lorik's promo discount ";
          console.log("lorik promo");
          smallPromo.style.color = "#007bff";
        } else if (promoValue === promoCodes.second) {
          applyPromo.disabled = true;
          document.getElementById("discount").innerHTML =
            "Discount: -" + promoCodes.secondPromo + "&euro;";
          document.getElementById("discountCheck").innerHTML =
            "-" + promoCodes.secondPromo + "&euro;";
          document.getElementById("totalDue").innerHTML =
            "Total due: " + totalPriceCount.toFixed(2) + "&euro;";
          document.getElementById("orderTotalCheck").innerHTML =
            totalPriceCount.toFixed(2) + "&euro;";
          totalPriceCount = totalPriceCount - promoCodes.secondPromo;

          promo.style.borderColor = "#007bff";
          smallPromo.style.display = "block";
          smallPromo.innerHTML = "You enetered Egzon's promo discount ";
          console.log("egzon promo");
          smallPromo.style.color = "#007bff";
        } else if (promoValue === promoCodes.third) {
          applyPromo.disabled = true;
          document.getElementById("discount").innerHTML =
            "Discount: -" + promoCodes.thirdPromo + "&euro;";
          document.getElementById("discountCheck").innerHTML =
            "-" + promoCodes.thirdPromo + "&euro;";
          document.getElementById("orderTotalCheck").innerHTML =
            totalPriceCount + "&euro;";
          document.getElementById("totalDue").innerHTML =
            "Total due: " + totalPriceCount.toFixed(2) + "&euro;";
          totalPriceCount = totalPriceCount - promoCodes.thirdPromo;

          promo.style.borderColor = "#007bff";
          smallPromo.style.display = "block";
          smallPromo.innerHTML = "You enetered Pellumb's promo discount ";
          console.log("pellumb promo");
          smallPromo.style.color = "#007bff";
        } else if (promoValue === promoCodes.forth) {
          applyPromo.disabled = true;
          document.getElementById("discount").innerHTML =
            "Discount: -" + promoCodes.forthPromo + "&euro;";
          document.getElementById("discountCheck").innerHTML =
            "-" + promoCodes.forthPromo + "&euro;";
          document.getElementById("orderTotalCheck").innerHTML =
            totalPriceCount + "&euro;";
          document.getElementById("totalDue").innerHTML =
            "Total due: " + totalPriceCount.toFixed(2) + "&euro;";
          totalPriceCount = totalPriceCount - promoCodes.forthPromo;

          promo.style.borderColor = "#007bff";
          smallPromo.style.display = "block";
          smallPromo.innerHTML = "You enetered Lorik's promo discount ";
          console.log("lorik promo");
          smallPromo.style.color = "#007bff";
        } else if (
          promoValue != promoCodes.first &&
          promoValue != promoCodes.second &&
          promoValue != promoCodes.third &&
          promoValue != promoCodes.forth
        ) {
          totalPriceCount = totalPriceCount;
          promo.style.borderColor = "#d6293e";
          smallPromo.style.display = "block";
          smallPromo.innerHTML = "This promo code is not valid";
          smallPromo.style.color = "#d6293e";
          document.getElementById("discountCheck").innerHTML = "0.00&euro;";

          document.getElementById("orderTotalCheck").innerHTML =
            totalPriceCount + "&euro;";
        } else {
          totalPriceCount = totalPriceCount;
          document.getElementById("discountCheck").innerHTML = "0.00&euro;";

          document.getElementById("orderTotalCheck").innerHTML =
            totalPriceCount + "&euro;";
          console.log("no promo");
        }
      });
    });
  }
}

function count(input, itemPrice) {
  let itemQuantity = input.value;
  let itemPriceTitle =
    input.parentNode.previousElementSibling.querySelector("#itemPrice");
  itemPriceTitle.innerHTML = itemQuantity * itemPrice + "&euro;";

  let totalPrice = document.getElementById("totalPrice");

  totalPriceCount = itemPrice * itemQuantity;

  totalPrice.innerHTML = totalPriceCount + "&euro;";
}

function deleteProduct(productId) {
  let cartItem = localStorage.getItem("cart");
  cartItem = JSON.parse(cartItem);
  let productIndex = cartItem.findIndex(
    (products) => productId === products.id
  );

  console.log(productIndex);
  if (productIndex !== -1) {
    if (confirm("are you sure want to delete this product?")) {
      cartItem.splice(productIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cartItem));
      location.reload();
    } else {
      console.log("this product doesnt egsist");
    }
  }
}

function emptyCart() {
  let cartItem = localStorage.getItem("cart");

  // Parse the string into an array
  cartItem = JSON.parse(cartItem);

  if (cartItem.length === 0) {
    emptyCartDiv.style.display = "flex";
    emptyCartDiv.style.alignItems = "center";
    emptyCartDiv.style.justifyContent = "center";
    emptyCartDiv.style.flexDirection = "column";
    allCartDiv.style.display = "none";
  } else {
    emptyCartDiv.style.display = "none";
    allCartDiv.style.display = "flex";
  }
}
function getCartItems() {
  let cartItem;
  if (localStorage.getItem("cart") === null) {
    cartItem = [];
  } else {
    cartItem = JSON.parse(localStorage.getItem("cart"));
  }
  return cartItem;
}

function listCheckoOuts() {
  let users = getUsersFromStorage();

  const userData = localStorage.getItem("users");
  let userId = localStorage.getItem("currentUserID");
  userId = JSON.parse(userId);
  if (userData) {
    let users = JSON.parse(userData);

    users.forEach((userDatas) => {
      if (userDatas.id === userId) {
        let emailCart = document.getElementById("emailCart");
        emailCart.innerHTML = userDatas.email;
      }
    });
  }

  let cart = getCartItems();
  let checkContainer = document.getElementById("checkItems");
  const cartData = localStorage.getItem("cart");
  if (cartData) {
    let data = JSON.parse(cartData);
    console.log(data);
    data.forEach((itemCheck) => {
      console.log(itemCheck);
      let checkBoxdiv = document.createElement("div");
      checkBoxdiv.classList.add("checkBox");
      checkBoxdiv.innerHTML = `
          <div class="rightCheckText">
            <img src="${itemCheck.itemImg}" alt="" />
            <div class="checkText">
                <h3>${itemCheck.itemTitle}</h3>
                <br />
            </div>
          </div>
          <h3 class="price-check">Price: ${itemCheck.itemPrice}&euro;</h3>
      `;
      checkContainer.appendChild(checkBoxdiv);
    });
  }
}

let confirmOrder = document.getElementById("confirmOrder");
let trackOrderBtn = document.getElementById("trackOrder");
let checkoutDiv = document.getElementById("checkoutDiv");
let checkOut = document.getElementById("checkOut");
let cancelOrder = document.getElementById("cancelOrder");
confirmOrder.addEventListener("click", () => {
  checkoutDiv.classList.add("active");
  checkOut.classList.add("active");
  console.log("clicked");
});
trackOrderBtn.addEventListener("click", () => {
  // this.classList.toggle("active");
  checkoutDiv.classList.remove("active");
  checkOut.classList.remove("active");
  localStorage.setItem("cart", JSON.stringify([]));
  location.reload();
});
cancelOrder.addEventListener("click", () => {
  checkoutDiv.classList.remove("active");
  checkOut.classList.remove("active");
});

listCheckoOuts();
emptyCart();
listCarts();
