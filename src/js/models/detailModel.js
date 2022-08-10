import { themoviedb } from '../config.js';
import { AJAX } from '../helpers.js';

export const state = {
  detail: {},
  similar: {},
  recommendations: {},
};

// tải chỉ tiết phim
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
export const loadDetails = async function (movieId) {
  try {
    const data = await AJAX(`${themoviedb.API_URL}/movie/${movieId}?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}`);

    // vì data chung quá nên gọi nó là detail
    const detail = data;
    state.detail = {
      adult: detail.adult,
      backdropPath: detail.backdrop_path,
      belongsToCollection: detail.belongs_to_collection, // obj
      budget: detail.budget,
      genres: detail.genres, // arr
      homepage: detail.homepage,
      id: detail.id,
      imdbId: detail.imdb_id,
      originalLanguage: detail.original_language,
      originalTitle: detail.original_title,
      overview: detail.overview,
      popularity: detail.popularity,
      posterPath: detail.poster_path,
      productionCompanies: detail.production_companies, // arr
      productionCountries: detail.production_countries, // arr
      releaseDate: detail.release_date,
      revenue: detail.revenue,
      runtime: detail.runtime,
      spokenLanguages: detail.spoken_languages, // arr
      status: detail.status,
      tagline: detail.tagline,
      title: detail.title,
      video: detail.video,
      voteAverage: detail.vote_average,
      voteCount: detail.vote_count,
    };
  } catch (error) {
    console.log(error,'⚡⚡⚡⚡');
    throw error;
  }
};

// tải các phim tương tự
// https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=<<api_key>>&language=en-US&page=1
// https://api.themoviedb.org/3/movie/675353/similar?api_key=19cceeb816328f42df0e6b332f489d75&language=vi&page=1
export const loadSimilarMovies = async function(movieId) {
  try {
    const data = await AJAX(`${themoviedb.API_URL}/movie/${movieId}/similar?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&page=1`);

    state.similar = data.results.map(movie => {
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
    console.log(error,'⚡⚡⚡⚡');
    throw error;
  }
};

// tải các phim khuyến khích
// https://api.themoviedb.org/3/movie/675353/recommendations?api_key=19cceeb816328f42df0e6b332f489d75&language=en-US&page=1
export const loadrecommendations = async function(movieId) {
  try {
    const data = await AJAX(`${themoviedb.API_URL}/movie/${movieId}/recommendations?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&page=1`);

    state.recommendations = data.results.map(movie => {
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
        mediaType: movie.media_type,
        title: movie.title,
        video: movie.video,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
      }
    })
  } catch (error) {
    console.log(error,'⚡⚡⚡⚡');
    throw error;
  }
};