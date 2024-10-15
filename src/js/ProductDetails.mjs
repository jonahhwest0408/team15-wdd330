import { setLocalStorage, getLocalStorage, alertMessage, setProductBreadcrumb } from "./utils.mjs";

// image carousel
function createImageCarousel(product) {
  let imagesHtml = `
    <div class="carousel">
      <div class="carousel__images">
        <img src="${product.Images.PrimaryLarge}" alt="${product.NameWithoutBrand}" class="carousel__image active" />
  `;

  if (product.Images.ExtraImages && product.Images.ExtraImages.length > 0) {
    product.Images.ExtraImages.forEach((image) => {
      imagesHtml += `
        <img src="${image.Src}" alt="${image.Title}" class="carousel__image" />
      `;
    });
  }

  imagesHtml += `
      </div>
      <button class="carousel__button prev">❮</button>
      <button class="carousel__button next">❯</button>
    </div>
  `;

  return imagesHtml;
}

function productDetailsTemplate(product) {
  // Calculate discount if applicable
  let discountMessage = "";
  let originalPrice = "";
  if (product.SuggestedRetailPrice > product.FinalPrice) {
    const discountAmount = (product.SuggestedRetailPrice - product.FinalPrice).toFixed(2);
    discountMessage = `<p class="product__discount" style="color: red;">Save $${discountAmount}</p>`;
    originalPrice = `<p class="product__original-price" style="text-decoration: line-through; color: gray;">$${product.SuggestedRetailPrice}</p>`;
  }

  const imageCarousel = createImageCarousel(product);

  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    ${imageCarousel}
    <p class="product-card__price">$${product.FinalPrice}</p>
    ${discountMessage}
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML
    this.renderProductDetails("main");
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
    this.initCarousel();
    console.log(this.product);
    setProductBreadcrumb(this.product["Category"]);
  }
  addToCart() {
    let cartContents = getLocalStorage("so-cart") || [];
    const existingProduct = cartContents.find(item => item.Id === this.product.Id);

    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
      existingProduct.totalPrice = existingProduct.quantity * this.product.FinalPrice;
    } else {
      this.product.quantity = 1;
      this.product.totalPrice = this.product.FinalPrice;
      cartContents.push(this.product);
    }

    setLocalStorage("so-cart", cartContents);

    alertMessage(`${this.product.NameWithoutBrand} has been added to the cart!`, true);
    let cartSvg = document.querySelector(".cart svg");
    cartSvg.addEventListener("animationend", () => { cartSvg.classList.remove("cart-animation"); });
    cartSvg.classList.add("cart-animation");
  }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }

  initCarousel() {
    const images = document.querySelectorAll(".carousel__image");
    let currentIndex = 0;

    images.forEach((img, index) => {
      img.style.display = index === 0 ? "block" : "none";
    });

    document.querySelector(".next").addEventListener("click", () => {
      images[currentIndex].style.display = "none";
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].style.display = "block";
    });

    document.querySelector(".prev").addEventListener("click", () => {
      images[currentIndex].style.display = "none";
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      images[currentIndex].style.display = "block";
    });
  }
}