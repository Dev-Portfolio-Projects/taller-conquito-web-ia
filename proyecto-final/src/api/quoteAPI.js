import { translateText } from './translateAPI.js';

const QUOTE_URL = 'https://dummyjson.com/quotes/random';

export const getQuote = async () => {
  try {
    const response = await fetch(QUOTE_URL);

    if (!response.ok) {
      throw new Error('No se pudo obtener la frase');
    }

    const data = await response.json();
    const { quote: originalQuote, author } = data;
    const content = await translateText(originalQuote);

    return {
      content,
      author,
    };
  } catch (error) {
    console.error('Quote API Error:', error);

    return {
      content: 'Cada taza cuenta una historia.',
      author: 'Quito Coffee Roasters',
    };
  }
};
