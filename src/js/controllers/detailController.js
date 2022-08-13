import * as model from '../models/detailModel.js';
import detailView from '../views/detailView.js';
import similarView from '../views/similarView.js';
import { ERROR_MESSAGE } from '../config.js';

const controlDetails = async function () {
  try {
    // hash nhận #616037 nên cắt kỹ tự #
    const movieId = window.location.hash.slice(1);

    // nếu ko có id thì thôi
    if (!movieId) return;

    // render giao diện chờ
    detailView.renderSpinner();

    // 1) load detail
    await model.loadDetails(movieId);
    await model.loadrecommendations(movieId);
    const { detail } = model.state;
    const { recommendations } = model.state;

    // 2) render detail
    detailView.render(detail);
    similarView.render(recommendations);
  } catch (error) {
    console.log(error, '⚡⚡⚡⚡');
    detailView.renderError(ERROR_MESSAGE);
  }
};

const init = function() {
  detailView.addHandlerRender(controlDetails);
};
init();

const detailMain = document.querySelector('#detail__main');
const navActiveEl = detailMain.querySelector('.nav__active');
function activeTranX(e) {
  const targetEl = window.event.target;
  if (!targetEl) return;
  const getStr = targetEl.getAttribute('class');
  const nameEl = getStr.substring(0, getStr.indexOf('-'));
  console.log(nameEl);
  switch (e) {
    case 0:
      navActiveEl.style.left = `calc(((100% - .6rem) / 3) * ${e} + .3rem)`;
      detailMain.querySelector('.main__show').classList.remove('main__show');
      detailMain.querySelector(`.movie__${nameEl}`).classList.add('main__show');
      break;
    case 1:
      navActiveEl.style.left = `calc(((100% - .6rem) / 3) * ${e} + .3rem)`;
      detailMain.querySelector('.main__show').classList.remove('main__show');
      detailMain.querySelector(`.movie__${nameEl}`).classList.add('main__show');
      break;
    case 2:
      navActiveEl.style.left = `calc(((100% - .6rem) / 3) * ${e} + .3rem)`;
      detailMain.querySelector('.main__show').classList.remove('main__show');
      detailMain.querySelector(`.movie__${nameEl}`).classList.add('main__show');
      break;
  }
}

// 616037
const controlDetail = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;

    if (!getPath.hasOwnProperty(id)) return;
    // recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    // resultsView.update(model.getSearchResultsPage());

    // 1) Updating bookmarks view
    // bookmarksView.update(model.state.bookmarks);

    // 2) Loading thể loại genres
    await model.loadTheMovieNoPage(getPath[id]);

    // 3) Rendering recipe
    // recipeView.render(model.state.recipe);
  } catch (err) {
    // recipeView.renderError();
    console.error(err);
  }
};

// const init = function () {
//   detailView.addHandlerRender(controlDetail);
// };
// init();