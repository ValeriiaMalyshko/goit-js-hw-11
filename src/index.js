// Для повідомлень використана бібліотека
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import NewsApiService from './js/fetchimages';

import galleryCards from './templates/galleryCards.hbs';

// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    searchForm: document.querySelector('.search-form'),
    imgContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
  };

  const newsApiService = new NewsApiService();
  
  refs.searchForm.addEventListener('submit', onSearch);
  refs.loadMoreBtn.addEventListener('click', onLoadMore);
  
  function onSearch(e) {
    e.preventDefault();
  
    newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();
    newsApiService.resetPage();
  
    if (newsApiService.query === '') {
      clearImgContainer();
      refs.loadMoreBtn.classList.add('is-hidden');
      return Notify.warning('Please, fill the main field');
    }
  
    newsApiService
    .fetchGalleryCards()

    .then(data => {
      clearImgContainer();
      refs.loadMoreBtn.classList.remove('is-hidden');

      if (!data.hits.length) {
        Notify.warning(
          `Sorry, there are no images matching your search query. Please try again.`,
        );
        refs.loadMoreBtn.classList.add('is-hidden');
        return;
      }

      appendImgMarkup(data);
      Notify.success(`Hooray! We found ${data.totalHits} images !!!`);
    });
}
function onLoadMore() {
  newsApiService.fetchGalleryCards().then(onScrollmake);
}

function appendImgMarkup(data) {
  refs.imgContainer.insertAdjacentHTML('beforeend', galleryCards(data.hits));
  onSliderMake();
}

function clearImgContainer() {
  refs.imgContainer.innerHTML = '';
}

function onScrollmake(data) {
  refs.imgContainer.insertAdjacentHTML('beforeend', galleryCards(data.hits));

  onSliderMake();
  const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});

if (data.hits.length < 40 && data.hits.length > 0) {
  refs.loadMoreBtn.classList.add('is-hidden');
  Notify.info("We're sorry, but you've reached the end of search results.");
}
}
   
  function onSliderMake() {
    const lightbox = new SimpleLightbox('.gallery a', {
      captions : true,
      captionsData : 'alt',
      captionDelay : 250,
    });
    lightbox.refresh();
  }