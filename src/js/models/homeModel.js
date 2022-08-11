import { AJAX } from '../helpers.js';

import movie80 from '../../json/movie80.json';

export let state = {
  movie80: [],
};

export const loadMovie80 = async function() {
  try {
    state.movie80 = movie80;
  } catch (error) {
    console.log(error)
    throw err;
  }
}