import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";  

const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();  
loadHeaderFooter();  

function removeItemFromCart(event) {
  const productId = event.target.getAttribute("data-id");
  let cartItems = getLocalStorage("so-cart") || [];

  const product = cartItems.find(item => item.Id === productId);

  if (product.quantity > 1) {
    product.quantity -= 1;
    product.totalPrice = product.quantity * product.FinalPrice;
  } else {
    cartItems = cartItems.filter(item => item.Id !== productId);
  }

  setLocalStorage("so-cart", cartItems);
  cart.renderCartContents();
}

document.querySelector(".product-list").addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-item")) {
    removeItemFromCart(event);
  }
});