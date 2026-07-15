const TRANSLATE_URL = 'https://api.mymemory.translated.net/get';

export const translateText = async (text) => {
  try {
    const response = await fetch(
      `${TRANSLATE_URL}?q=${encodeURIComponent(text)}&langpair=en|es`,
    );

    if (!response.ok) {
      throw new Error('No se pudo traducir');
    }

    const data = await response.json();

    return data.responseData.translatedText;
  } catch (error) {
    console.error('Translate API Error:', error);

    return text;
  }
};
