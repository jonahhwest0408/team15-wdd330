import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const totalPrice = item.FinalPrice * item.quantity;
  const imageUrl = item.Images ? item.Images.PrimarySmall : 'placeholder.jpg';
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${imageUrl}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.quantity}</p>
    <p class="cart-card__price">$${totalPrice.toFixed(2)}</p>
    <button class="remove-item" data-id="${item.Id}">X</button>
  </li>`;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key) || [];

    if (cartItems.length > 0) {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");

      const totalPrice = cartItems.reduce(
        (total, item) => total + (item.FinalPrice * item.quantity),
        0
      );

      document.getElementById("cartTotal").textContent = totalPrice.toFixed(2);

      document.querySelector(".cart-footer").classList.remove("hide");
    } else {
      document.querySelector(this.parentSelector).innerHTML = "<p>Your cart is empty</p>";
      document.querySelector(".cart-footer").classList.add("hide");
    }
  }
}
