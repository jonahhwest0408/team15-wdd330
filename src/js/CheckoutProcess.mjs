import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs"; 

// convert form data to JSON object
function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export default class CheckoutProcess {
  constructor(key = "so-cart") {
    this.key = key;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  // calculate the item summary
  init() {
    this.list = getLocalStorage(this.key) || [];
    if (this.list.length > 0) {
      this.calculateItemSummary();
    } else {
      console.log("Cart is empty or failed to load.");
    }
  }

  // package items for submission
  packageItems(items) {
    return items.map(item => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.quantity
    }));
  }

  // total for items in the cart
  calculateItemSummary() {
    if (this.list.length === 0) {
      return;
    }
    this.itemTotal = this.list.reduce((sum, item) => sum + item.totalPrice, 0);
    document.getElementById("subtotal").innerText = this.itemTotal.toFixed(2);
  }

  // shipping, tax, and total
  calculateOrderTotal(zipCode) {
    if (this.list.length === 0) {
      console.log("Cart is empty");
      return;
    }
    const numItems = this.list.reduce((sum, item) => sum + item.quantity, 0);
    this.shipping = 10 + (numItems - 1) * 2;
    this.tax = parseFloat((this.itemTotal * 0.06).toFixed(2)); 
    this.orderTotal = parseFloat((this.itemTotal + this.shipping + this.tax).toFixed(2)); 
  
    document.getElementById("shipping").innerText = this.shipping.toFixed(2);
    document.getElementById("tax").innerText = this.tax.toFixed(2);
    document.getElementById("orderTotal").innerText = this.orderTotal.toFixed(2);
  }

  // checkout process
  async checkout(form) {
    this.calculateOrderTotal();  
  
    console.log("Current totals before checkout:", {
      orderTotal: this.orderTotal,
      shipping: this.shipping,
      tax: this.tax
    });
  
    // build order object
    const order = {
      orderDate: new Date().toISOString(),
      ...formDataToJSON(form), 
      items: this.packageItems(this.list), 
      orderTotal: parseFloat(this.orderTotal.toFixed(2)), 
      shipping: parseFloat(this.shipping.toFixed(2)), 
      tax: parseFloat(this.tax.toFixed(2)) 
    };
  
    console.log("Order data to submit:", order);
  
    // submit the order
    const services = new ExternalServices();
    try {
      const response = await services.checkout(order); 
      console.log("Order response:", response); 
    } catch (error) {
      console.error("Error processing order:", error); 
    }
  }
}