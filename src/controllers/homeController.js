import * as model from '../models/homeModel.js';
import { apiPro, apiSubPro, statePro } from '../shared/config.js';

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

import movie80View from '../views/movie80View.js';
import trailerView from '../views/trailerView.js';

import popularView from '../views/home/popularView.js';
import nowPlayingView from '../views/home/nowPlayingView.js';
import topRatedView from '../views/home/topRatedView.js';
import trailersView from '../views/home/trailersView.js';
import actionView from '../views/home/actionView.js';
import cartoonView from '../views/home/cartoonView.js';
import horrorView from '../views/home/horrorView.js';
import newsView from '../views/home/newsView.js';
import peopleView from '../views/home/peopleView.js';
import upcomingView from '../views/home/upcomingView.js';
import genresView from '../views/home/genresView.js';
import bannerSearchView from '../views/home/bannerSearchView.js';

// dùng chung -----------------------
// thông báo chưa có nội dung
const controlNotification = function (message) {
  notificationView.render(message);
  notificationView.addHandlerNotification();
}
// cảnh báo chưa có tiêu đề
const controlWarning = function (title) {
  warningView.addhandlerWarningToggle();
  warningView.render(title);
}
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
    };
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
    console.log(error)
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
    console.log(error)
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
    console.log(error)
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
    console.log(error)
  }
}
// điều khiển banner search
const controlBannerSearch = async function (data) {
  const query = `${apiSubPro.query}${data.search}`;
  // xóa nội dung trong input
  bannerSearchView.clearSearchInput();
  window.location.assign(`./movie.html#${apiPro.search}&&${query}`);
};

const controlBtnTrailer = async function (title) {
  try {
    // hiển thị popup trailer
    trailerView.shownTrailer();
    // render loading
    trailerView.renderLoading();
    // load api trailer
    await model.loadTrailer(statePro.trailer, title, 1)
    // render trailer
    trailerView.render(model.state.trailer.results[0]);
  } catch (error) {
    console.log(error)
  }
}

// phần nội dung home
const controlPopular = async function (perPage) {
  try {
    // render loading
    popularView.renderLoading();
    // load dữ liệu nếu chưa có
    if (!model.state.popular.results.length) {
      await model.loadProMovies(apiPro.popular, statePro.popular);
    }
    // render movie list với các item đã được phân chia
    popularView.render(model.getResultsPage(statePro.popular, 1, perPage));
    // render btn control
    popularView.renderBtnControl(model.state.popular);
  } catch (error) {
    console.log(error)
  }
};
const controlPopularBtnControl = function (goToPage) {
  // 1) Render NEW results
  popularView.render(model.getResultsPage(statePro.popular, goToPage));
  // 2) Render NEW buttons control
  popularView.renderBtnControl(model.state.popular);
};

const controlNowPlaying = async function (perPage) {
  try {
    // render loading
    nowPlayingView.renderLoading();
    // load dữ liệu nếu chưa có
    if (!model.state.nowPlaying.results.length) {
      await model.loadProMovies(apiPro.nowPlaying, statePro.nowPlaying);
    }
    // render movie list với các item đã được phân chia
    nowPlayingView.render(model.getResultsPage(statePro.nowPlaying, 1, perPage));
    // render btn control
    nowPlayingView.renderBtnControl(model.state.nowPlaying);
  } catch (error) {
    console.log(error)
  }
};
const controlNowPlayingBtnControl = function (goToPage) {
  // 1) Render NEW results
  nowPlayingView.render(model.getResultsPage(statePro.nowPlaying, goToPage));
  // 2) Render NEW buttons control
  nowPlayingView.renderBtnControl(model.state.nowPlaying);
};

const controlTopRated = async function (perPage) {
  try {
     // render loading
     topRatedView.renderLoading();
    // load dữ liệu nếu chưa có
    if (!model.state.topRated.results.length) {
      await model.loadProMovies(apiPro.topRate, statePro.topRate);
    }
    // render movie list với các item đã được phân chia
    topRatedView.render(model.getResultsPage(statePro.topRate, 1, perPage));
    // render btn control
    topRatedView.renderBtnControl(model.state.topRated);
  } catch (error) {
    console.log(error)
  }
};
const controlTopRatedBtnControl = function (goToPage) {
  // 1) Render NEW results
  topRatedView.render(model.getResultsPage(statePro.topRate, goToPage));
  // 2) Render NEW buttons control
  topRatedView.renderBtnControl(model.state.topRated);
};

