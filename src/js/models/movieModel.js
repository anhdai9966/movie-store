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
  bookmarks: [],
  bookmarkLocal: [],
  query: '',
  searched: [],
  xu: 0,
  purchased: [],
  purchasedLocal: [],
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
    let data,
      sort = '';
    const discoverList = ['primary_release_year', 'with_genres', 'sort_by', 'region'];
    if (prefix.includes('JP')) sort = '&sort_by=original_title.desc';
    if (discoverList.some(pre => prefix.includes(pre))) {
      data = await AJAX(
        `${themoviedb.API_URL}/discover/movie?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&include_adult=false&${prefix}&${pg}${sort}`,
      );
    } else if (prefix.includes('keyword')) {
      data = await AJAX(
        `${themoviedb.API_URL}/${prefix}/movies?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&include_adult=false&${pg}`,
      );
    } else {
      data = await AJAX(
        `${themoviedb.API_URL}/movie/${prefix}?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&include_adult=false&${pg}`,
      );
    }

    state.movies = data.results.map(movie => {
      let bm = false;
      if (state.bookmarkLocal.some(bookmark => bookmark.id == movie.id)) bm = true;
      let pur = false;
      if (state.purchasedLocal.some(pur => pur.id == movie.id)) pur = true; 
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
        bookmarked: bm,
        price: {
          buy: 210000,
          rent: 80000,
        },
        purchased: pur,
      };
    });
    const { page, total_pages, total_results } = data;

    state.pages = {
      page: page,
      totalPages: total_pages,
      totalResults: total_results,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// load từ file json
export const loadMovie80 = async function () {
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
    console.log(error);
    throw error;
  }
};

export const loadGenres = async function () {
  try {
    const data = genres;

    state.genres = data.map(rec => {
      return {
        id: rec.id,
        name: rec.name,
        prefix: 'with_genres',
      };
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loadCountries = async function () {
  try {
    const data = countries;

    state.countries = data.map(rec => {
      return {
        id: rec.iso_3166_1,
        englishName: rec.english_name,
        name: rec.native_name,
        prefix: 'region',
      };
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loadYear = function () {
  let y = new Date().getFullYear();
  let arr = [];
  for (let i = 0; i < 30; i++) {
    let dt = {
      id: y,
      name: y,
      prefix: 'primary_release_year',
    };
    arr.push(dt);
    y--;
  }
  state.year = arr;
};

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
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarkLocal));
};

export const addBookmark = function (id) {
  // tìm id và render dữ liệu với id là true
  const data = state.movies.map(movie => {
    if (movie.id.toString() == id) {
      if (!movie.bookmarked) {
        movie.bookmarked = true;
        state.bookmarkLocal.push(movie);
      } else {
        movie.bookmarked = false;
        const index = state.bookmarkLocal.findIndex(el => el.id == id);
        state.bookmarkLocal.splice(index, 1);
      }
    }
    return movie;
  });
  // Add bookmark để render
  state.bookmarks = data;

  // lưu vào local
  persistBookmarks();
};

export const clearBookmarks = function () {
  localStorage.removeItem('bookmarks');
  state.bookmarkLocal = [];
};

export const removeBookmark = function (id) {
  // tìm id và render dữ liệu với id là true
  const index = state.bookmarkLocal.findIndex(el => el.id == id);
  state.bookmarkLocal.splice(index, 1);

  const data = state.movies.map(movie => {
    if (movie.id.toString() == id) {
        movie.bookmarked = false;
    }
    return movie;
  });
  // Add bookmark để render
  state.bookmarks = data;

  // lưu vào local
  persistBookmarks();
};

export const addPurchased = function (pur) {
  // tìm id và render dữ liệu với id là true
  const data = state.movies.map(movie => {
    if (pur.some(pu => pu.id == movie.id)) {
      movie.purchased = true;
      state.purchasedLocal.push(movie);
    }
    return movie;
  });
  // Add bookmark để render
  state.purchased = data;
  
  // lưu vào local
  persistPurchased();
}

export const persistPurchased = function () {
  localStorage.setItem('purchased', JSON.stringify(state.purchasedLocal));
}

export const addSearched = function (title) {
  state.bookmarkLocal.push(title);

  persistSeached();
}

export const deleteSearched = function (title) {
  const index = state.searched.findIndex(el => el == title);
  state.searched.splice(index, 1);

  persistSeached();
}

export const persistSeached = function () {
  localStorage.setItem('searched', JSON.stringify(state.searched));
}

export const setXu = function (xu) {
  state.xu = xu;

  persistXu()
}

export const persistXu = function () {
  localStorage.setItem('xu', JSON.stringify(state.xu));
}



const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarkLocal = JSON.parse(storage);
  
  const storageSearched = localStorage.getItem('searched');
  if (storageSearched) state.searched = JSON.parse(storageSearched);

  const storageXu = localStorage.getItem('xu');
  if (storageXu) state.xu = JSON.parse(storageXu);

  const storagePurchased = localStorage.getItem('purchased');
  if (storagePurchased) state.purchasedLocal = JSON.parse(storagePurchased);
};
init();

export const loadSearch = async function (query) {
  try {
    state.query = query;

    const data = await AJAX(
      `${themoviedb.API_URL}/search/movie?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&page=1&include_adult=false&query=${query}`,
    );

    state.movies = data.results.map(movie => {
      let bm = false;
      if (state.bookmarkLocal.some(bookmark => bookmark.id == movie.id)) bm = true;
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
        bookmarked: bm,
      };
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
