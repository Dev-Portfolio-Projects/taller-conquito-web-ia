import heroTemplate from './Hero.html?raw';
import { getQuote } from '../../api/quoteAPI.js';

const Hero = () => heroTemplate;

export const loadQuote = async () => {
  const container = document.querySelector('#quote-container');

  if (!container) return;

  const { content, author } = await getQuote();

  container.innerHTML = `

    <p>
    "${content}"
    </p>

    <span
    class="block mt-2 text-[10px] not-italic"
    >
    — ${author}
    </span>

    `;
};

export default Hero;