const controlTrailers = async function (perPage) {
  try {
    // render loading
    trailersView.renderLoading();
    // load dữ liệu nếu chưa có
    if (!model.state.trailers.results.length) {
      await model.loadTrailer(statePro.trailers);
    }
    // render movie list với các item đã được phân chia
    trailersView.render(model.getResultsPage(statePro.trailers, 1, perPage));
    // render btn control
    trailersView.renderBtnControl(model.state.trailers);
  } catch (error) {
    console.log(error)
  }
};
const controlTrailersBtnControl = function (goToPage) {
  // 1) Render NEW results
  trailersView.render(model.getResultsPage(statePro.trailers, goToPage));
  // 2) Render NEW buttons control
  trailersView.renderBtnControl(model.state.trailers);
};

const controlAction = async function (perPage) {
  try {
    // render loading
    actionView.renderLoading();
    // load dữ liệu nếu chưa có
    if (!model.state.action.results.length) {
      await model.loadProMovies(apiPro.genres, statePro.action, 1, apiSubPro.action);
    }
    // render movie list với các item đã được phân chia
    actionView.render(model.getResultsPage(statePro.action, 1, perPage));
    // render btn control
    actionView.renderBtnControl(model.state.action);
  } catch (error) {
    console.log(error)
  }
};
const controlActionBtnControl = function (goToPage) {
  // 1) Render NEW results
  actionView.render(model.getResultsPage(statePro.action, goToPage));
  // 2) Render NEW buttons control
  actionView.renderBtnControl(model.state.action);
};

const controlCartoon = async function (perPage) {
  try {
    // render loading
    cartoonView.renderLoading();
    // load dữ liệu nếu chưa có
    if (!model.state.cartoon.results.length) {
      await model.loadProMovies(apiPro.genres, statePro.cartoon, 1, apiSubPro.cartoon);
    }
    // render movie list với các item đã được phân chia
    cartoonView.render(model.getResultsPage(statePro.cartoon, 1, perPage));
    // render btn control
    cartoonView.renderBtnControl(model.state.cartoon);
  } catch (error) {
    console.log(error)
  }
};
const controlCartoonBtnControl = function (goToPage) {
  // 1) Render NEW results
  cartoonView.render(model.getResultsPage(statePro.cartoon, goToPage));
  // 2) Render NEW buttons control
  cartoonView.renderBtnControl(model.state.cartoon);
};

const controlHorror = async function (perPage) {
  try {
    // render loading
    horrorView.renderLoading();
    // load dữ liệu nếu chưa có
    if (!model.state.horror.results.length) {
      await model.loadProMovies(apiPro.genres, statePro.horror, 1, apiSubPro.horror);
    }
    // render movie list với các item đã được phân chia
    horrorView.render(model.getResultsPage(statePro.horror, 1, perPage));
    // render btn control
    horrorView.renderBtnControl(model.state.horror);
  } catch (error) {
    console.log(error)
  }
};
const controlHorrorBtnControl = function (goToPage) {
  // 1) Render NEW results
  horrorView.render(model.getResultsPage(statePro.horror, goToPage));
  // 2) Render NEW buttons control
  horrorView.renderBtnControl(model.state.horror);
};

const controlNews = async function (perPage) {
  try {
    // render loading
    newsView.renderLoading();
    // load dữ liệu nếu chưa có
    if (!model.state.news.results.length) {
      await model.loadNews();
    }
    // render movie list với các item đã được phân chia
    newsView.render(model.getResultsPage(statePro.news, 1, perPage));
    // render btn control
    newsView.renderBtnControl(model.state.news);
  } catch (error) {
    console.log(error)
  }
};
const controlNewsBtnControl = function (goToPage) {
  // 1) Render NEW results
  newsView.render(model.getResultsPage(statePro.news, goToPage));
  // 2) Render NEW buttons control
  newsView.renderBtnControl(model.state.news);
};

const controlPeople = async function (perPage) {
  try {
    // render loading
    peopleView.renderLoading();
    // load dữ liệu nếu chưa có
    if (!model.state.peoples.results.length) {
      await model.loadPeoplePopular();
    }
    // render movie list với các item đã được phân chia
    peopleView.render(model.getResultsPage(statePro.peoples, 1, perPage));
    // render btn control
    peopleView.renderBtnControl(model.state.peoples);
  } catch (error) {
    console.log(error)
  }
};
const controlPeopleBtnControl = function (goToPage) {
  // 1) Render NEW results
  peopleView.render(model.getResultsPage(statePro.peoples, goToPage));
  // 2) Render NEW buttons control
  peopleView.renderBtnControl(model.state.peoples);
};

