class BannerView {
  _parentElement = document.querySelector('.banner__content');
  _bannerForm = this._parentElement.querySelector('.banner__form');
  _emailInput = this._parentElement.querySelector('.input__email');
  _placeholder = this._parentElement.querySelector('.input__placeholder');
  _bannerSignup = this._parentElement.querySelector('.banner__signup');
  _bannerLogged = this._parentElement.querySelector('.banner__logged');

  constructor() {
    this._addHandlerFocusInput();
    this._addHandlerBlurInput();
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  getEmail() {
    return this._emailInput.value;
  }

  addHandlerSignup(handler) {
    this._bannerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const dataArr = new FormData(this._bannerForm);
      const data = Object.fromEntries(dataArr);
      handler(data);
    })
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
    this._emailInput.addEventListener('focus', this.handlerFocus.bind(this));
  }

  handlerBlur() {
    if (this._emailInput.value) {
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
    this._emailInput.addEventListener('blur', this.handlerBlur.bind(this));
  }

  addHandlerToggle() {
    this._bannerSignup.classList.toggle('hidden');
    this._bannerLogged.classList.toggle('hidden');
  }
}

export default new BannerView();