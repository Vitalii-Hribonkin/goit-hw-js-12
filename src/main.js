import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';

const searchForm = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
const loadMoreButton = document.getElementById('load-more');

let page = 1; // Текущая страница
let query = ''; // Последний поисковый запрос
let totalHits = 0; // Общее количество изображений

const showLoader = () => loader.classList.remove('hidden');
const hideLoader = () => loader.classList.add('hidden');
const showLoadMoreButton = () => loadMoreButton.classList.remove('hidden');
const hideLoadMoreButton = () => loadMoreButton.classList.add('hidden');

const scrollPage = () => {
  const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

const handleSearch = async (event) => {
  event.preventDefault();
  query = searchForm.elements['search-input'].value.trim();
  page = 1;

  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please enter a search query!' });
    return;
  }

  gallery.innerHTML = '';
  hideLoadMoreButton();
  showLoader();

  try {
    const { images, total } = await fetchImages(query, page);
    totalHits = total;

    if (images.length === 0) {
      iziToast.warning({
        title: 'No Results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      renderGallery(gallery, images);
      if (images.length < totalHits) showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Something went wrong. Please try again later!' });
  } finally {
    hideLoader();
  }
};

const handleLoadMore = async () => {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const { images } = await fetchImages(query, page);

    if (images.length === 0) {
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
      hideLoadMoreButton();
      return;
    }

    renderGallery(gallery, images, true); // Добавляем новые изображения
    if (page * 15 >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    } else {
      showLoadMoreButton();
    }

    scrollPage();
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Failed to load more images!' });
  } finally {
    hideLoader();
  }
};

searchForm.addEventListener('submit', handleSearch);
loadMoreButton.addEventListener('click', handleLoadMore);
