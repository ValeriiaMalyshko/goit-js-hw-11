import "./css/common.css";

// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
// Для HTTP-запитів використана бібліотека
import axios from "axios";
// Для повідомлень використана бібліотека
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchImagesNew, PER_PAGE } from './js/fetchimages';

const refs = {
    searchForm: document.querySelector('.js-search-form'),
    articlesContainer: document.querySelector('.gallery'),
    loadMoreBtn:document.querySelector('[data-action="load-more"]'),
  };

  
refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
 
function onSearch(e) {
    e.preventDefault();
  
    newsApiService.query = e.currentTarget.elements.query.value;
  
    // if (newsApiService.query === '') {
    //   return alert('Введи что-то нормальное');
    // }
  
    // loadMoreBtn.show();
    // newsApiService.resetPage();
    // clearArticlesContainer();
    // fetchArticles();
  }
  function onLoadMore () {

  }
//   function fetchArticles() {
//     loadMoreBtn.disable();
//     newsApiService.fetchArticles().then(articles => {
//       appendArticlesMarkup(articles);
//       loadMoreBtn.enable();
//     });
//   }
  
//   function appendArticlesMarkup(articles) {
//     refs.articlesContainer.insertAdjacentHTML('beforeend', createImgCard(galleryItems));
//   }
  
//   function clearArticlesContainer() {
//     refs.gallery.innerHTML = '';
//   }

//   function createImgCard(data, node) {
//     const markup = data
//       .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
//         return `
//       <div class="photo-card">
//       <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//       <div class="info">
//       <p class="info-item">
//       <b>${likes}</b>
//       </p>
//       <p class="info-item">
//       <b>${views}</b>
//       </p>
//       <p class="info-item">
//       <b>${comments}</b>
//       </p>
//       <p class="info-item">
//       <b>${downloads}</b>
//       </p>
//       </div>
//       </div>`;
//       })
//       .join("");
//   }
  
//   node.insertAdjacentHTML('beforeend', markup);
// };