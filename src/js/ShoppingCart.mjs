import { getLocalStorage, setLocalStorage } from "./utils.mjs";

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
    <p class="cart-card__quantity">
      qty: 
      <input type="number" class="quantity-input" data-id="${item.Id}" value="${item.quantity}" min="1">
    </p>
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

      this.listenForQuantityChange();
    } else {
      document.querySelector(this.parentSelector).innerHTML = "<p>Your cart is empty</p>";
      document.querySelector(".cart-footer").classList.add("hide");
    }
  }

  listenForQuantityChange() {
    document.querySelectorAll(".quantity-input").forEach(input => {
      input.addEventListener("change", (event) => {
        const newQuantity = parseInt(event.target.value);
        const productId = event.target.getAttribute("data-id");
        this.updateCartQuantity(productId, newQuantity);
      });
    });
  }

  updateCartQuantity(productId, newQuantity) {
    let cartItems = getLocalStorage(this.key) || [];

    const product = cartItems.find(item => item.Id === productId);
    if (product) {
      product.quantity = newQuantity;
      product.totalPrice = product.FinalPrice * newQuantity;
    }

    setLocalStorage(this.key, cartItems);
    this.renderCartContents(); 
  }
}