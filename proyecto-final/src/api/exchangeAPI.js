let ratesCache = null;
const EXCHANGE_URL = 'https://open.er-api.com/v6/latest/USD';

export const getExchangeRates = async () => {
  if (ratesCache) {
    return ratesCache;
  }

  const response = await fetch(EXCHANGE_URL);

  if (!response.ok) {
    throw new Error('Error obteniendo tasas');
  }

  const data = await response.json();
  ratesCache = data.rates;
  return ratesCache;
};

export const convertCurrency = async (amount, currency) => {
  const rates = await getExchangeRates();

  if (!rates[currency]) {
    return null;
  }

  return amount * rates[currency];
};
