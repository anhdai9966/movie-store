import * as model from '../models/movieModel.js';
import { apiPro, apiSubPro, statePro, MESSAGE_DONT_BUY_CART, apiSubPro } from '../shared/config.js';

import notificationView from '../views/notificationView.js';
import visualcompletionView from '../views/visualcompletionView.js';
import gototopView from '../views/gototopView.js';
import warningView from '../views/warningView.js';
import headerNAView from '../views/headerNAView.js';
import headerAView from '../views/headerAView.js';
import sidebarView from '../views/sidebarView.js';
import searchView from '../views/searchView.js';
import searchSuggestView from '../views/searchSuggestView.js';
import searchedView from '../views/searchedView.js';
import searchResultsView from '../views/searchResultsView.js';
import popupGenresView from '../views/popupGenresView.js';
import wishlistView from '../views/wishlistView.js';
import accountView from '../views/accountView.js';

import movie80View from '../views/movie80View.js';
import trailerView from '../views/trailerView.js';

import cardView from '../views/movie/cardView.js';
import paginationView from '../views/movie/paginationView.js';
import filterView from '../views/movie/filterView.js';
import filterResultView from '../views/movie/filterResultView.js';
import bannerSearchView from '../views/movie/bannerSearchView.js';
import popupBuyView from '../views/movie/popupBuyView.js';
import buyBtnView from '../views/movie/buyBtnView.js';
import buyPicSpreadView from '../views/movie/buyPicSpreadView.js';
import buyXuView from '../views/movie/buyXuView.js';

