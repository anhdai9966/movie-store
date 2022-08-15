import * as model from '../models/movieModel.js';

import headerView from '../views/headerView.js';
import sidebarView from '../views/sidebarView.js';
import searchView from '../views/searchView.js';
import bannerView from '../views/bannerView.js';
import gototopView from '../views/gototopView.js';

import paginationView from '../views/paginationView.js';
import movieCardView from '../views/movieCardView.js';

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

const detailMainEl = document.querySelector('#detail__main');
const yearInputEl = document.getElementById('year__input');
const nationInputEl = document.getElementById('nation__input');

const navResultEl = detailMainEl.querySelector('.nav__result');
const resultGridEl = navResultEl.querySelector('.result__grid');

detailMainEl.addEventListener('click', e => {
  const navBtnEl = e.target.closest('.nav__btn');
  const resultItemEL = e.target.closest('.result__item');
  const classNames = ['nav--active', 'nav__reset'];

  if (!navBtnEl) return;

  if (detailMainEl.querySelector('.nav--active')) {
    detailMainEl.querySelector('.nav--active').classList.remove('nav--active');
  }

  if (!classNames.some(className => navBtnEl.classList.contains(className))) {
    navBtnEl.classList.add('nav--active');

    if(!navBtnEl.classList.contains('nav__sort')) {
      navResultEl.style.display = 'block';
      setTimeout(() => {
        navResultEl.style.opacity = '1';
        navResultEl.style.height = '23rem';
        navResultEl.style.padding = '1rem';
      }, 100);
    }

    navBtnEl.classList.contains('nav__year')
    ? yearInputEl.style.display = 'block'
    : yearInputEl.style.display = 'none';

    navBtnEl.classList.contains('nav__nation')
    ? nationInputEl.style.display = 'block'
    : nationInputEl.style.display = 'none';
  }
}, true);

// movieMainEl.querySelector('.nav__reset').style.display = 'block';

detailMainEl.addEventListener('click', e => {
  const resultItemEL = e.target.closest('.result__item');

  if (!resultItemEL) return;

  if (detailMainEl.querySelector('.result__item--active')) {
    detailMainEl.querySelector('.result__item--active').classList.remove('result__item--active');
  }

  if(!resultItemEL.classList.contains('result__item--active')) {
    resultItemEL.classList.add('result__item--active');
  }
}, true);

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
}

// const controlPagination = function () {
// }

const init = function () {
  movieCardView.addHandlerRender(controlMovieCard);
  headerView.addHandlerRender(controlHeader);
  bannerView.addHandlerRender(controlBanner);
}
init();