const controlUpcoming = async function (perPage) {
  try {
    // render loading
    upcomingView.renderLoading();
    // load dữ liệu nếu chưa có
    if (!model.state.upcoming.results.length) {
      await model.loadProMovies(apiPro.upcoming, statePro.upcoming, 1);
    }
    // render movie list với các item đã được phân chia
    upcomingView.render(model.getResultsPage(statePro.upcoming, 1, perPage));
    // render btn control
    upcomingView.renderBtnControl(model.state.upcoming);
  } catch (error) {
    console.log(error)
  }
};
const controlUpcomingBtnControl = function (goToPage) {
  // 1) Render NEW results
  upcomingView.render(model.getResultsPage(statePro.upcoming, goToPage));
  // 2) Render NEW buttons control
  upcomingView.renderBtnControl(model.state.upcoming);
};

const controlGenres = async function (perPage) {
  try {
    // render loading
    genresView.renderLoading();
    // load dữ liệu nếu chưa có
    if (!model.state.genres.results.length) {
      await model.loadGenres();
    }
    // render movie list với các item đã được phân chia
    genresView.render(model.getResultsPage(statePro.genres, 1, perPage));
    // render btn control
    genresView.renderBtnControl(model.state.genres);
  } catch (error) {
    console.log(error)
  }
};
const controlGenresBtnControl = function (goToPage) {
  // 1) Render NEW results
  genresView.render(model.getResultsPage(statePro.genres, goToPage));
  // 2) Render NEW buttons control
  genresView.renderBtnControl(model.state.genres);
};

const controlPopupGenres = function () {
  // hiển thị popup genres
  popupGenresView.togglePopup();
  // render dữ liệu
  popupGenresView.render(model.state.genres.results);
};

// khởi tạo các trình cần xử lý
const init = function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  document.title = 'MovieStore | Trang chủ';
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

  movie80View.addHandlerRender(controlMovie80);
  trailerView.addHandlerBtnTrailer(controlBtnTrailer);
  bannerSearchView.addHandlerSubmit(controlBannerSearch);

  popularView.addHandlerRender(controlPopular);
  popularView.addHandlerMediaQuery1(controlPopular);
  popularView.addHandlerBtnControl(controlPopularBtnControl);
  nowPlayingView.addHandlerScrollRender(controlNowPlaying, 100);
  nowPlayingView.addHandlerMediaQuery2(controlNowPlaying);
  nowPlayingView.addHandlerBtnControl(controlNowPlayingBtnControl);
  topRatedView.addHandlerScrollRender(controlTopRated, 300);
  topRatedView.addHandlerMediaQuery1(controlTopRated);
  topRatedView.addHandlerBtnControl(controlTopRatedBtnControl);
  trailersView.addHandlerScrollRender(controlTrailers, 900);
  trailersView.addHandlerMediaQuery3(controlTrailers);
  trailersView.addHandlerBtnControl(controlTrailersBtnControl);
  actionView.addHandlerScrollRender(controlAction, 1200);
  actionView.addHandlerMediaQuery1(controlAction);
  actionView.addHandlerBtnControl(controlActionBtnControl);
  cartoonView.addHandlerScrollRender(controlCartoon, 1500);
  cartoonView.addHandlerMediaQuery1(controlCartoon);
  cartoonView.addHandlerBtnControl(controlCartoonBtnControl);
  horrorView.addHandlerScrollRender(controlHorror, 1800);
  horrorView.addHandlerMediaQuery1(controlHorror);
  horrorView.addHandlerBtnControl(controlHorrorBtnControl);
  newsView.addHandlerScrollRender(controlNews, 2200);
  newsView.addHandlerMediaQuery3(controlNews);
  newsView.addHandlerBtnControl(controlNewsBtnControl);
  peopleView.addHandlerScrollRender(controlPeople, 2500);
  peopleView.addHandlerMediaQuery1(controlPeople);
  peopleView.addHandlerBtnControl(controlPeopleBtnControl);
  upcomingView.addHandlerScrollRender(controlUpcoming, 2800);
  upcomingView.addHandlerMediaQuery1(controlUpcoming);
  upcomingView.addHandlerBtnControl(controlUpcomingBtnControl);
  genresView.addHandlerScrollRender(controlGenres, 3000);
  genresView.addHandlerMediaQuery1(controlGenres);
  genresView.addHandlerBtnControl(controlGenresBtnControl);
  genresView.addHandlerClickAllView(controlPopupGenres);
};

init();
