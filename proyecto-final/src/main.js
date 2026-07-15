import './styles/main.css';

import Navbar from './components/layout/Navbar/Navbar.js';
import Hero from './components/home/Hero.js';
import Footer from './components/layout/Footer/Footer.js';
import { loadWeather } from './components/layout/Navbar/Navbar.js';
import { createIcons, icons } from 'lucide';

const App = () => `
<div class="app-layout">
    ${Navbar()}
    <main>
        ${Hero()}
    </main>
    ${Footer()}
</div>
`;

const render = () => {
  document.querySelector('#app').innerHTML = App();

  createIcons({ icons });
  loadWeather();
  const menuButton = document.querySelector('#menu-button');
  const mobileMenu = document.querySelector('#mobile-menu');

  menuButton?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
  });
};

render();

window.addEventListener('hashchange', () => {
  render();
});
