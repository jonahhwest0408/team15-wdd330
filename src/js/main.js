import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import ProductDetails from './ProductDetails.mjs';
import { getParam } from './utils.mjs';  

const productId = getParam('product');

if (productId) {
  const dataSource = new ProductData('tents');
  const product = new ProductDetails(productId, dataSource);
  product.init();
} else {
  const dataSource = new ProductData('tents');
  const element = document.querySelector('.product-list');
  const listing = new ProductList('Tents', dataSource, element);
  listing.init();
}