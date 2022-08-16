import { AJAX } from '../shared/helpers.js';
import { themoviedb } from '../shared/config.js';

import movie80 from '../../json/movie80.json';
import genres from '../../json/genres.json';

export let state = {
  movie80: [],
  movies: [],
  genres: [],
  pages: {},
};

// https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1
// https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
// https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1
// https://api.themoviedb.org/3/movie/upcoming?api_key=<<api_key>>&language=en-US&page=1
// https://api.themoviedb.org/3/discover/movie?api_key=###&with_genres=28
// https://api.themoviedb.org/3/keyword/9715/movies?api_key=19cceeb816328f42df0e6b332f489d75&language=vi&include_adult=false
export const loadMovies = async function (prefix, pg) {
  try {
    let data;
    if (prefix.includes('with_genres')) {
      data = await AJAX(`${themoviedb.API_URL}/discover/movie?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&${prefix}&${pg}`);
    } else {
      data = await AJAX(`${themoviedb.API_URL}/movie/${prefix}?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&${pg}`);
    };
    
    state.movies = data.results.map(movie => {
      return {
        adult: movie.adult,
        backdropPath: movie.backdrop_path,
        genreIds: movie.genre_ids, // arr
        id: movie.id,
        originalLanguage: movie.original_language,
        originalTitle: movie.original_title,
        overview: movie.overview,
        popularity: movie.popularity,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
        title: movie.title,
        video: movie.video,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
      }
    })

    const {page, total_pages, total_results} = data;
    
    state.pages = {
      page: page,
      totalPages: total_pages,
      totalResults: total_results,
    }
  } catch (error) {
    console.log(error)
    throw error;
  }
}

// load từ file json
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
    throw error;
  }
}

export const loadGenres = async function() {
  try {
    const data = genres;

    state.genres = data.map(rec => {
      return {
        id: rec.id,
        name: rec.name,
      }
    })
  } catch (error) {
    console.log(error)
    throw error;
  }
}