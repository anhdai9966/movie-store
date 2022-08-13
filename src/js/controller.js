import * as model from './models/homeModel.js';

import headerView from './views/headerIndexView.js';
import bannerView from './views/bannerView.js';
import introduceView from './views/introduceView.js';
import popupSigninView from './views/popupSigninView.js';
import discoverView from './views/discoverView.js';
import gototopView from './views/gototopView.js';

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

const controlPopupSignin = async function () {
  popupSigninView.addHandlerShowPopupSignin();
}

const init = function () {
  headerView.addHandlerSigninOpenModal(controlPopupSignin);
  bannerView.addHandlerRender(controlBanner);
  introduceView.addHandlerRender(controlIntroduce);
};
init();

const getPath = {
  genre: 'genre/movie/list',
  countries: 'configuration/countries',
  now_playing: 'movie/now_playing',
}