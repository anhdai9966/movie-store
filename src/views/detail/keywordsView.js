import View from '../View.js';

class DetailKeywordsView extends View {
  _parentElement = document.querySelector('.keyword__list');

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(keyword) {
    return /*html*/ `
      <li class="keyword__item">
        <a href="./movie.html#keyword/${keyword.id}/movies" class="keyword__link">${keyword.name}</a>
      </li>
    `;
  }
}

export default new DetailKeywordsView();