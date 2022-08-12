import { AJAX } from '../helpers.js';

import movie80 from '../../json/movie80.json';
import movie2 from '../../json/movie2.json';
import movie6 from '../../json/movie6.json';

export let state = {
  movie80: [],
  movie2: [],
  movie6: [],
};

export const loadMovie80 = async function() {
  try {
    const data = movie80; // arr

    state.movie80 = data.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        backdropPath: rec.backdropPath,
        posterPath: rec.posterPath,
      };
    });

  } catch (error) {
    console.log(error)
    throw err;
  }
}

export const loadMovie2 = async function() {
  try {
    const data = movie2; // arr

    state.movie2 = data.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        backdropPath: rec.backdropPath,
        posterPath: rec.posterPath,
      };
    });

  } catch (error) {
    console.log(error)
    throw err;
  }
}

export const loadMovie6 = async function() {
  try {
    const data = movie6; // arr

    state.movie6 = data.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        backdropPath: rec.backdropPath,
        posterPath: rec.posterPath,
      };
    });

  } catch (error) {
    console.log(error)
    throw err;
  }
}