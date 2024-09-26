import { getLocalStorage, setLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];

  if (cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');

    const totalPrice = cartItems.reduce((total, item) => total + (item.FinalPrice * item.quantity), 0);

    const cartFooter = document.querySelector('.cart-footer');
    cartFooter.classList.remove('hide');  
    document.getElementById('cartTotal').textContent = totalPrice.toFixed(2);

    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
      button.addEventListener('click', removeItemFromCart);
    });
  } else {
    document.querySelector('.product-list').innerHTML = '<p>Your cart is empty</p>';

    document.querySelector('.cart-footer').classList.add('hide');
  }
}

function cartItemTemplate(item) {
  const totalPrice = item.FinalPrice * item.quantity;
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.quantity}</p>
    <p class="cart-card__price">$${totalPrice.toFixed(2)}</p>
    <button class="remove-item" data-id="${item.Id}">X</button>
  </li>`;
}

function removeItemFromCart(event) {
  const productId = event.target.getAttribute('data-id');
  let cart = getLocalStorage('so-cart') || [];
  cart = cart.filter(item => item.Id !== productId);

  setLocalStorage('so-cart', cart);

  renderCartContents();
}

renderCartContents();