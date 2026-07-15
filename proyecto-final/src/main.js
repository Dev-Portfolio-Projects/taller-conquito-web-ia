import './styles/main.css';

import Navbar, { loadWeather } from './components/layout/Navbar/Navbar.js';
import Hero, { loadQuote } from './components/home/Hero.js';
import Footer from './components/layout/Footer/Footer.js';

import Catalog, {
  renderCatalog,
  initCatalogFilters,
} from './components/catalog/Catalog.js';

import Cart, { renderCart, initCart } from './components/cart/Cart.js';
import { createIcons, icons } from 'lucide';

const App = () => `
<div class="app-layout">

  ${Navbar()}
  <main id="main-content"></main>
  ${Cart()}
  ${Footer()}

</div>
`;

const renderPage = () => {
  const main = document.querySelector('#main-content');

  if (!main) return;

  switch (window.location.hash) {
    case '#catalogo':
      main.innerHTML = Catalog();
      renderCatalog();
      initCatalogFilters();
      break;

    case '#historia':
      main.innerHTML = `
        <section class="py-24 px-8">
          <h1 class="text-4xl font-semibold">
            Nuestra historia
          </h1>
        </section>
      `;
      break;

    case '#contacto':
      main.innerHTML = `
        <section class="py-24 px-8">
          <h1 class="text-4xl font-semibold">
            Contacto
          </h1>
        </section>
      `;
      break;

    default:
      main.innerHTML = Hero();
      loadQuote();
      break;
  }

  createIcons({ icons });
};

const render = () => {
  document.querySelector('#app').innerHTML = App();

  createIcons({ icons });
  loadWeather();
  renderPage();
  initCart();

  const menuButton = document.querySelector('#menu-button');
  const mobileMenu = document.querySelector('#mobile-menu');

  menuButton?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
  });
};

render();

window.addEventListener('hashchange', renderPage);
