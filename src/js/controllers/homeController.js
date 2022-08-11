import * as model from '../models/homeModel.js';

import headerView from '../views/headerView.js';
import sidebarView from '../views/sidebarView.js';
import searchView from '../views/searchView.js';
import bannerView from '../views/bannerView.js';

// tạo biến đếm số lần
let count = [1, 1];

const controlHeaders = async function () {

  
  headerView.render();
  headerView.addHandlerNavMore();
  headerView.addHandlerNavMoreMovie();
  headerView.addHandlerAccount();
  headerView.addHandlerSearch();
  headerView.addHandlerWishlish();
  headerView.addHandlerRemoveShowMediaQuery();
  headerView.addHandlerRemoveShowClick();
  headerView.addHandlerRemoveShowScroll();
};

const controlSidebars = function () {
  // chỉ render 1 lần
  if (count[0] == 1) sidebarView.render();
  count[0] = 0;
  sidebarView.addHandlerOpenTransition();
  sidebarView.addHandlerCloseSidebar();
  sidebarView.addHandlerCloseSidebarMediaQuery();
  sidebarView.addHandlerCloseSidebarClickOverlay();
};

const controlSearchs = function () {
  // chỉ render 1 lần
  if (count[1] == 1) searchView.render();
  count[1] = 0;
  searchView.addHandlerToggleSearch();
};

const controlBanner = async function() {
  await model.loadMovie80();
  bannerView.render(model.state.movie80);
}

const init = function () {
  headerView.addHandlerRender(controlHeaders);
  bannerView.addHandlerRender(controlBanner);
  headerView.addHandlerOpenSidebar(controlSidebars);
  headerView.addHandlerSearch(controlSearchs);
};
init();
