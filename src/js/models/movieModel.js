import { AJAX } from '../shared/helpers.js';
import { themoviedb, youtubeClick } from '../shared/config.js';

import movie80 from '../../json/movie80.json';
import genres from '../../json/genres.json';
import countries from '../../json/countries.json';

export let state = {
  movie80: [],
  movies: [],
  genres: [],
  pages: [],
  countries: [],
  year: [],
  trailer: [],
};

// https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1
// https://api.themoviedb.org/3/movie/popular?api_key=19cceeb816328f42df0e6b332f489d75&language=vi&page=1
// https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1
// https://api.themoviedb.org/3/movie/upcoming?api_key=<<api_key>>&language=en-US&page=1
// https://api.themoviedb.org/3/discover/movie?api_key=###&with_genres=28
// https://api.themoviedb.org/3/discover/movie?api_key=###&primary_release_year=2020
// https://api.themoviedb.org/3/discover/movie?api_key=###&sort_by=original_title.asc
// https://api.themoviedb.org/3/discover/movie?api_key=###&sort_by=original_title.desc
// https://api.themoviedb.org/3/discover/movie?api_key=19cceeb816328f42df0e6b332f489d75&language=vi&include_adult=false&region=JP
// https://api.themoviedb.org/3/keyword/9715/movies?api_key=19cceeb816328f42df0e6b332f489d75&language=vi&include_adult=false
// https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=19cceeb816328f42df0e6b332f489d75&language=en-US&page=1
// https://api.themoviedb.org/3/keyword/612/movies?api_key=19cceeb816328f42df0e6b332f489d75&language=vi&include_adult=false
export const loadMovies = async function (prefix, pg) {
  try {
    let data, sort = '';
    const discoverList = ['primary_release_year', 'with_genres', 'sort_by', 'region'];
    if (prefix.includes('JP')) sort = '&sort_by=original_title.desc' ;
    if (discoverList.some(pre => prefix.includes(pre))) {
      data = await AJAX(`${themoviedb.API_URL}/discover/movie?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&include_adult=false&${prefix}&${pg}${sort}`);
    } if (prefix.includes('keyword')) {
      data = await AJAX(`${themoviedb.API_URL}/${prefix}/movies?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&include_adult=false&${pg}`);
    } else {
      data = await AJAX(`${themoviedb.API_URL}/movie/${prefix}?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&include_adult=false&${pg}`);
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
        prefix: 'with_genres'
      }
    })
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export const loadCountries = async function() {
  try {
    const data = countries;

    state.countries = data.map(rec => {
      return {
        id: rec.iso_3166_1,
        englishName: rec.english_name,
        name: rec.native_name,
        prefix: 'region',
      }
    })
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export const loadYear = function () {
  let y = new Date().getFullYear();
  for (let i = 0; i < 30; i++) {
    let dt = {
      id: y,
      name: y,
      prefix: 'primary_release_year'
    }
    state.year.push(dt);
    y--;
  }
}

// load youtube 
export const loadTrailer = async function (title) {
  try {
    const data = await AJAX(`${youtubeClick.API_URL}${title}%20trailer%20Office`);
    
    const { id, snippet } = data.items[0];

    state.trailer = {
      videoId: id.videoId,
      description: snippet.description,
      thumbnails: snippet.thumbnails.high.url,
      title: snippet.title,
    } 
  } catch (error) {
    console.log(error)
    throw error;
  }
}