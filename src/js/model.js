import { themoviedb } from './config.js';
import { AJAX } from './helpers.js';

export const state = {
  movies: {},
};

/* *__________ Start load không có page (detail, genres, countries) __________ */
export const loadTheMovieNoPage = async function (query) {
  try {
    const data = await AJAX(`${themoviedb.API_URL}/${query}?api_key=${themoviedb.KEY}&language=${themoviedb.LANGUAGE}`);
    console.log(data);

    // state.search.results = data.data.recipes.map(rec => {
    //   return {
    //     id: rec.id,
    //     title: rec.title,
    //     publisher: rec.publisher,
    //     image: rec.image_url,
    //     ...(rec.key && { key: rec.key }),
    //   };
    // });
    // state.search.page = 1;
  } catch (err) {
    console.error(`${err} ⚡⚡⚡`);
    throw err;
  }
};
/* __________ End load không có page (detail, genres, countries) __________ */
