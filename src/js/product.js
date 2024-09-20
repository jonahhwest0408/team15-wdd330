import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// modified function to handle multiple items
function addProductToCart(product) {
  // retrieve existing cart from localStorage, or initialize it as empty array
  let currentCart = JSON.parse(localStorage.getItem("so-cart")) || [];

  // if the cart is not an array, convert to an array
  if (!Array.isArray(currentCart)) {
    currentCart = [currentCart];
  }

  // Add the new product to the existing cart array
  currentCart.push(product);

  // Save the updated cart array back to localStorage
  setLocalStorage("so-cart", currentCart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);