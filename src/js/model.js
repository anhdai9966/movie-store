import { MOVIE_80_JSON } from './config.js';
import { AJAX } from './helpers.js';

export const state = {
  movies: {},
};

export const loadMovie80 = async function () {
  try {
    const data = await AJAX(MOVIE_80_JSON);
    console.log('🚀 ~ loadMovie80 ~ data', data)
  } catch (err) {
    console.error(`${err} ⚡⚡⚡`);
    throw err;
  }
};
loadMovie80()