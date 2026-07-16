import cartTemplate from './Cart.html?raw';

import {
  getCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  calculateSubtotal,
  calculateIVA,
  calculateTotal,
} from '../../state/store.js';

import { convertCurrency } from '../../api/exchangeAPI.js';
import { createIcons, icons } from 'lucide';

const Cart = () => cartTemplate;

export const openCart = () => {
  const drawer = document.querySelector('#cart-drawer');
  const overlay = document.querySelector('#cart-overlay');

  if (!drawer || !overlay) return;

  drawer.classList.remove('translate-x-full');
  overlay.classList.remove('hidden');
};

export const closeCart = () => {
  const drawer = document.querySelector('#cart-drawer');
  const overlay = document.querySelector('#cart-overlay');

  if (!drawer || !overlay) return;

  drawer.classList.add('translate-x-full');
  overlay.classList.add('hidden');
};

export const renderCart = async () => {
  const itemsContainer = document.querySelector('#cart-items');

  if (!itemsContainer) return;

  const cart = getCart();
  const zone = document.querySelector('#delivery-zone');

  if (zone) {
    zone.disabled = cart.length === 0;
  }

  if (cart.length === 0) {
    if (zone) {
      zone.value = '0';
    }
    itemsContainer.innerHTML = `

    <div
    class="
    flex
    flex-col
    items-center
    justify-center
    py-5
    text-center
    "
    >

      <i
      data-lucide="shopping-cart"
      class="
      w-10
      h-10
      text-black/20
      "
      ></i>

      <p
      class="
      mt-3
      text-sm
      text-black/40
      "
      >
      Tu carrito está vacío
      </p>

      <p
      class="
      text-xs
      text-black/30
      mt-1
      "
      >
      Agrega cafés desde nuestro catálogo
      </p>

    </div>

    `;

    createIcons({
      icons,
    });

    updateTotals();
    updateCheckoutButton();

    return;
  }

  itemsContainer.innerHTML = cart
    .map(
      (product) => `

  <article
  class="
  border
  border-black/5
  rounded-2xl
  p-4
  flex
  justify-between
  items-center
  "
  >

    <div>

      <h3
      class="
      text-sm
      font-medium
      "
      >
      ${product.name}
      </h3>

      <div
      class="
      flex
      items-center
      gap-2
      mt-3
      "
      >

        <button
        class="
        decrease-item
        w-7
        h-7
        rounded-full
        border
        border-black/10
        "
        data-id="${product.id}"
        >
        -
        </button>

        <span>
        ${product.quantity}
        </span>

        <button
        class="
        increase-item
        w-7
        h-7
        rounded-full
        bg-[#8A9A5B]
        text-white
        "
        data-id="${product.id}"
        >
        +
        </button>

      </div>

      <p
      class="
      text-xs
      text-black/50
      mt-2
      "
      >
      $${product.price.toFixed(2)} c/u
      </p>

      <p
      class="
      font-semibold
      text-sm
      mt-1
      "
      >
      $${(product.price * product.quantity).toFixed(2)}
      </p>

    </div>

    <button
class="
remove-item
w-8
h-8
rounded-full
text-red-500
hover:bg-red-50
flex
items-center
justify-center
transition
"
data-id="${product.id}"
>
  <i
    data-lucide="trash-2"
    class="w-4 h-4"
  ></i>
</button>

  </article>

  `,
    )
    .join('');

  createIcons({
    icons,
  });

  document.querySelectorAll('.remove-item').forEach((button) => {
    button.addEventListener('click', () => {
      removeFromCart(Number(button.dataset.id));
      renderCart();
    });
  });

  document.querySelectorAll('.increase-item').forEach((button) => {
    button.addEventListener('click', () => {
      increaseQuantity(Number(button.dataset.id));
      renderCart();
    });
  });

  document.querySelectorAll('.decrease-item').forEach((button) => {
    button.addEventListener('click', () => {
      decreaseQuantity(Number(button.dataset.id));
      renderCart();
    });
  });

  updateTotals();
  updateCheckoutButton();
};

const updateTotals = async () => {
  const cart = getCart();
  const subtotal = calculateSubtotal();
  const iva = calculateIVA();
  const shipping = Number(document.querySelector('#delivery-zone')?.value || 0);
  const total = calculateTotal(shipping);

  const subtotalElement = document.querySelector('#subtotal');
  const ivaElement = document.querySelector('#iva');
  const shippingElement = document.querySelector('#shipping');
  const totalElement = document.querySelector('#total');
  const eurElement = document.querySelector('#eur-total');
  const gbpElement = document.querySelector('#gbp-total');
  const jpyElement = document.querySelector('#jpy-total');
  const copElement = document.querySelector('#cop-total');
  const mxnElement = document.querySelector('#mxn-total');

  if (!subtotalElement || !shippingElement || !totalElement) {
    return;
  }

  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  ivaElement.textContent = `$${iva.toFixed(2)}`;
  shippingElement.textContent = `$${shipping.toFixed(2)}`;
  totalElement.textContent = `$${total.toFixed(2)}`;

  const [eur, gbp, jpy, cop, mxn] = await Promise.all([
    convertCurrency(total, 'EUR'),
    convertCurrency(total, 'GBP'),
    convertCurrency(total, 'JPY'),
    convertCurrency(total, 'COP'),
    convertCurrency(total, 'MXN'),
  ]);

  if (eurElement) {
    eurElement.textContent = eur ? `€${eur.toFixed(2)}` : '-';
  }

  if (gbpElement) {
    gbpElement.textContent = gbp ? `£${gbp.toFixed(2)}` : '-';
  }

  if (jpyElement) {
    jpyElement.textContent = jpy ? `¥${jpy.toFixed(0)}` : '-';
  }

  if (copElement) {
    copElement.textContent = cop ? `$${cop.toFixed(0)}` : '-';
  }

  if (mxnElement) {
    mxnElement.textContent = mxn ? `$${mxn.toFixed(2)}` : '-';
  }
};

const updateCheckoutButton = () => {
  const button = document.querySelector('#checkout-button');
  const zone = document.querySelector('#delivery-zone');

  if (!button || !zone) return;

  const cart = getCart();
  const canCheckout = cart.length > 0 && zone.value !== '0';

  if (canCheckout) {
    button.classList.remove(
      'opacity-50',
      'cursor-not-allowed',
      'pointer-events-none',
    );

    button.classList.add('hover:bg-[#718044]');
  } else {
    button.classList.add(
      'opacity-50',
      'cursor-not-allowed',
      'pointer-events-none',
    );

    button.classList.remove('hover:bg-[#718044]');
  }
};

export const initCart = () => {
  const zone = document.querySelector('#delivery-zone');

  zone?.addEventListener('change', () => {
    updateTotals();
    updateCheckoutButton();
  });

  const closeButton = document.querySelector('#close-cart');
  const overlay = document.querySelector('#cart-overlay');
  closeButton?.addEventListener('click', closeCart);
  overlay?.addEventListener('click', closeCart);
};

export default Cart;
