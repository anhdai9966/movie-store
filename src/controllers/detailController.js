import * as model from '../models/detailModel.js';
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

import bannerView from '../views/detail/bannerView.js';
import detailView from '../views/detail/detailView.js';
import castView from '../views/detail/castView.js';
import crewView from '../views/detail/crewView.js';
import recommendationsView from '../views/detail/recommendationsView.js';
import similarView from '../views/detail/similarView.js';
import keywordsView from '../views/detail/keywordsView.js';
import tabView from '../views/detail/tabView.js';
import popupBuyView from '../views/detail/popupBuyView.js';
import buyBtnView from '../views/detail/buyBtnView.js';
import buyPicSpreadView from '../views/detail/buyPicSpreadView.js';
import buyXuView from '../views/detail/buyXuView.js';

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

const controlBanner = async function () {
  try {
    // đưa document lên top
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    // hash nhận #616037 nên cắt kỹ tự #
    const id = window.location.hash.slice(1);
    // const id = window.location.pathname;
    // nếu ko có id thì thôi
    if (!id) return;
    // render giao diện chờ
    bannerView.renderLoading();
    // 1) load detail
    await model.loadDetails(id);
    await model.loadCertification(id);
    // 2) render detail
    bannerView.render(model.state.detail, model.state.certificatioUS);
    detailView.render(model.state.detail);
    // render luôn phần detail
    document.title = `MovieStore | ${model.state.detail.title}`;
    model.addHistory()
  } catch (error) {
    console.log(error)
  }
};

const controlAddBookmark = function (id) {
  // 1) Thêm/xóa bookmark
  model.addBookmark(id);
  
  bannerView.update(model.state.detail);
}

const controlCast = async function (perPage) {
  const id = window.location.hash.slice(1);
  castView.renderLoading();
  if (!model.state.cast.results.length) {
    await model.loadCast(id);
  }
  castView.render(model.getResultsPage(1, perPage));
  crewView.render(model.state.director, model.state.writer);
  castView.renderBtnControl(model.state.cast);
}
const controlCastBtnControl = function(goToPage) {
  // 1) Render NEW results
  castView.render(model.getResultsPage(goToPage));
  // 2) Render NEW buttons control
  castView.renderBtnControl(model.state.cast);
}

const controlRecommendations = async function () {
  recommendationsView.renderLoading();
  const id = window.location.hash.slice(1);
  await model.loadProMovies(`movie/${id}/recommendations`, statePro.recommendations);
  recommendationsView.render(model.state.recommendations.results);
}
const controlSimilar = async function () {
  similarView.renderLoading();
  const id = window.location.hash.slice(1);
  await model.loadProMovies(`movie/${id}/similar`, statePro.similar);
  similarView.render(model.state.similar.results);
}
const controlKeywords = async function () {
  keywordsView.renderLoading();
  const id = window.location.hash.slice(1);
  await model.loadKeywords(id);
  keywordsView.render(model.state.keywords);
}

const controlBtnBuy = async function () {
  // hiển thị popup
  popupBuyView.togglePopup();
  // hiển thị title buy
  popupBuyView.shownTitleBuy();
  buyXuView.shown();
  buyBtnView.hidden();
  buyPicSpreadView.render([model.state.detail]);
  buyXuView.renderLoading();
  // load xu 
  await model.loadInfo(model.state.account.id);
  buyXuView.renderXu(model.state.info.accountInfo.xu, [model.state.detail]);
  buyBtnView.shown();
  buyBtnView.renderBtn([model.state.detail]);
}
const controlChangeInputxu = function (price) {
  buyBtnView.renderBtn([model.state.detail], price);
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
  model.addPurchased();
  // lấy lại xu thực
  model.calcXu([model.state.detail]);
  // xóa bookmark 
  model.removeBookmark();
  // render lại banner
  bannerView.update(model.state.detail);
  setTimeout(() => {
    warningView.addhandlerWarningToggle();
    popupBuyView.shownTitleDone();
    buyXuView.hidden();
    buyBtnView.hidden();
    visualcompletionView.addHandlerLoadingDone();
  }, 800);
  await model.updateInfo(model.state.info.accountInfo)
}

// tạo trình khởi động
const init = function() {
  document.title = 'MovieStore | Trang chi tiết';

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

  bannerView.addHandlerRender(controlBanner);
  bannerView.addHandlerBookmark(controlAddBookmark);
  castView.addHandlerScrollRender(controlCast, 500);
  castView.addHandlerMediaQuery4(controlCast);
  castView.addHandlerBtnControl(controlCastBtnControl);
  recommendationsView.addHandlerRender(controlRecommendations);
  similarView.addHandlerRender(controlSimilar);
  keywordsView.addHandlerRender(controlKeywords);

  bannerView.addHandlerBuy(controlBtnBuy);
  bannerView.addHandlerRent(controlBtnBuy);
  buyXuView.addHandlerChange(controlChangeInputxu);
  buyBtnView.addHandlerBuy(controlBuyRent);
  buyBtnView.addHandlerRent(controlBuyRent);
  warningView.addHandlerClickOk(controlPurchased);
};

init();