// dùng chung -----------------------
// thông báo chưa có nội dung
const controlNotification = function (message) {
  notificationView.render(message);
  notificationView.addHandlerNotification();
};
// cảnh báo chưa có tiêu đề
const controlWarning = function (title) {
  warningView.addhandlerWarningToggle();
  warningView.render(title);
};
// copy ra nếu muốn dùng visual
const controlVisual = function () {
  // tạo visual loading
  visualcompletionView.addHandlerLoadingBarEnter();
  // ẩn visual
  visualcompletionView.addHandlerLoadingDone();
};
// nếu đăng nhập rồi thì hiện header đăng nhập còn chưa thì hiện chưa
const controlHeader = function () {
  if (!model.state.account.signin) {
    headerAView.toggleHeader();
    headerNAView.toggleHeader();
  }
};
// điều khiển các nút khi click trên header
const controlDropdownMovie = function () {
  headerAView.togglePopupMovie();
  searchView.closeSearch();
};
const controlDropdownMore = function () {
  headerAView.togglePopupMore();
  searchView.closeSearch();
};
const controlWishlist = function () {
  headerAView.toggleWishlist();
  searchView.closeSearch();
  // render wishlist
  wishlistView.render(model.state.bookmarks);
  model.state.bookmarks.length ? wishlistView.shownBtn() : wishlistView.hiddenBtn();
};
const controlRemoveWishlist = function (id) {
  // 1) Thêm/xóa bookmark
  model.removeBookmark(id);
  // update lại list movie
  cardView.update(model.state.movies.results);
  // update lại wishlist
  wishlistView.render(model.state.bookmarks);
  model.state.bookmarks.length ? wishlistView.shownBtn() : wishlistView.hiddenBtn();
}
const controlBtnBuy = async function () {
  // hiển thị popup
  popupBuyView.togglePopup();
  // hiển thị title buy
  popupBuyView.shownTitleBuy();
  buyXuView.shown();
  buyBtnView.hidden();
  buyPicSpreadView.render(model.state.bookmarks);
  buyXuView.renderLoading();
  // load xu 
  await model.loadInfo(model.state.account.id);
  buyXuView.renderXu(model.state.info.accountInfo.xu, model.state.bookmarks);
  buyBtnView.shown();
  buyBtnView.renderBtn(model.state.bookmarks);
}
const controlChangeInputxu = function (price) {
  buyBtnView.renderBtn(model.state.bookmarks, price);
}
const controlBuyRent = function (price) {
  if (!+price) {
    controlWarning('Bạn có muốn mua!');
  } else {
    controlNotification('Mua bằng tiền hiện không khả dụng.')
  };
}
const controlPurchased = async function () {
  // tạo visual loading
  visualcompletionView.addHandlerLoadingBarEnter();
  // vì trong sự kiện này là mua tất cả nên dữ liệu là tất cả item trong local
  model.addPurchased(model.state.bookmarks);
  // lấy lại xu thực
  model.calcXu(model.state.bookmarks);
  // xóa bookmark 
  model.clearBookmarks();

  cardView.update(model.state.movies.results);
  wishlistView.render(model.state.bookmarks);
  wishlistView.hiddenBtn();
  setTimeout(() => {
    warningView.addhandlerWarningToggle();
    popupBuyView.shownTitleDone();
    buyXuView.hidden();
    buyBtnView.hidden();
    visualcompletionView.addHandlerLoadingDone();
  }, 800);
  await model.updateInfo(model.state.info.accountInfo)
}
const controlAccount = function () {
  headerAView.toggleAccount();
  searchView.closeSearch();
  // render dữ liệu thông tin account
  accountView.render(model.state.info);
};
const controlSidebar = function () {
  sidebarView.showSidebar();
  headerAView.styleBackgroundBlack();
};
const controlSearch = async function () {
  try {
    // đóng tất cả các popup hiển thị nếu có
    headerAView.closeAllPopup();
    // nếu hiển thị
    if (searchView.containsSearch()) {
      headerAView.styleBackgroundBlack();
    } else {
      headerAView.styleBackgroundTransparent();
    }
    // hiển thị search
    searchView.toggleSearch();
    // ẩn result
    searchView.hiddenResult();
    // xóa nội dung input nếu có
    searchView.clearQuery();
    // nếu không có dữ liệu thì load từ api
    if (!model.state.nowPlaying.results.length) {
      await model.loadProMovies(apiPro.nowPlaying, statePro.nowPlaying);
    }
    // render list lịch sử
    searchedView.render(model.state.querys);
    // render list thịnh hành nếu có rồi thì thôi
    if (!searchSuggestView.getChildElementCount) {
      searchSuggestView.render(model.state.nowPlaying.results);
    }
  } catch (error) {
    console.log(error);
  }
};
const controlSearchResult = async function (data) {
  try {
    let query;
    data ? (query = data) : (query = searchView.getQuery());
    // nếu ô input trống thì ẩn result rồi không load nữa
    if (!query) {
      searchView.hiddenResult();
      // render list lịch sử
      searchedView.render(model.state.querys);
      return;
    }
    // hiển thị search results
    searchView.shownResult();
    // load search kết quả từ api
    await model.loadSearch(query);
    // render danh sách kết quả
    searchResultsView.render(model.state.searchs);
  } catch (error) {
    console.log(error);
  }
};
// thêm searched vào local khi được click
const controlAddSearched = function () {
  const query = searchView.getQuery();
  // lưu query lại
  model.addSearched(query);
};
const controlSearched = async function (query) {
  try {
    // gán vào ô input
    searchView.setQuery(query);
    // hiển thị search results
    searchView.shownResult();
    // load search kết quả từ api
    await model.loadSearch(query);
    // render danh sách kết quả
    searchResultsView.render(model.state.searchs);
  } catch (error) {
    console.log(error);
  }
};
const controlDeleteSearched = function (query) {
  // xóa query
  model.deleteSearched(query);
  // render list lịch sử
  searchedView.render(model.state.querys);
};
// end cần thiếu -----------------------
// điều khiển movie80pic
const controlMovie80 = async function () {
  try {
    // 1. load 80 pic poster movie
    await model.loadMovie80();
    // 2. render 80 pic
    movie80View.render(model.state.movie80);
  } catch (error) {
    console.log(error);
  }
};
const controlPopupGenres = function () {
  // hiển thị popup genres
  popupGenresView.togglePopup();
  // render dữ liệu
  popupGenresView.render(model.state.genres.results);
};
// điều khiển banner search
const controlBannerSearch = async function (data) {
  const query = `${apiSubPro.query}${data.search}`;
  await model.loadProMovies(apiPro.search, undefined, undefined, query);
  window.location.hash = `#${apiPro.search}&&${query}`;
  // xóa nội dung trong input
  bannerSearchView.clearSearchInput();
  // cho movie btn
  filterView.notActiveAll();
};
// điều khiển khi ấn trailer
const controlBtnTrailer = async function (title) {
  try {
    // hiển thị popup trailer
    trailerView.shownTrailer();
    // render loading
    trailerView.renderLoading();
    // load api trailer
    await model.loadTrailer(statePro.trailer, title, 1);
    // render trailer
    trailerView.render(model.state.trailer.results[0]);
  } catch (error) {
    console.log(error);
  }
};
// btn movie
const controlActivedSortAsc = function () {
  filterView.notActiveAll();
  filterView.shownSortDesc();
  filterResultView.hiddenResult();
};
const controlActivedSortDesc = function () {
  filterView.notActiveAll();
  filterView.shownSortReset();
  filterResultView.hiddenResult();
};
const controlActivedSortReset = function () {
  filterView.notActiveAll();
  filterView.shownSortAsc();
  filterResultView.hiddenResult();
};
const controlActivedYear = function () {
  filterView.notActiveAll();
  filterView.activedYear();
  filterResultView.shownResult();
  filterResultView.shownInputYear();
  filterResultView.hiddenInputCountries();
  // load year
  if (!model.state.years.length) model.loadYear();
  // render year
  filterResultView.render(model.state.years);
};
const controlActivedGenres = async function () {
  filterView.notActiveAll();
  filterView.activedGenres();
  filterResultView.shownResult();
  filterResultView.hiddenInputCountries();
  filterResultView.hiddenInputYear();
  if (!model.state.genres.length) await model.loadGenres();
  filterResultView.render(model.state.genres);
};
const controlActivedCountries = async function () {
  filterView.notActiveAll();
  filterView.activedCountries();
  filterResultView.shownResult();
  filterResultView.shownInputCountries();
  filterResultView.hiddenInputYear();
  if (!model.state.countries.length) await model.loadCountries();
  filterResultView.render(model.state.countries);
};
const controlBtnReset = function () {
  const hash = window.location.hash.slice(1);
  hash ? filterResultView.shownBtnReset() : filterResultView.hiddenbtnReset();
  if (hash.includes('region')) filterView.activedCountries();
  if (hash.includes('genres')) filterView.activedGenres();
  if (hash.includes('year')) filterView.activedYear();
};
const controlBtnClose = function () {
  const hash = window.location.hash.slice(1);
  filterResultView.hiddenResult();
  filterView.notActiveAll();
  if (hash.includes('region')) filterView.activedCountries();
  if (hash.includes('genres')) filterView.activedGenres();
  if (hash.includes('year')) filterView.activedYear();
}
const controlCountriesInput = function (value) {
  setTimeout(() => {
    const resultContries = model.state.countries.filter(contry => {
      return contry.name.toLowerCase().includes(value.toLowerCase()) || contry.englishName.toLowerCase().includes(value.toLowerCase());
    })
    if(resultContries.length != 0) {
      filterResultView.render(resultContries);
    } else {
      const mess = [{id: '', apiPro: '', subApiPro: '', name: 'Không tìm thấy'}];
      filterResultView.render(mess);
    };
  }, 500);
}
const controlYearInput = function (value) {
  window.location.hash = `#${apiPro.genres}&&${apiSubPro.year}${value}`;
}
// load movie
const controlMovies = async function () {
  // hash #now_playing&page=2&with_genres=28
  const hash = window.location.hash.slice(1).split('&');
  // lấy các giá trị hash
  const pro = hash[0] ? hash[0] : apiPro.nowPlaying;
  const page = hash[1] ? hash[1] : undefined;
  const subPro = hash[2] ? hash[2] : undefined;
  // render loading
  cardView.renderLoading();
  // load api movie
  await model.loadProMovies(pro, undefined, page, subPro);
  // render card
  cardView.render(model.state.movies.results);
  // render phân trang
  paginationView.render(model.state.pages);
};

