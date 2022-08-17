import * as model from '../models/detailNewsModel.js';

import headerView from '../views/headerView.js';
import sidebarView from '../views/sidebarView.js';
import searchView from '../views/searchView.js';
import gototopView from '../views/gototopView.js';

import newsDetailView from '../views/newsDetailView.js';

const controlNewsDetail = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if(!id) return;
    newsDetailView.renderSpinner();
    await model.loadDetails(id);
    newsDetailView.render(model.state.detailNews);
  } catch (error) {
    console.log(error)
  }
}

const init = function () {
  newsDetailView.addHandlerRender(controlNewsDetail);
}
init();