import * as model from '../models/homeModel.js';

import headerView from '../views/headerView.js';
import sidebarView from '../views/sidebarView.js';
import searchView from '../views/searchView.js';
import bannerView from '../views/bannerView.js';
import introduceView from '../views/introduceView.js';
import gototopView from '../views/gototopView.js';

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

const controlIntroduce = async function () {
  await model.loadMovie2();

  introduceView.renderMovie2(model.state.movie2);

  await model.loadMovie6();

  introduceView.renderMovie6(model.state.movie6);
}

const init = function () {
  headerView.addHandlerRender(controlHeader);
  bannerView.addHandlerRender(controlBanner);
  introduceView.addHandlerRender(controlIntroduce);
};
init();
