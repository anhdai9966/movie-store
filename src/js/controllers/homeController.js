import * as model from '../models/homeModel.js';
import { handlerScrollRender } from '../shared/helpers.js';

import headerView from '../views/headerView.js';
import sidebarView from '../views/sidebarView.js';
import searchView from '../views/searchView.js';
import bannerView from '../views/bannerView.js';
import gototopView from '../views/gototopView.js';

import homeCardView from '../views/homeCardView.js';
import homeCard2View from '../views/homeCard2View.js';
import homeCard1m2View from '../views/homeCard1m2View.js';
import homeCard3View from '../views/homeCard3View.js';
import homeCard1m3View from '../views/homeCard1m3View.js';
import homeCard1m4View from '../views/homeCard1m4View.js';
import homeCard1m5View from '../views/homeCard1m5View.js';
import homeCard4View from '../views/homeCard4View.js';
import homeCard1m6View from '../views/homeCard1m6View.js';
import homeCard5View from '../views/homeCard5View.js';
import popupGenresView from '../views/popupGenresView.js';

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

const controlHomeCard = async function() {
  let flagArr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  homeCardView.renderSpinner();
  // 1 load api từ model
  await model.loadPopular();

  // 2 render movie list từ dữ liệu model
  // cardHome được tải đầu tiên
  homeCardView.renderCard(model.state.popular);
  handlerScrollRender(100, controlHomeCard2, flagArr[0]);
  handlerScrollRender(700, controlHomeCard1m2, flagArr[1]);
  handlerScrollRender(1000, controlHomeCard3, flagArr[2]);
  handlerScrollRender(1200, controlHomeCard1m3, flagArr[3]);
  handlerScrollRender(1500, controlHomeCard1m4, flagArr[4]);
  handlerScrollRender(2000, controlHomeCard1m5, flagArr[5]);
  // handlerScrollRender(2300, controlHomeCard3m2, flagArr[6]);
  handlerScrollRender(2500, controlHomeCard4, flagArr[7]);
  handlerScrollRender(2900, controlHomeCard1m6, flagArr[8]);
  handlerScrollRender(3200, controlHomeCard5, flagArr[9]);
}

const controlHomeCard2 = async function() {
  homeCard2View.renderSpinner();
  // 1 load api từ model
  await model.loadNowPlaying();
  console.log('run 1');
  // 2 render movie list từ dữ liệu model
  homeCard2View.render2Card(model.state.nowPlaying);
}

const controlHomeCard1m2 = async function() {
  homeCard1m2View.renderSpinner();
  // 1 load api từ model
  await model.loadTopRate();
  console.log('run 2');
  // 2 render movie list từ dữ liệu model
  homeCard1m2View.renderCard(model.state.topRate);
}
const controlHomeCard3 = async function() {
  homeCard3View.renderSpinner();
  // 1 load api từ model
  await model.loadNewTrailers();
  console.log('run 3');
  // 2 render movie list từ dữ liệu model
  homeCard3View.render2Card(model.state.trailer);
}
const controlHomeCard1m3 = async function() {
  homeCard1m3View.renderSpinner();
  // 1 load api từ model
  await model.loadAction();
  console.log('run 4');
  // 2 render movie list từ dữ liệu model
  homeCard1m3View.renderCard(model.state.action);
}
const controlHomeCard1m4 = async function() {
  homeCard1m4View.renderSpinner();
  // 1 load api từ model
  await model.loadCartoon();
  console.log('run 5');
  // 2 render movie list từ dữ liệu model
  homeCard1m4View.renderCard(model.state.cartoon);
}
const controlHomeCard1m5 = async function() {
  homeCard1m5View.renderSpinner();
  // 1 load api từ model
  await model.loadHorror();
  console.log('run 6');
  // 2 render movie list từ dữ liệu model
  homeCard1m5View.renderCard(model.state.horror);
}
const controlHomeCard4 = async function() {
  homeCard4View.renderSpinner();
  // 1 load api từ model
  await model.loadPeoplePopular();
  console.log('run 7');
  // 2 render movie list từ dữ liệu model
  homeCard4View.render2Card(model.state.peoplePopular);
}
const controlHomeCard1m6 = async function() {
  homeCard1m6View.renderSpinner();
  // 1 load api từ model
  await model.loadUpcoming();
  console.log('run 8');
  // 2 render movie list từ dữ liệu model
  homeCard1m6View.renderCard2(model.state.upcoming);
}
const controlHomeCard5 = async function() {
  homeCard5View.renderSpinner();
  // 1 load api từ model
  await model.loadGenres();
  console.log('run 9');
  // 2 render movie list từ dữ liệu model
  homeCard5View.render2Card(model.state.genres);
  homeCard5View.addHandlerShowPopup(controlPopupGenres);
}

const controlPopupGenres = async function () {
  popupGenresView.addHandlerTogglePopup()
  popupGenresView.renderPopup(model.state.genres);
}

// khởi tạo các trình cần xử lý
const init = function () {
  headerView.addHandlerRender(controlHeader);
  bannerView.addHandlerRender(controlBanner);
  homeCardView.addHandlerRender(controlHomeCard);
};
init();
