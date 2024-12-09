import SimpleLightbox from 'simplelightbox';

let lightbox;

/**
 * Очищает галерею или добавляет новые изображения.
 * @param {HTMLElement} galleryElement - элемент галереи.
 * @param {Array} images - список изображений для рендеринга.
 * @param {boolean} append - добавлять ли новые изображения.
 */
export const renderGallery = (galleryElement, images, append = false) => {
  const markup = images
    .map(
      (img) => `
      <li class="li">
        <a href="${img.largeImageURL}">
          <img src="${img.webformatURL}" alt="${img.tags}" />
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
