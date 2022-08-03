import * as api from './api.js';
import * as fn from './function.js';



export const movieRequest = async (url, params = {}) => {
  if (!url) return 'Error Url';

  let baseUrl = `${api.themoviedb.apiEndpoint}/${url}?api_key=${api.themoviedb.apiKey}&language=${api.themoviedb.language}`;

  if (!fn.isEmpty(params)) {
    for (const key in params) {
      baseUrl += `&${key}=${params[key]}`;
    }
  }

  let response = await fetch(baseUrl);
  let data = await response.json();

  return data;
};