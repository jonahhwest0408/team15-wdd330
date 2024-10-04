import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  let discounted = "none";
  let discount = 0;
  if (product.SuggestedRetailPrice > product.FinalPrice) {
    discount = (product.SuggestedRetailPrice - product.FinalPrice).toFixed(2);
    discounted = "block";
  }

  return `<li class="product-card">
  <a href="/product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Images.PrimaryMedium}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">$${product.FinalPrice}</p></a>
  <p class="product-card__discount" style="display: ${discounted}; color: red;">Save $${discount}</p>
</li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.currentSortOption = 'name'; 
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.addSortListener(); 
    this.renderList(list);
    document.querySelector(".title").innerHTML = this.category;
  }

  addSortListener() {
    const sortDropdown = document.getElementById('sort-options');
    sortDropdown.addEventListener('change', (event) => {
      this.currentSortOption = event.target.value;
      this.sortAndRenderList();
    });
  }

  sortList(list) {
    if (this.currentSortOption === 'name') {
      return list.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (this.currentSortOption === 'price') {
      return list.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }
    return list;
  }

  async sortAndRenderList() {
    const list = await this.dataSource.getData(this.category);
    const sortedList = this.sortList(list);
    this.renderList(sortedList);
  }

  renderList(list) {
    this.listElement.innerHTML = ''; // Clear current list
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
  // renderList(list) {
  //   const htmlStrings = list.map(productCardTemplate);
  //   this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
  // }
}

