export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {


  const htmlStrings = list.map(templateFn);

  if (clear) {
    parentElement.innerHTML = "";
  }

  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));


}

export function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  position = "afterbegin",
  clear = false,
  callback = null
) {

  const htmlString = templateFn(data);

  if (clear) {
    parentElement.innerHTML = "";
  }

  parentElement.insertAdjacentHTML(position, htmlString);

  if (callback) {
    callback(data);
  }

}

export function productCardTemplate(product) {
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

export async function loadHeaderFooter() {
  const header = await loadTemplate("header");
  const footer = await loadTemplate("footer");
  const headerElement = qs("#main-header");
  const footerElement = qs("#main-footer");
  renderWithTemplate((data) => data, headerElement, header);
  renderWithTemplate((data) => data, footerElement, footer);
}

async function loadTemplate(name) {
  const path = `../partials/${name}.html`;

  const html = await fetch(path).then(convertToText);
  return html;
}

export function setClick(selector, callback) {
  const element = qs(selector);
  if (element) {
    element.addEventListener("touchend", (event) => {
      event.preventDefault();
      callback();
    });
    element.addEventListener("click", callback);
  } else {
    console.error(`Element with selector ${selector} not found!`);
  }
}

export function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function convertToText(res) {
  if (res.ok) {
    return res.text();
  } else {
    throw new Error("Bad Response");
  }
}