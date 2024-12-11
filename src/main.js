import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';

const searchForm = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
const loadMoreButton = document.getElementById('load-more');

let query = '';
let page = 1;

const showLoader = () => loader.classList.remove('hidden');
const hideLoader = () => loader.classList.add('hidden');
const showLoadMoreButton = () => loadMoreButton.classList.remove('hidden');
const hideLoadMoreButton = () => loadMoreButton.classList.add('hidden');

const handleSearch = async (event) => {
  event.preventDefault();
  query = searchForm.elements['search-input'].value.trim();
  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please enter a search query!' });
    return;
  }

  page = 1; // Reset page for new search
  gallery.innerHTML = '';
  hideLoadMoreButton();
  showLoader();

  try {
    const images = await fetchImages(query, page);
    if (images.length === 0) {
      iziToast.warning({
        title: 'No Results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      renderGallery(gallery, images);
      if (images.length === 15) showLoadMoreButton(); // Show Load More if more images are available
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Something went wrong. Please try again later!' });
  } finally {
    hideLoader();
  }
};

const handleLoadMore = async () => {
  page += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const images = await fetchImages(query, page);
    renderGallery(gallery, images, true); // Append images
    if (images.length === 15) showLoadMoreButton();
    else {
      iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    // Smooth scroll to new images
    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Something went wrong. Please try again later!' });
  } finally {
    hideLoader();
  }
};

searchForm.addEventListener('submit', handleSearch);
loadMoreButton.addEventListener('click', handleLoadMore);
