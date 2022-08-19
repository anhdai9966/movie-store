import * as model from '../models/detailModel.js';
import { handlerScrollRender } from '../shared/helpers.js';

import headerView from '../views/headerView.js';
import sidebarView from '../views/sidebarView.js';
import searchView from '../views/searchView.js';
import gototopView from '../views/gototopView.js';
import detailNav from '../views/detailNav.js';

import detailBannerView from '../views/detailBannerView.js';
import detailView from '../views/detailView.js';
import detailCastView from '../views/detailCastView.js';
import detailCrewView from '../views/detailCrewView.js';
import detailRecommendationsView from '../views/detailRecommendationsView.js';
import detailSimilarView from '../views/detailSimilarView.js';
import detailKeywordsView from '../views/detailKeywordsView.js';
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

const controlDetailBanner = async function () {
  try {
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
    let flag = [1, 1, 1, 1, 1];

    detailBannerView.renderSpinner();
    detailView.renderSpinner();
    // 1) load detail
    await model.loadDetails(id);
    await model.loadCertification(id);

    // 2) render detail
    detailBannerView.render(model.state.detail, model.state.certificatioUS);
    // render luôn phần detail
    controlDetail(id);
    // render phần liên quan
    controlRecommendations(id)
    // lắng nghe sự kiện cuộn trang
    handlerScrollRender(500, controlCast, flag[0]);
    handlerScrollRender(600, controlSimilar, flag[1]);
    handlerScrollRender(700, controlKeywords, flag[2]);
    // đưa trang lên top
    detailBannerView.addHandlerClickTrailer(controlTrailer);
    document.title = `MovieStore | ${model.state.detail.title}`;
  } catch (error) {
    console.log(error)
  }
};

const controlDetail= async function () {
  detailView.render(model.state.detail);
};

const controlCast = async function () {
  const id = window.location.hash.slice(1);
  await model.loadCast(id);
  detailCastView.render(model.state.cast);
  controlCrew();
}

const controlCrew = async function () {
  detailCrewView.render(model.state.director, model.state.writer);
}
const controlRecommendations = async function (id) {
  detailRecommendationsView.renderSpinner();
  await model.loadRecommendations(id);
  detailRecommendationsView.render(model.state.recommendations);
  detailRecommendationsView.addHandlerClickTrailer(controlTrailer);
}
const controlSimilar = async function () {
  const id = window.location.hash.slice(1);
  await model.loadSimilar(id);
  detailSimilarView.render(model.state.similar);
  detailSimilarView.addHandlerClickTrailer(controlTrailer);
}
const controlKeywords = async function () {
  const id = window.location.hash.slice(1);
  await model.loadKeywords(id);
  detailKeywordsView.render(model.state.keywords);
}

const controlTrailer = async function (title) {
  trailerView.addHandlerShowTrailer();

  await model.loadTrailer(title)
  trailerView.render(model.state.trailer);
}

// tạo trình khởi động
const init = function() {
  headerView.addHandlerRender(controlHeader);
  detailBannerView.addHandlerRender(controlDetailBanner);
};

init();