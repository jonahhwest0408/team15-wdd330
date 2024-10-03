import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
  <a href="product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Image}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">$${product.FinalPrice}</p></a>
</li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.currentSortOption = 'name'; // Default sort option
  }

  async init() {
    const list = await this.dataSource.getData();
    this.addSortListener();
    this.renderList(list);
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
    return list; // Default, return unsorted
  }

  async sortAndRenderList() {
    const list = await this.dataSource.getData();
    const sortedList = this.sortList(list);
    this.renderList(sortedList);
  }

  renderList(list) {
    this.listElement.innerHTML = ''; // Clear current list
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
