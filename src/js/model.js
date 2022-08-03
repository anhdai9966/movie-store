import * as config from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  movies: {},
};

export const loadPicH = async () => {
  try {
    const data = await getJSON(config.mockapi.API_URL);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
