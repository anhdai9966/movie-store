import { AJAX } from '../shared/helpers.js';
import { themoviedb, youtubeSearch, googleSheetNews, youtubeClick } from '../shared/config.js';

export let state = {
  popular: [],
  searched: [],
  search: {
    query: '',
    results: [],
  },
};

// https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
export const loadPopular = async function() {
  try {
    const data = await AJAX(`${themoviedb.API_URL}/movie/popular?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&page=1`);
    
    state.popular = data.results.map(movie => {
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
  } catch (error) {
    console.log(error)
    throw error;
  }
}

// https://api.themoviedb.org/3/search/movie?api_key=19cceeb816328f42df0e6b332f489d75&language=en-US&query=coco&page=1&include_adult=false
export const loadSearch = async function(query) {
  try {
    state.search.query = query;

    const data = await AJAX(`${themoviedb.API_URL}/search/movie?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&page=1&include_adult=false&query=${query}`);
    
    state.search.results = data.results.map(movie => {
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
  } catch (error) {
    console.log(error)
    throw error;
  }
}

const persistSearched = function () {
  localStorage.setItem('searched', JSON.stringify(state.searched));
};

export const addSearched = function (word) {
  // Add bookmark
  state.searched.push(word);

  persistSearched();
};

export const deleteSearched = function (id) {
  // Delete search
  const index = state.searched.findIndex(el => el == id);
  state.bookmarks.splice(index, 1);

  persistSearched();
};

const init = function () {
  const storage = localStorage.getItem('searched');
  if (storage) state.searched = JSON.parse(storage);
};
init();

const clearSearch = function () {
  localStorage.clear('searched');
};
// clearSearch();