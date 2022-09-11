class HeaderView {
  _parentElement = document.querySelector('.header-not-account');

  _signinElement = this._parentElement.querySelector('.header__signin');
  _signoutElement = this._parentElement.querySelector('.header__signout');

  constructor() {
    this._addHandlerScrollTopShowHeader();
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  toggleHeader(){
    this._parentElement.classList.toggle('hidden');
  }

  addHandlerToggle() {
    this._signinElement.classList.toggle('hidden');
    this._signoutElement.classList.toggle('hidden');
  }

  addHandlerClickSignin(handler) {
    this._signinElement.addEventListener('click', handler);
  }

  addHandlerClickSignout(handler) {
    this._signoutElement.addEventListener('click', handler);
  }

  // nếu cuộn xuống thì ẩn còn cuộn lên thì hiện
  _addHandlerScrollTopShowHeader() {
    let heightCurrent,
      height = 0;
    window.addEventListener('scroll', () => {
      heightCurrent = document.documentElement.scrollTop;

      if (height < heightCurrent) {
        this._parentElement.style.top = '-54px';
        
        height = heightCurrent;
      } else {
        this._parentElement.style.top = '0';
        heightCurrent == 54 ? (this._parentElement.style.background = 'transparent') : (this._parentElement.style.background = '#181818');

        height = heightCurrent;
      }

      if (heightCurrent == 0) {
        this._parentElement.style.top = '0';
        this._parentElement.style.background = 'transparent';
      }
    });
  }
}

export default new HeaderView();
