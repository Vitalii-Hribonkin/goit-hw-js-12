import axios from 'axios';

const API_KEY = '47432797-7b7ae49ed8d9ca3634e43854b';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page = 1) => {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 15,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${params}`);
    return response.data.hits;
  } catch (error) {
    throw new Error('Failed to fetch images');
  }
};
