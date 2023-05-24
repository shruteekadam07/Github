let cart = [];

function addToCart(product, price) {
  const item = cart.find(item => item.product === product);

  if (item) {
    item.quantity++;
  } else {
    cart.push({ product, price, quantity: 1 });
  }

  updateCart();
}

function removeCartItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  let total = 0;

  cartItems.innerHTML = '';
  
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    const name = document.createElement('span');
    const quantity = document.createElement('span');
    const price = document.createElement('span');
    const removeBtn = document.createElement('button');

    name.innerText = item.product;
    quantity.innerText = ` x ${item.quantity}`;
    price.innerText = `$${item.price * item.quantity}`;
    removeBtn.innerText = 'Remove';
    removeBtn.onclick = () => removeCartItem(index);

    li.appendChild(name);
    li.appendChild(quantity);
    li.appendChild(price);
    li.appendChild(removeBtn);
    cartItems.appendChild(li);

    total += item.price * item.quantity;
  });

  cartTotal.innerText = `$${total}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.product button');

  buttons.forEach(button => {
    button.onclick = () => {
      const product = button.parentNode.querySelector('h2').innerText;
      const price = parseFloat(button.parentNode.querySelector('p').innerText.replace('$', ''));

      addToCart(product, price);
    };
  });
});
