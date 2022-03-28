import './css/style.css';
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

  const lightbox = new SimpleLightbox('.gallery a', {
    captions : true,
    captionsData : 'alt',
    captionDelay : 250,
  });
  
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
    lightbox.refresh();

    // refs.loadMoreBtn.classList.remove('is-hidden');

    if (newsApiService.endOfHits) {
      refs.loadMoreBtn.classList.add('is-hidden');
    }
    else {
      refs.loadMoreBtn.classList.remove('is-hidden');
    }

      if (!data.hits.length) {
        Notify.warning(
          `Sorry, there are no images matching your search query. Please try again.`,
        );
        refs.loadMoreBtn.classList.add('is-hidden');
        return;
      }
      if (data.hits.length < 40 && data.hits.length > 0) {
        refs.loadMoreBtn.classList.add('is-hidden');
        // refs.loadMoreBtn.disabled = true;
      }

      appendImgMarkup(data);
      Notify.success(`Hooray! We found ${data.totalHits} images !!!`);

    });
    // .catch(function(error) {console.error();})
    // .finally (function() {
    // refs.loadMoreBtn.classList.add('is-hidden');
  //   refs.loadMoreBtn.disabled = true;
  // });
}
function onLoadMore() {
  newsApiService.fetchGalleryCards().then(onScrollmake);
}

function appendImgMarkup(data) {
  refs.imgContainer.insertAdjacentHTML('beforeend', galleryCards(data.hits));
  // onSliderMake();
  lightbox.refresh();
}

function clearImgContainer() {
  refs.imgContainer.innerHTML = '';
}

function onScrollmake(data) {
  refs.imgContainer.insertAdjacentHTML('beforeend', galleryCards(data.hits));
  // onSliderMake();
  lightbox.refresh();

  const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});

if (data.totalHits === 0) {
  refs.loadMoreBtn.classList.add('is-hidden');
  Notify.info("We're sorry, but you've reached the end of search results.");
}
}
   
  // function onSliderMake() {
  //   const lightbox = new SimpleLightbox('.gallery a', {
  //     captions : true,
  //     captionsData : 'alt',
  //     captionDelay : 250,
  //   });
  //   lightbox.refresh();
  // }