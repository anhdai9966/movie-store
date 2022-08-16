import * as model from '../models/newsModel.js';

import headerView from '../views/headerView.js';
import sidebarView from '../views/sidebarView.js';
import searchView from '../views/searchView.js';
import gototopView from '../views/gototopView.js';

import paginationView from '../views/paginationView.js';
import newsGridView from '../views/newsGridView.js';

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

const controlNewsGrid = async function () {
  try {
    newsGridView.renderSpinner();

    await model.loadNews();

    newsGridView.render(model.state.news);
  } catch (error) {
    console.log(error)
  }
}

const init = function () {
  headerView.addHandlerRender(controlHeader);
  newsGridView.addHandlerRender(controlNewsGrid);
}

init();