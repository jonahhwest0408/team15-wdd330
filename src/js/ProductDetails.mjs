import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  let discountMessage = "";
  if (product.FinalPrice < product.SuggestedRetailPrice) {
    const discountPercentage = Math.round(
    ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100
    );
    discountMessage = `<p class="product__discount">Discount: ${discountPercentage}% off!</p>`;
  }
  return `
    <section class="product-detail">
      <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      <img class="divider" src="${product.Image}" alt="${product.NameWithoutBrand}">
      <p class="product-card__price">$${product.FinalPrice}</p>
      <p class="discount">${discountMessage}</p>
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">${product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
    </section>
  `;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails("main");

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.innerHTML = productDetailsTemplate(this.product);
    }
  }

  addToCart() {
    let cart = getLocalStorage("so-cart") || [];
  
    const productInCart = cart.find(item => item.Id === this.product.Id);
  
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      this.product.quantity = 1;
      cart.push(this.product);
    }
  
    setLocalStorage("so-cart", cart);
    console.log("Product added to cart:", cart); 
  }
}