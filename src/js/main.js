import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import ProductDetails from "./ProductDetails.mjs";
import Alert from "./Alert.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";


const productId = getParam("product");

if (productId) {
  const dataSource = new ProductData("tents");
  const product = new ProductDetails(productId, dataSource);
  product.init();
} else {
  const dataSource = new ProductData("tents");
  const element = document.querySelector(".product-list");
  const listing = new ProductListing("Tents", dataSource, element);
  listing.init();
  const Alerts = new Alert();
}

loadHeaderFooter();