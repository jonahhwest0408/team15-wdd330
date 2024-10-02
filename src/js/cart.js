import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";  

const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();  
loadHeaderFooter();  

function removeItemFromCart(event) {
  const productId = event.target.getAttribute("data-id");
  let cartItems = getLocalStorage("so-cart") || [];  
  
  cartItems = cartItems.filter((item) => item.Id !== productId);

  setLocalStorage("so-cart", cartItems);
  cart.renderCartContents();  
}

document.querySelector(".product-list").addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-item")) {
    removeItemFromCart(event);
  }
});