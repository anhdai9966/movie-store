import { AJAX } from '../shared/helpers.js';
import { themoviedb, cost, youtube, googleInfoUsers } from '../shared/config.js';

export const state = {
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
  bookmarks: [],
  purchases: [],
  genres: [],
  countries: [],
  years: [],
  nowPlaying: {
    results: [],
  },
  historys: [],
};

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

export const updateInfo = async function (data) {
  try {
    const res = await AJAX(`${googleInfoUsers.API_KEY}`, data);
    console.log('🚀 ~ updateInfo ~ res', res);

  } catch (error) {
    console.log(error);
  }
}

// tải các phim khuyến nghị
// https://api.themoviedb.org/3/movie/675353/recommendations?api_key=19cceeb816328f42df0e6b332f489d75&language=en-US&page=1

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

export const getResultsPage = function (page, perPage = state.cast.resultsPerPage) {
  state.cast.page = page;
  state.cast.resultsPerPage = perPage;

  const start = (page - 1) * perPage; // 0
  const end = page * perPage; // 9

  return state.cast.results.slice(start, end);
};

export const addBookmark = function (id) {
  if (state.detail.id == id) {
    if (!state.detail.bookmarked) {
      state.detail.bookmarked = true;
      state.bookmarks.unshift(state.detail);
    } else {
      state.detail.bookmarked = false;
      const index = state.bookmarks.findIndex(el => el.id == id);
      state.bookmarks.splice(index, 1);
    }
  }

  // lưu bookmarks đã thay đổi vào local
  persistBookmarks();
};

export const removeBookmark = function (id) {
  // xóa trong bookmarks
  const index = state.bookmarks.findIndex(el => el.id == id);
  state.bookmarks.splice(index, 1);
  // đổi bookmark lại trong state movie
  if (state.detail.id == id) {
    state.detail.bookmarked = false;
  }

  // lưu vào local
  persistBookmarks();
};
// dành cho detail
export const addPurchased = function () {
  // Add bookmark để render
  state.detail.purchased = true;
  state.purchases.push(state.detail);
  
  // lưu vào local
  persistPurchases();
}

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

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
const persistPurchases = function () {
  localStorage.setItem('purchases', JSON.stringify(state.purchases));
};
const persistHistorys = function () {
  localStorage.setItem('historys', JSON.stringify(state.historys));
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

  const storageHistorys = localStorage.getItem('historys');
  if (storageHistorys) state.historys = JSON.parse(storageHistorys);
};

init();