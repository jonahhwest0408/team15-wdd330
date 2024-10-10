import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import SearchList from "./SearchList.mjs";

loadHeaderFooter();
const searchterm = getParam("search");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const listing = new SearchList(searchterm, dataSource, element);

listing.init();