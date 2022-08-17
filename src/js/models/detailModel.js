import { themoviedb, youtubeClick } from '../shared/config.js';
import { AJAX } from '../shared/helpers.js';

export const state = {
  detail: {},
  similar: [],
  recommendations: [],
  certificatioUS: '',
  cast: [],
  director: {},
  writer: {},
  keywords: [],
  trailer: {},
};

// tải chi tiết phim
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
export const loadDetails = async function (id) {
  try {
    const data = await AJAX(`${themoviedb.API_URL}/movie/${id}?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}`);

    // vì data chung quá nên gọi nó là detail
    state.detail = {
      adult: data.adult,
      backdropPath: data.backdrop_path,
      belongsToCollection: data.belongs_to_collection, // obj
      budget: data.budget,
      genres: data.genres, // arr
      homepage: data.homepage,
      id: data.id,
      imdbId: data.imdb_id,
      originalLanguage: data.original_language,
      originalTitle: data.original_title,
      overview: data.overview,
      popularity: data.popularity,
      posterPath: data.poster_path,
      productionCompanies: data.production_companies, // arr
      productionCountries: data.production_countries, // arr
      releaseDate: data.release_date,
      revenue: data.revenue,
      runtime: data.runtime,
      spokenLanguages: data.spoken_languages, // arr
      status: data.status,
      tagline: data.tagline,
      title: data.title,
      video: data.video,
      voteAverage: data.vote_average,
      voteCount: data.vote_count,
    };
  } catch (error) {
    console.log(error,'⚡⚡⚡⚡');
    throw error;
  }
};

// tải các phim tương tự
// https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=<<api_key>>&language=en-US&page=1
export const loadSimilar = async function(id) {
  try {
    const data = await AJAX(`${themoviedb.API_URL}/movie/${id}/similar?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&page=1`);

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

// tải các phim khuyến nghị
// https://api.themoviedb.org/3/movie/675353/recommendations?api_key=19cceeb816328f42df0e6b332f489d75&language=en-US&page=1
export const loadRecommendations = async function(id) {
  try {
    const data = await AJAX(`${themoviedb.API_URL}/movie/${id}/recommendations?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&page=1`);

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

// tải chứng nhận
// https://api.themoviedb.org/3/movie/539681/release_dates?api_key=19cceeb816328f42df0e6b332f489d75
export const loadCertification = async function (id) {
  try {
    const data = await AJAX(`${themoviedb.API_URL}/movie/${id}/release_dates?api_key=${themoviedb.API_KEY}`);

    const us = data.results.find(i => i.iso_3166_1 == 'US');
    if(!us) return ;
    state.certificatioUS = us.release_dates[0].certification;
    // {
    //   "iso_3166_1": "US",
    //   "release_dates": [
    //     {
    //       "certification": "PG",
    //       "iso_639_1": "",
    //       "note": "",
    //       "release_date": "2022-07-29T00:00:00.000Z",
    //       "type": 3
    //     }
    //   ]
    // },
  } catch (error) {
    console.log(error,'⚡⚡⚡⚡');
    throw error;
  }
}

// tải dàn diễn viên
// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=19cceeb816328f42df0e6b332f489d75&language=en-US
export const loadCast = async function (id) {
  try {
    const data = await AJAX(`${themoviedb.API_URL}/movie/${id}/credits?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}`);

    state.cast = data.cast.map(c => {
      return {
        castId: c.cast_id,
        character: c.character,
        creditId: c.credit_id,
        gender: c.gender,
        id: c.id,
        known_for_department: c.known_for_department,
        name: c.name,
        order: c.order,
        originalName: c.original_name,
        popularity: c.popularity,
        profilePath: c.profile_path,
      }
    })
    
    state.director = data.crew.find(c => c.job == 'Director');
    state.writer = data.crew.find(c => c.job == 'Writer');
  } catch (error) {
    console.log(error,'⚡⚡⚡⚡');
    throw error;
  }
}

// tải keyword
// https://api.themoviedb.org/3/movie/453395/keywords?api_key=19cceeb816328f42df0e6b332f489d75
export const loadKeywords = async function (id) {
  try {
    const data = await AJAX(`${themoviedb.API_URL}/movie/${id}/keywords?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}`);
    state.keywords = data.keywords.map(k => {
      return {
        id: k.id,
        name: k.name,
      };
    })
  } catch (error) {
    console.log(error)
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