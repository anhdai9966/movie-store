import * as model from '../models/movieModel.js';

import headerView from '../views/headerView.js';
import sidebarView from '../views/sidebarView.js';
import searchView from '../views/searchView.js';
import bannerView from '../views/bannerView.js';
import gototopView from '../views/gototopView.js';

import paginationView from '../views/paginationView.js';
import movieCardView from '../views/movieCardView.js';
import movieNavResultView from '../views/movieNavResultView.js';
import movieNavBtnView from '../views/movieNavBtnView.js';
import trailerView from '../views/trailerView.js';


const controlHeader = function () {
  headerView.addHandlerShowSidebar(controlSidebar);
  headerView.addHandlerShowSearch(controlSearch);
};

const controlSidebar = function () {
  sidebarView.addHandlerShowSidebar();
};

const controlSearch = function () {
  searchView.addHandlerShowSearch();
};

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

const init = function () {
  movieCardView.addHandlerRender(controlMovieCard);
  headerView.addHandlerRender(controlHeader);
  bannerView.addHandlerRender(controlBanner);
  movieNavBtnView.addHandlerRender(controlNavBtn);
}
init();
