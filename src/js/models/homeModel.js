import { AJAX } from '../shared/helpers.js';
import { themoviedb, youtubeSearch, googleSheetNews, youtubeClick } from '../shared/config.js';

import movie80 from '../../json/movie80.json';
import genres from '../../json/genres.json';

export let state = {
  movie80: [],
  nowPlaying: [],
  popular: [],
  topRate: [],
  trailers: [],
  action: [],
  cartoon: [],
  horror: [],
  peoplePopular: [],
  upcoming: [],
  genres: [],
  news: [],
  trailer: []
};

// https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1
export const loadNowPlaying = async function() {
  try {
    const data = await AJAX(`${themoviedb.API_URL}/movie/now_playing?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&page=1`);
    
    state.nowPlaying = data.results.map(movie => {
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

// https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1
export const loadTopRate = async function() {
  try {
    const data = await AJAX(`${themoviedb.API_URL}/movie/top_rated?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&page=1`);
    
    state.topRate = data.results.map(movie => {
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

// https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBDpgsyZOUhJ0ETZ_7FdF7dVA5wb2THdF8&type=video&q=avatar%20trailer
// watch https://www.youtube.com/watch?v=tST-F75I2To
export const loadNewTrailers = async function() {
  try {
    const yearCurrent = new Date().getFullYear();

    const data = await AJAX(`${youtubeSearch.API_URL}trailer%20${yearCurrent}`);
    
    data.items.forEach(item => {
      const { snippet, id } = item;
      let pushData = {
        channelId: snippet.channelId,
        channelTitle: snippet.channelTitle,
        description: snippet.description,
        liveBroadcastContent: snippet.liveBroadcastContent,
        publishTime: snippet.publishTime,
        publishedAt: snippet.publishedAt,
        thumbnails: snippet.thumbnails, // obj obj obj
        title: snippet.title,
        videoId: id.videoId,
      }
      state.trailers.push(pushData);
    })
  } catch (error) {
    console.log(error)
    throw error;
  }
}

// https://api.themoviedb.org/3/discover/movie?api_key=###&with_genres=28
export const loadAction = async function() {
  try {
    const data = await AJAX(`${themoviedb.API_URL}/discover/movie?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&with_genres=28&page=1`);
    
    state.action = data.results.map(movie => {
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

export const loadCartoon = async function() {
  try {
    const data = await AJAX(`${themoviedb.API_URL}/discover/movie?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&with_genres=16&page=1`);
    
    state.cartoon = data.results.map(movie => {
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

export const loadHorror = async function() {
  try {
    const data = await AJAX(`${themoviedb.API_URL}/discover/movie?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&with_genres=27&page=1`);
    
    state.horror = data.results.map(movie => {
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

// https://api.themoviedb.org/3/person/popular?api_key=<<api_key>>&language=en-US&page=1
export const loadPeoplePopular = async function() {
  try {
    const data = await AJAX(`${themoviedb.API_URL}/person/popular?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&with_genres=27&page=1`);
    
    state.peoplePopular = data.results.map(people => {
      return {
        adult: people.adult,
        gender: people.gender,
        id: people.id,
        knownFor: people.known_for,
        knownFor_department: people.known_for_department,
        name: people.name,
        popularity: people.popularity,
        profilePath: people.profile_path,
      }
    })
  } catch (error) {
    console.log(error)
    throw error;
  }
}

// https://api.themoviedb.org/3/movie/upcoming?api_key=<<api_key>>&language=en-US&page=1
export const loadUpcoming = async function() {
  try {
    const data = await AJAX(`${themoviedb.API_URL}/movie/upcoming?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&page=1`);
    
    state.upcoming = data.results.map(movie => {
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

export const loadNews = async function () {
  try {
    const data = await AJAX(googleSheetNews.API_URL);
    
    state.news = data.results.map(news => {
      return {
        author: news.author,
        countryId: news.country_id,
        createdAt: news.created_at,
        description: news.description,
        id: news.id,
        imageUrl: news.image_url,
        nameSource: news.name_source,
        sourceUrl: news.source_url,
        title: news.title,
      }
    })

    state.totalPages = data.total_pages;
    state.totalResults = data.total_results
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