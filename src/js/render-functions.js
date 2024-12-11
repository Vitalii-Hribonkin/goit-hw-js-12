import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export const createGalleryMarkup = (images) => {
  return images
    .map(
      (img) => `
    <li class="li">
      <a href="${img.largeImageURL}">
        <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
      </a>
      <div class="div">
        <p class="p">Likes: ${img.likes}</p>
        <p class="p">Views: ${img.views}</p>
        <p class="p">Comments: ${img.comments}</p>
        <p class="p">Downloads: ${img.downloads}</p>
      </div>
    </li>
  `
    )
    .join('');
};

export const renderGallery = (galleryElement, images, append = false) => {
  const markup = createGalleryMarkup(images);
  if (append) {
    galleryElement.insertAdjacentHTML('beforeend', markup);
  } else {
    galleryElement.innerHTML = markup;
  }

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  } else {
    lightbox.refresh();
  }
};
