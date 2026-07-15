const WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=-0.1807&longitude=-78.4678&current_weather=true';

export const getWeather = async () => {
  try {
    const response = await fetch(WEATHER_URL);

    if (!response.ok) {
      throw new Error('No se pudo obtener el clima');
    }

    const data = await response.json();
    const { temperature, weathercode, windspeed, winddirection, time } =
      data.current_weather;

    return {
      temperature,
      weathercode,
      windspeed,
      winddirection,
      time,
    };
  } catch (error) {
    console.error('Weather API Error:', error);

    return {
      temperature: null,
      weathercode: null,
      windspeed: null,
      winddirection: null,
      time: null,
    };
  }
};
