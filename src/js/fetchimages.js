// Для HTTP-запитів використана бібліотека
import axios from "axios";
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '26220765-cdaab7d653fcbdddd91e4a753';
const PER_PAGE = 40;

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchGalleryCards() {
    const axiosOptions = {
      method: 'get',
      url: BASE_URL,
      params: {
        key: KEY,
        q: `${this.searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: `${this.page}`,
        per_page: PER_PAGE,
      },
    };
    try {
      const response = await axios(axiosOptions);

      const data = response.data;
     
      this.incrementPage();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}