import * as api from './api.js';
import * as fn from './function.js';

export const parseRequest = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split('/');
  return {
    resource: request[1],
    id: request[2],
    action: request[3],
  }
}

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