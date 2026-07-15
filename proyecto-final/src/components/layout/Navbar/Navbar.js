import navbarTemplate from './Navbar.html?raw';
import { getWeather } from '../../../api/weatherAPI.js';
import { createIcons, icons } from 'lucide';

const getWeatherIcon = (code) => {
  if (code === 0) {
    return 'sun';
  }

  if ([1, 2, 3].includes(code)) {
    return 'cloud-sun';
  }

  if ([45, 48].includes(code)) {
    return 'cloud-fog';
  }

  if ([51, 53, 55, 61, 63, 65].includes(code)) {
    return 'cloud-rain';
  }

  if ([95].includes(code)) {
    return 'cloud-lightning';
  }

  return 'cloud';
};

const getWeatherDescription = (code) => {
  if (code === 0) {
    return 'Despejado';
  }

  if ([1, 2, 3].includes(code)) {
    return 'Parcialmente nublado';
  }

  if ([45, 48].includes(code)) {
    return 'Niebla';
  }

  if ([51, 53, 55].includes(code)) {
    return 'Llovizna';
  }

  if ([61, 63, 65].includes(code)) {
    return 'Lluvia';
  }

  if (code === 95) {
    return 'Tormenta';
  }

  return 'Clima desconocido';
};

const getActiveLink = (section) => {
  return window.location.hash === `#${section}` ? 'nav-active' : '';
};

const Navbar = () => {
  return navbarTemplate
    .replaceAll('{{catalogo}}', getActiveLink('catalogo'))
    .replaceAll('{{facturacion}}', getActiveLink('facturacion'))
    .replaceAll('{{contacto}}', getActiveLink('contacto'));
};

export const loadWeather = async () => {
  const loading = document.querySelector('#weather-loading');
  const content = document.querySelector('#weather-content');
  const temperatureContainer = document.querySelector('#weather-temperature');
  const descriptionContainer = document.querySelector('#weather-description');
  const windContainer = document.querySelector('#weather-wind');
  const weatherIcon = document.querySelector('#weather-icon');

  if (!temperatureContainer) return;

  const weather = await getWeather();

  if (weather.temperature !== null) {
    loading.classList.add('hidden');

    content.classList.remove('hidden');
    content.classList.add('flex');

    temperatureContainer.textContent = `${weather.temperature}°C`;

    descriptionContainer.textContent = getWeatherDescription(
      weather.weathercode,
    );

    windContainer.textContent = `${weather.windspeed} km/h`;

    weatherIcon.setAttribute(
      'data-lucide',
      getWeatherIcon(weather.weathercode),
    );

    createIcons({
      icons,
    });
  } else {
    loading.textContent = 'Clima no disponible';
  }
};

export default Navbar;
