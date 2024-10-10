import { renderListWithTemplate, productCardTemplate } from "./utils.mjs";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.currentSortOption = "name";
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.addSortListener(); //sort filter
    this.renderList(list);
    document.querySelector(".title").innerHTML = this.category;
  }

  addSortListener() {
    const sortDropdown = document.getElementById("sort-options");
    sortDropdown.addEventListener("change", (event) => {
      this.currentSortOption = event.target.value;
      this.sortAndRenderList();
    });
  }

  sortList(list) {
    if (this.currentSortOption === "name") {
      return list.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (this.currentSortOption === "price") {
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
    this.listElement.innerHTML = ""; // Clear current list
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
  // renderList(list) {
  //   const htmlStrings = list.map(productCardTemplate);
  //   this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
  // }
}

