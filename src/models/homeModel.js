import { AJAX } from '../shared/helpers.js';
import { themoviedb, cost, youtube, googleSheetNews, BREAKPOINTS_MAX_WIDTH_1, BREAKPOINTS_MAX_WIDTH_2, BREAKPOINTS_MAX_WIDTH_3 } from '../shared/config.js';

import movie80 from '../jsons/movie80.json';
import genres from '../jsons/genres.json';

let PER_PAGE_1;
let PER_PAGE_2;
let PER_PAGE_3;
// cập nhật perpage
const updatePerPage1 = function (breakpoint) {
  // Tạo điểm cuối kích thức cửa sổ rộng ít nhất minWidth
  const mq = window.matchMedia(`(max-width: ${breakpoint.width}px)`);
  // để biết được trang web được tải trên màn hình nào đầu tiên
  if (mq.matches && !PER_PAGE_1) {
    PER_PAGE_1 = breakpoint.item;
  }
};
const updatePerPage2 = function (breakpoint) {
  // Tạo điểm cuối kích thức cửa sổ rộng ít nhất minWidth
  const mq = window.matchMedia(`(max-width: ${breakpoint.width}px)`);
  // để biết được trang web được tải trên màn hình nào đầu tiên
  if (mq.matches && !PER_PAGE_2) {
    PER_PAGE_2 = breakpoint.item;
  }
};
const updatePerPage3 = function (breakpoint) {
  // Tạo điểm cuối kích thức cửa sổ rộng ít nhất minWidth
  const mq = window.matchMedia(`(max-width: ${breakpoint.width}px)`);
  // để biết được trang web được tải trên màn hình nào đầu tiên
  if (mq.matches && !PER_PAGE_3) {
    PER_PAGE_3 = breakpoint.item;
  }
};
const perPage = function () {
  BREAKPOINTS_MAX_WIDTH_1.forEach(updatePerPage1);
  BREAKPOINTS_MAX_WIDTH_2.forEach(updatePerPage2);
  BREAKPOINTS_MAX_WIDTH_3.forEach(updatePerPage3);
}
perPage();

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
  movie80: [],
  trailer: {
    results: [],
  },
  popular: {
    results: [],
    page: 1,
    resultsPerPage: PER_PAGE_1,
  },
  topRated: {
    results: [],
    page: 1,
    resultsPerPage: PER_PAGE_1,
  },
  upcoming: {
    results: [],
    page: 1,
    resultsPerPage: PER_PAGE_1,
  },
  action: {
    results: [],
    page: 1,
    resultsPerPage: PER_PAGE_1,
  },
  cartoon: {
    results: [],
    page: 1,
    resultsPerPage: PER_PAGE_1,
  },
  horror: {
    results: [],
    page: 1,
    resultsPerPage: PER_PAGE_1,
  },
  peoples: {
    results: [],
    page: 1,
    resultsPerPage: PER_PAGE_1,
  },
  genres: {
    results: [],
    page: 1,
    resultsPerPage: PER_PAGE_1,
  },
  nowPlaying: {
    results: [],
    page: 1,
    resultsPerPage: PER_PAGE_2,
  },
  trailers: {
    results: [],
    page: 1,
    resultsPerPage: PER_PAGE_3,
  },
  news: {
    results: [],
    page: 1,
    resultsPerPage: PER_PAGE_3,
  },
};

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
export const loadProMovies = async function (pro, statePro = 'movies', page = 1, subPro = undefined) {
  try {
    !subPro? subPro = '': subPro = `&${subPro}`;
    const data = await AJAX(`${themoviedb.API_URL}/${pro}?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&include_adult=false&page=${page}${subPro}`);

    state[statePro].results = data.results.map(movie => {
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
        price: {
          buy: cost.BUY,
          rent: cost.RENT,
        },
      };
    });
    state[statePro].page = 1;
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

// load tin tức
export const loadNews = async function () {
  try {
    const data = await AJAX(googleSheetNews.API_URL);

    state.news.results = data.results.map(news => {
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
      };
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// load people popular
export const loadPeoplePopular = async function () {
  try {
    const data = await AJAX(`${themoviedb.API_URL}/person/popular?api_key=${themoviedb.API_KEY}&language=${themoviedb.LANGUAGE}&page=1`);

    state.peoples.results = data.results.map(people => {
      return {
        adult: people.adult,
        gender: people.gender,
        id: people.id,
        knownFor: people.known_for,
        knownFor_department: people.known_for_department,
        name: people.name,
        popularity: people.popularity,
        profilePath: people.profile_path,
      };
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getResultsPage = function (statePro, page = state[statePro].page, resultsPerPage = state[statePro].resultsPerPage) {
  state[statePro].page = page;
  state[statePro].resultsPerPage = resultsPerPage;

  const start = (page - 1) * resultsPerPage; // 0
  const end = page * resultsPerPage; // 9

  return state[statePro].results.slice(start, end);
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

const persistQuery = function () {
  localStorage.setItem('querys', JSON.stringify(state.querys));
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

    state.genres.results = data.map(rec => {
      return {
        id: rec.id,
        name: rec.name,
      };
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
