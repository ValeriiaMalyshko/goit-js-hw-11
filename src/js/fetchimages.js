const URL = 'https://pixabay.com/api/';
const KEY = '26220765-cdaab7d653fcbdddd91e4a753';
const PER_PAGE = 40;
const params = {
    key: KEY,
    q: request,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: PER_PAGE,
  };

const axios = require('axios').default;

const fetchImagesNew = async (request, page = 1) => {
    
    const response = await axios.get(URL, { params });
    return response.data;
  };

  export { fetchImagesNew, PER_PAGE };