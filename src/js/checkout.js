import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

console.log("Checkout JS loaded");

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
  const checkout = new CheckoutProcess("so-cart");
  checkout.init();

  // calculate totals after zip code is entered
  document.getElementById("zip").addEventListener("input", () => {
    checkout.calculateOrderTotal(document.getElementById("zip").value);
  });

  // submit form and checkout
  const checkoutForm = document.getElementById("checkout-form");
  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault(); 
    checkout.checkout(checkoutForm); 
  });
});