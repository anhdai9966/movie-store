import * as model from './model.js';
import detailView from './views/detailView.js';

const getPath = {
  genre: 'genre/movie/list',
  countries: 'configuration/countries',
  now_playing: 'movie/now_playing',
}

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

const init = function () {
  detailView.addHandlerRender(controlDetail);
};
init();