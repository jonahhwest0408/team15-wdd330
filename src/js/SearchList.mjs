import { renderListWithTemplate, productCardTemplate } from "./utils.mjs";


export default class SearchList {
  constructor(searchTerm, dataSource, listElement) {
    this.searchTerm = searchTerm;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.currentSortOption = 'name'; 
  }

  async init() {
    const allList = await this.getAllProducts();
    this.list = allList.filter((product) => product.Name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    this.addSortListener(); //sort filter
    this.renderList(this.list);
    document.querySelector(".title").innerHTML = this.searchTerm;
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
    const sortedList = this.sortList(this.list);
    this.renderList(sortedList);
  }

  renderList(list) {
    this.listElement.innerHTML = ''; // Clear current list
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }

  async getAllProducts() {
    const tentList = await this.dataSource.getData("tents");
    const backpackList = await this.dataSource.getData("backpacks");
    const sleepingBagList = await  this.dataSource.getData("sleeping-bags");
    const hammockList = await this.dataSource.getData("hammocks");
    const returnList = tentList.concat(backpackList, sleepingBagList, hammockList);
    return returnList;
  }
}

