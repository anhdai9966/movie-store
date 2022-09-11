import { AJAX } from '../shared/helpers.js';
import { themoviedb, cost, youtube, googleInfoUsers } from '../shared/config.js';

import movie80 from '../jsons/movie80.json';
import genres from '../jsons/genres.json';
import countries from '../jsons/countries.json';

export let state = {
  account: {
    signin: false,
    message: 'Đăng nhập thất bại',
  },
  info: {
    info: false,
    message: "Lấy thông tin thất bại",
  },
  querys: [],
  searchs: [],
  trailer: {
    results: [],
  },
  movie80: [],
  nowPlaying: {
    results: [],
  },
  movies: {
    results: [],
  },
  pages: {
    page: 1,
    totalPages: 0,
    totalResults: 0,
  },
  bookmarks: [],
  purchases: [],
  genres: [],
  countries: [],
  years: [],
};

export const loadInfo = async function (id, action = 'update') {
  try {
    const res = await AJAX(`${googleInfoUsers.API_KEY}?id=${id}`);
    
    state.info = {
      status: res.status,
      info: res.info,
      message: res.message,
      accountInfo: {
        id: res.user_info.id,
        email: res.user_info.email,
        xu: res.user_info.xu,
        name: res.user_info.name,
        gender: res.user_info.gender,
        birth: res.user_info.birth,
        credit: res.user_info.credit,
        momopay: res.user_info.momopay,
        avatar: res.user_info.avatar,
        action: action,
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export const updateInfo = async function (data) {
  try {
    const res = await AJAX(`${googleInfoUsers.API_KEY}`, data);
    console.log('🚀 ~ updateInfo ~ res', res);

  } catch (error) {
    console.log(error);
  }
}

// tìm kiếm qua api
export const loadSearch = async function (query) {
  try {
    const data = await AJAX(
      `${themoviedb.API_URL}/search/movie?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&page=1&include_adult=false&query=${query}`
    );

    state.searchs = data.results.map(movie => {
      return {
        id: movie.id,
        title: movie.title,
      };
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
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
export const loadProMovies = async function (apiPro, statePro = undefined, page = '', apiSubPro = undefined) {
  try {
    if(!statePro) statePro = 'movies';
    !page? page = '&page=1': page = `&${page}`;
    !apiSubPro? apiSubPro = '': apiSubPro = `&${apiSubPro}`;

    const data = await AJAX(`${themoviedb.API_URL}/${apiPro}?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&include_adult=false${page}${apiSubPro}`);

    state[statePro].results = data.results.map(movie => {
      let bookmarked = false;
      let purchased = false;

      if (state.bookmarks.some(bookmark => bookmark.id == movie.id)) bookmarked = true;
      if (state.purchases.some(purchase => purchase.id == movie.id)) purchased = true;

      return {
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
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
        bookmarked: bookmarked,
        purchased: purchased,
        price: {
          buy: cost.BUY,
          rent: cost.RENT,
        },
      };
    });

    // lấy số lượng page từ api
    state.pages = {
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// load youtube
// https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=trailer%202022&key=[YOUR_API_KEY]
export const loadTrailer = async function (statePro, title = '', maxResults = 20) {
  try {
    let year = '';
    if (title == '') year = `%20${new Date().getFullYear()}`;
    else title = `${title}%20`;

    const data = await AJAX(`${youtube.API_URL}&maxResults=${maxResults}&q=${title}trailer%20Office${year}`);

    state[statePro].results = data.items.map(item => {
      const { snippet, id } = item;
      return {
        channelId: snippet.channelId,
        channelTitle: snippet.channelTitle,
        description: snippet.description,
        publishTime: snippet.publishTime,
        publishedAt: snippet.publishedAt,
        thumbnails: snippet.thumbnails.high.url, // obj obj obj
        title: snippet.title,
        videoId: id.videoId,
      };
    })

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addBookmark = function (id) {
  // tìm id và thay đổi dữ liệu
  const data = state.movies.results.map(movie => {
    if (movie.id == id) {
      if (!movie.bookmarked) {
        movie.bookmarked = true;
        state.bookmarks.unshift(movie);
      } else {
        movie.bookmarked = false;
        const index = state.bookmarks.findIndex(el => el.id == id);
        state.bookmarks.splice(index, 1);
      }
    }
    return movie;
  });
  // lưu danh sách thay đổi để update
  state.movies.results = data;

  // lưu bookmarks đã thay đổi vào local
  persistBookmarks();
};

export const removeBookmark = function (id) {
  // xóa trong bookmarks
  const index = state.bookmarks.findIndex(el => el.id == id);
  state.bookmarks.splice(index, 1);
  // đổi bookmark lại trong state movie
  const data = state.movies.results.map(movie => {
    if (movie.id.toString() == id) {
        movie.bookmarked = false;
    }
    return movie;
  });
  // dùng để render lại list
  state.movies.results = data;

  // lưu vào local
  persistBookmarks();
};

export const clearBookmarks = function () {
  // xóa trong local
  localStorage.removeItem('bookmarks');
  // xóa trong state
  state.bookmarks = [];
};

// add searched
export const addSearched = function (query) {
  // lưu vào biến để lưu vào local
  if (!state.querys.includes(query)) {
    // để hiển thị đầu tiên gần nhất
    state.querys.unshift(query);
  }
  // lưu search vào local
  persistQuery();
};
// xóa searched
export const deleteSearched = function (query) {
  // tìm vị trí của query
  const index = state.querys.findIndex(q => q == query);
  // xóa vị trí của query
  state.querys.splice(index, 1);
  // lưu lại vào local
  persistQuery();
};

export const addPurchased = function (purchases) {
  // tìm id và render dữ liệu với id là true
  const data = state.movies.results.map(movie => {
    if (purchases.some(p => p.id == movie.id)) {
      movie.purchased = true;
      state.purchases.push(movie);
    }
    return movie;
  });
  // Add bookmark để render
  state.movies.results = data;
  
  // lưu vào local
  persistPurchases();
}

export const calcXu = function (bookmarks) {
  // tính số xu
  const xu = bookmarks.reduce((a, b) => (a + +b.price.buy), 0);
  // trừ xu đã mua
  state.info.accountInfo.xu -= xu;
  // luu vào local
  persistInfo();
}

// lưu vào local || session
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
const persistPurchases = function () {
  localStorage.setItem('purchases', JSON.stringify(state.purchases));
};
const persistQuery = function () {
  localStorage.setItem('query', JSON.stringify(state.querys));
};
const persistInfo = function () {
  localStorage.setItem('info', JSON.stringify(state.info));
};

// nạp dữ liệu vào cocal || session nếu có
const init = function () {
  const localStorageAcc = localStorage.getItem('account');
  if (localStorageAcc) state.account = JSON.parse(localStorageAcc);

  const sessionStorageAcc = sessionStorage.getItem('account');
  if (sessionStorageAcc) state.account = JSON.parse(sessionStorageAcc);

  const localStorageInfo = localStorage.getItem('info');
  if (localStorageInfo) state.info = JSON.parse(localStorageInfo);

  const sessionStorageInfo = sessionStorage.getItem('info');
  if (sessionStorageInfo) state.info = JSON.parse(sessionStorageInfo);

  const storageQuery = localStorage.getItem('querys');
  if (storageQuery) state.querys = JSON.parse(storageQuery);

  const storageBookmarks = localStorage.getItem('bookmarks');
  if (storageBookmarks) state.bookmarks = JSON.parse(storageBookmarks);

  const storagePurchases = localStorage.getItem('purchases');
  if (storagePurchases) state.purchases = JSON.parse(storagePurchases);
};

init();

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
        apiPro: 'discover/movie',
        subApiPro: 'with_genres=',
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
        apiPro: 'discover/movie',
        subApiPro: 'region=',
      };
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loadYear = function () {
  let y = new Date().getFullYear();

  for (let i = 0; i < 30; i++) {
    let dt = {
      id: y,
      name: y,
      apiPro: 'discover/movie',
      subApiPro: 'primary_release_year=',
    };
    state.years.push(dt);
    y--;
  }
};