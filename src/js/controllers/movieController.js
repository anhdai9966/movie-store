import * as model from '../models/movieModel.js';
import * as modelShare from '../models/model.js';

import headerView from '../views/headerView.js';
import sidebarView from '../views/sidebarView.js';
import searchView from '../views/searchView.js';
import bannerView from '../views/bannerView.js';
import gototopView from '../views/gototopView.js';
import seachedView from '../views/seachedView.js';

import paginationView from '../views/paginationView.js';
import movieCardView from '../views/movieCardView.js';
import movieNavResultView from '../views/movieNavResultView.js';
import movieNavBtnView from '../views/movieNavBtnView.js';
import trailerView from '../views/trailerView.js';
import movieLayout from '../layouts/movieLayout.js';
import wishlistCardView from '../views/wishlistCardView.js';
import bannerSearchView from '../views/bannerSearchView.js';


const controlHeader = function () {
  headerView.addHandlerShowSidebar(controlSidebar);
  headerView.addHandlerShowSearch(controlHeaderSearch);
};

const controlClickSearch = function () {
  headerView.handlerHideAccount();
  headerView.handlerHideWishlist();
}

const controlClickAccount = function () {
  headerView.handlerHideWishlist();
  searchView.handlerShowSearch();
}

const controlSidebar = function () {
  sidebarView.addHandlerShowSidebar();
};

const controlSearch = async function () {
  try {  
    // 1) Get search query
    const query = searchView.getQuery();

    if (!query) {
      searchView.addHandlerSearchListClear();
      searchView.addHandlerShowPopularList();
      seachedView.addHandlerShowSearched();
      return;
    } 
    
    // 2) Load search results
    await modelShare.loadSearch(query);
    // 3) Render results
    searchView.addHandlerHiddenPopularList();
    seachedView.addHandlerHiddenSearched();
    searchView.addHandlerRenderResultSearch(modelShare.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const controlSeached = function () {
  const query = searchView.getQuery();
  modelShare.addSearched(query);
  seachedView.render(modelShare.state.searched);
}

const controlHeaderSearch = async function () {
  searchView.addHandlerShowSearch();
  searchView.addHandlerShowPopularList();
  // load dữ liệu phổ biến
  await modelShare.loadPopular();
  // render dữ liệu
  searchView.addHandlerSuggest(modelShare.state.popular);
  seachedView.render(modelShare.state.searched);
}

const controlBanner = async function () {
  await model.loadMovie80();
  bannerView.addHandlerRenderBanner(model.state.movie80);
}

const controlMovieCard = async function () {
  // hash #now_playing&page=2
  let prefix;
  let page;

  const hash = window.location.hash.slice(1).split('&');
  // kiểm tra hash và lấy giá trị
  if (!hash[0]) {
    prefix = 'now_playing';
    page = 'page=1';
  } else if (hash.length == 1) {
    prefix = hash[0];
    page = 'page=1';
  } else if (hash.length == 2) {
    prefix = hash[0];
    page = hash[1];
  };
  // render con quay chờ đợi
  movieCardView.renderSpinner();
  // load api
  await model.loadMovies(prefix, page);
  // render card
  movieCardView.render(model.state.movies);
  // gọi api được thì mới render ra phân trang
  paginationView.render(model.state.pages, prefix);
  movieCardView.addHandlerClickTrailer(controlTrailer);
}

const controlGenres = async function () {
  await model.loadGenres();
  movieNavResultView.render(model.state.genres);
}

const controlCountries = async function () {
  await model.loadCountries();
  movieNavResultView.render(model.state.countries);
}

const controlSearchContries = function (value) {
  setTimeout(() => {
    const resultContries = model.state.countries.filter(contry => {
      return contry.name.toLowerCase().includes(value.toLowerCase()) || contry.englishName.toLowerCase().includes(value.toLowerCase());
    })
    if(resultContries.length != 0) {
      movieNavResultView.render(resultContries);
    } else {
      const mess = [{id: '', name: 'Không tìm thấy'}];
      movieNavResultView.render(mess);
    };
  }, 500);
}

const controlYears = function () {
  model.loadYear();
  movieNavResultView.render(model.state.year);
}

const controlYearInput = function (value) {
  window.location.hash = `#primary_release_year=${value}`;
}

const controlNavBtn = function () {
  movieNavBtnView.addHandlerClickGenres(controlGenres);
  movieNavBtnView.addHandlerClickNation(controlCountries);
  movieNavBtnView.addHandlerClickYear(controlYears);
  movieNavBtnView.addHandlerSearchNation(controlSearchContries);
  movieNavBtnView.addHandlerYearInput(controlYearInput);
}

const controlTrailer = async function (title) {
  trailerView.addHandlerShowTrailer();

  await model.loadTrailer(title)
  trailerView.render(model.state.trailer);
}

const controlAddBookmark = function (id) {
  // 1) Thêm/xóa bookmark
  model.addBookmark(id);
  
  movieCardView.update(model.state.movies);

  movieCardView.render(model.state.bookmarks);

  controlWishList();
}
const controlRemoveWishlist = function (id) {
  // 1) Thêm/xóa bookmark
  model.removeBookmark(id);
  
  movieCardView.update(model.state.movies);

  movieCardView.render(model.state.bookmarks);

  controlWishList();
}

const controlWishList = function () {
  wishlistCardView.render(model.state.bookmarkLocal);
}

const controlSearchResult = async function (value) {
  await model.loadSearch(value);
  movieCardView.render(model.state.movies);
}

const controlSetQuery = function (title) {
  searchView.setQuery(title)
  controlSearch();
}

const controlDeleteQuery = function (title) {
  modelShare.deleteSearched(title);
  seachedView.render(modelShare.state.searched);
}

const init = function () {
  document.title = 'MovieStore | Trang phim';
  movieCardView.addHandlerRender(controlMovieCard);
  movieCardView.addHandlerAddBookmark(controlAddBookmark);
  headerView.addHandlerRender(controlHeader);
  headerView.addHandlerRenderWishList(controlWishList);
  headerView.addHandlerClickSearch(controlClickSearch)
  headerView.addHandlerClickAccount(controlClickAccount);
  bannerView.addHandlerRender(controlBanner);
  movieNavBtnView.addHandlerRender(controlNavBtn);
  searchView.addHandlerSearchInput(controlSearch);
  searchView.addHandlerChangeInput(controlSearch);
  wishlistCardView.addHandlerRender(controlWishList);
  wishlistCardView.addHandlerRemoveCard(controlRemoveWishlist);
  bannerSearchView.addHandlerSubmit(controlSearchResult);
  searchView.addHandlerClickSearched(controlSeached);
  seachedView.addHandlerSearchedClick(controlSetQuery);
  seachedView.addHandlerClickDelete(controlDeleteQuery);
}
init();
