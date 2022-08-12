import View from './View.js';

class SearchView extends View {
  _parentElement = document.querySelector('.header__search');

  // thê xử lý hiển thị search
  addHandlerShowSearch() {
    this._parentElement.classList.toggle('hidden');
  }

  _generateMarkup() {
    return /*html */ `
      
    `;
  }
}

export default new SearchView();
