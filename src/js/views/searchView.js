import View from './View.js';

class SearchView extends View {
  _parentElement = document.querySelector('.header__search');


  constructor() {
    super();
    this._addHandlerScrollTopShowHeader();
  }
  // thê xử lý hiển thị search
  addHandlerShowSearch() {
    this._parentElement.classList.toggle('hidden');
  }

  // nếu cuộn xuống thì ẩn còn cuộn lên thì hiện
  _addHandlerScrollTopShowHeader() {
    let heightCurrent, height = 0;
    window.addEventListener('scroll', () => {
      heightCurrent = document.documentElement.scrollTop;
      if (!this._parentElement.classList.contains('hidden')) {
        if(height < heightCurrent) {
          this._parentElement.style.top = "-380px";
          height = heightCurrent;
        } else {
          this._parentElement.style.top = "54px";
          height = heightCurrent;
        };
      }
    });
  }

  _generateMarkup() {
    return /*html */ `
      
    `;
  }
}

export default new SearchView();
