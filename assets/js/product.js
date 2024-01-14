async function product() {
  const productId = new URLSearchParams(window.location.search).get("id");
  const response = await fetch(
    `https://fakestoreapi.com/products/${productId}`
  );
  const data = await response.json();
  console.log(data);

  let productDiv = document.getElementById("productDiv");
  productDiv.innerHTML = `
        <div class="prod-image">
            <img src="${data.image}" alt="" />
        </div>
        <div class="prod-desc">
            <h2>${data.title}</h2>
            <h1>${data.price}&euro;</h1>
            <p>${data.description}</p>
            <div class="prod-button">
              <a href="#">Buy now</a>
            </div>
        </div>
  
  `;
}

function emptyCart() {
  let cartItem = localStorage.getItem("cart");

  cartItem = JSON.parse(cartItem);
  document.getElementById("cartLength").innerHTML = cartItem.length;
}
product();
emptyCart();
