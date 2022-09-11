import CardView from './cardView.js';

class MyMovieView extends CardView {
  _grandParentElement = document.querySelector('.account__my-movie');
  _parentElement = this._grandParentElement.querySelector('.card__grid')
}

export default new MyMovieView();