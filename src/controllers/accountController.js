import * as model from '../models/accountModel.js';
import { apiPro, apiSubPro, statePro, apiSubPro } from '../shared/config.js';

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
import accountView from '../views/accountView.js';
import trailerView from '../views/trailerView.js';

import avatarView from '../views/account/avatarView.js';
import tabView from '../views/account/tabView.js';
import infoView from '../views/account/infoView.js';
import myMovieView from '../views/account/myMovieView.js';
import myHistoryView from '../views/account/myHistoryView.js';
import myWishlistView from '../views/account/myWishlistView.js';
import popupWishlistView from '../views/account/popupWishlistView.js';

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
// end cần thiếu -----------------------

const controlHash = function() {
  // render avata
  avatarView.render(model.state.info.accountInfo);

  let hash = window.location.hash.slice(1);

  if (!hash) hash = '1';

  switch (+hash) {
    case 1:
      controlInfo();
      break;
    case 2:
      controlMyMovie();
      break;
    case 3:
      controlMyWishlist();
      break;
    case 4:
      controlMyHistory();
      break;
  }
}

const controlInfo = function () {
  tabView.remoreAvtived();
  tabView.activeInfoBtn();

  myMovieView.hidden();
  myHistoryView.hidden();
  myWishlistView.hidden();
  popupWishlistView.hidden();

  infoView.shown();
  infoView.render(model.state.info.accountInfo);
}

const controlMyMovie = function () {
  tabView.remoreAvtived();
  tabView.activeMyVideoBtn();

  infoView.hidden();
  myHistoryView.hidden();
  myWishlistView.hidden()
  popupWishlistView.hidden();

  myMovieView.shown();
  myMovieView.render(model.state.purchases);
}
const controlMyHistory = function () {
  tabView.remoreAvtived();
  tabView.activeMyHistoryBtn();

  infoView.hidden();
  myMovieView.hidden();
  myWishlistView.hidden()
  popupWishlistView.hidden();

  myHistoryView.shown();
  myHistoryView.render(model.state.historys);
}
const controlMyWishlist = function () {
  tabView.remoreAvtived();
  tabView.activeMyWishlistBtn();

  infoView.hidden();
  myMovieView.hidden();
  myHistoryView.hidden();

  myWishlistView.shown();
  console.log(model.state.bookmarks)
  myWishlistView.render(model.state.bookmarks);
  popupWishlistView.shown();
  popupWishlistView.render(model.state.info.accountInfo.xu, model.state.bookmarks)
}

// tạo trình khởi động
const init = function() {
  document.title = 'MovieStore | Tài khoản';

  headerAView.addHandlerRender(controlHeader);
  headerAView.addHandlerDropdownMovie(controlDropdownMovie);
  headerAView.addHandlerDropdownMore(controlDropdownMore);
  headerAView.addHandlerClickAccount(controlAccount);
  headerAView.addHandlerOpenSidebar(controlSidebar);
  headerAView.addHandlerToggleSearch(controlSearch);
  searchView.addHandlerSubmit(controlSearchResult);
  searchView.addHandlerSearchInput(controlSearchResult);
  searchedView.addHandlerClickSearched(controlSearched);
  searchedView.addHandlerClickDelete(controlDeleteSearched);
  searchResultsView.addHandlerClickSearchItem(controlAddSearched);
  trailerView.addHandlerBtnTrailer(controlBtnTrailer);

  tabView.addHandlerRender(controlHash);
  tabView.addHandlerInfoBtn(controlInfo);
  tabView.addHandlerMyVideoBtn(controlMyMovie);
  tabView.addHandlerMyWishlistBtn(controlMyWishlist);
  tabView.addHandlerMyHistoryBtn(controlMyHistory);
};

init();