import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import SearchList from "./SearchList.mjs";

loadHeaderFooter();
const searchterm = getParam("search");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new SearchList(searchterm, dataSource, element);

listing.init();