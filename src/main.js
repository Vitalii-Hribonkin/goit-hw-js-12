import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';

const searchForm = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
const loadMoreBtn = document.getElementById('load-more');

let currentPage = 1;
let currentQuery = '';

const showLoader = () => loader.classList.remove('hidden');
const hideLoader = () => loader.classList.add('hidden');
const showLoadMoreBtn = () => loadMoreBtn.classList.remove('hidden');
const hideLoadMoreBtn = () => loadMoreBtn.classList.add('hidden');

const smoothScroll = () => {
  const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

const handleSearch = async (event) => {
  event.preventDefault();
  currentQuery = searchForm.elements['search-input'].value.trim();

  if (!currentQuery) {
    iziToast.error({ title: 'Error', message: 'Please enter a search query!' });
    return;
  }

  currentPage = 1;
  gallery.innerHTML = '';
  hideLoadMoreBtn();
  showLoader();

  try {
    const { hits, totalHits } = await fetchImages(currentQuery, currentPage);
    if (hits.length === 0) {
      iziToast.warning({
        title: 'No Results',
        message: 'No images match your query. Try again!',
      });
    } else {
      renderGallery(gallery, hits);
      iziToast.success({
        title: 'Success',
        message: `Found ${totalHits} images!`,
      });
      if (hits.length < totalHits) showLoadMoreBtn();
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Something went wrong!' });
  } finally {
    hideLoader();
  }
};

const handleLoadMore = async () => {
  currentPage += 1;
  showLoader();
  hideLoadMoreBtn();

  try {
    const { hits, totalHits } = await fetchImages(currentQuery, currentPage);
    renderGallery(gallery, hits);
    smoothScroll(); // Добавлено плавное скроллирование после рендеринга
    if (currentPage * 15 >= totalHits) {
      iziToast.info({
        title: 'End of Results',
        message: "You've reached the end of search results.",
      });
    } else {
      showLoadMoreBtn();
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Failed to load more images!' });
  } finally {
    hideLoader();
  }
};

searchForm.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);
