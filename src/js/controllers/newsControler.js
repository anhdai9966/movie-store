import * as model from '../models/newsModel.js';
import * as modelShare from '../models/model.js';

import headerView from '../views/headerView.js';
import sidebarView from '../views/sidebarView.js';
import searchView from '../views/searchView.js';
import gototopView from '../views/gototopView.js';

import paginationView from '../views/newspagination.js';
import newsGridView from '../views/newsGridView.js';

const controlHeader = function () {
  headerView.addHandlerShowSidebar(controlSidebar);
  headerView.addHandlerShowSearch(controlHeaderSearch);
};

const controlSidebar = function () {
  sidebarView.addHandlerShowSidebar();
};

const controlSearch = async function () {
  try {  
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await modelShare.loadSearch(query);
    console.log(modelShare.state.search);
    
    // 3) Render results
    searchView.addHandlerRenderResultSearch(modelShare.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const controlHeaderSearch = function () {
  searchView.addHandlerShowSearch();
}

const controlNewsGrid = async function () {
  try {
    const id = window.location.hash.slice(1);
    let prefix;
    if(id.includes('page') || id.includes('countryId') || !id) {
      prefix = id;
    }
    newsGridView.renderSpinner();

    await model.loadNews(prefix);
    console.log(model.state);
    newsGridView.render(model.state.news);
    controlPagination(prefix)
  } catch (error) {
    newsGridView.renderError();
    console.log(error)
  }
}

const controlPagination = function (prefix) {
  paginationView.render(model.state.pages, prefix);
}



const init = function () {
  headerView.addHandlerRender(controlHeader);
  newsGridView.addHandlerRender(controlNewsGrid);
  searchView.addHandlerSearchInput(controlSearch);

}

init();