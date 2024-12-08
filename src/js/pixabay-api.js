import axios from 'axios';

const API_KEY = '47432797-7b7ae49ed8d9ca3634e43854b';
const BASE_URL = 'https://pixabay.com/api/';

let currentPage = 1;

/**
 * Запрашивает изображения по ключевому слову с учетом пагинации.
 * @param {string} query - поисковый запрос.
 * @returns {Promise<{ hits: Array, totalHits: number }>} - Данные от API.
 */
export const fetchImages = async (query, page = 1) => {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch images');
  }
};
