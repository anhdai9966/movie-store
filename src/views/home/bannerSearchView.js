class BannerView {
  _parentElement = document.querySelector('.banner__search');
  _searchInput = this._parentElement.querySelector('.banner__search');
  _placeholder = this._parentElement.querySelector('.input__placeholder');

  constructor() {
    this._addHandlerFocusInput();
    this._addHandlerBlurInput();
  }

  addHandlerSubmit(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      const dataArr = new FormData(this._parentElement);
      const data = Object.fromEntries(dataArr);
      handler(data);
    })
  }

  clearSearchInput() {
    this._searchInput.value = '';
  }

  // xử lý nhập input
  handlerFocus() {
    const placeholderStyle = {
      'top': '0',
      'font-size': '1.2rem',
      'font-weight': 'bold',
    };
    Object.assign(this._placeholder.style, placeholderStyle);
  }

  // xử lý khi focus
  _addHandlerFocusInput() {
    this._searchInput.addEventListener('focus', this.handlerFocus.bind(this));
  }

  handlerBlur() {
    if (this._searchInput.value) {
      const placeholderStyle = {
        'top': '0',
        'font-size': '1.2rem',
        'font-weight': 'bold',
      };
      Object.assign(this._placeholder.style, placeholderStyle);
    } else {
      const placeholderStyle = {
        'top': '1.1rem',
        'font-size': '1.6rem',
        'font-weight': 'normal',
      };
      Object.assign(this._placeholder.style, placeholderStyle);
    }
  }

  // xử lý khi blur
  _addHandlerBlurInput() {
    this._searchInput.addEventListener('blur', this.handlerBlur.bind(this));
  }
}

export default new BannerView();