const controlAddBookmark = function (id) {
  // 1) Thêm/xóa bookmark
  model.addBookmark(id);
  
  cardView.update(model.state.movies.results);
  // render bookmark
  headerAView.closeAllPopup();
}

const init = function () {
  document.title = 'MovieStore | Trang phim';
  headerAView.addHandlerRender(controlHeader);
  headerAView.addHandlerDropdownMovie(controlDropdownMovie);
  headerAView.addHandlerDropdownMore(controlDropdownMore);
  headerAView.addHandlerClickWishlist(controlWishlist);
  headerAView.addHandlerClickAccount(controlAccount);
  headerAView.addHandlerOpenSidebar(controlSidebar);
  headerAView.addHandlerToggleSearch(controlSearch);
  searchView.addHandlerSubmit(controlSearchResult);
  searchView.addHandlerSearchInput(controlSearchResult);
  searchedView.addHandlerClickSearched(controlSearched);
  searchedView.addHandlerClickDelete(controlDeleteSearched);
  searchResultsView.addHandlerClickSearchItem(controlAddSearched);
  wishlistView.addHandlerBtnRemove(controlRemoveWishlist);
  wishlistView.addHandlerBtnBuy(controlBtnBuy);

  movie80View.addHandlerRender(controlMovie80);
  bannerSearchView.addHandlerSubmit(controlBannerSearch);
  trailerView.addHandlerBtnTrailer(controlBtnTrailer);
  buyXuView.addHandlerChange(controlChangeInputxu);
  buyBtnView.addHandlerBuy(controlBuyRent);
  buyBtnView.addHandlerRent(controlBuyRent);
  warningView.addHandlerClickOk(controlPurchased);

  filterView.addHandlerClickSortAsc(controlActivedSortAsc);
  filterView.addHandlerClickSortDesc(controlActivedSortDesc);
  filterView.addHandlerClickSortReset(controlActivedSortReset);
  filterView.addHandlerClickYear(controlActivedYear);
  filterView.addHandlerClickCountries(controlActivedCountries);
  filterView.addHandlerClickGenres(controlActivedGenres);
  filterResultView.addHandlerRender(controlBtnReset);
  filterResultView.addHandlerbtnClose(controlBtnClose);
  filterResultView.addHandlerInputCountries(controlCountriesInput);
  filterResultView.addHandlerInputYear(controlYearInput);
  cardView.addHandlerRender(controlMovies);
  cardView.addHandlerBookmark(controlAddBookmark);
};
init();
