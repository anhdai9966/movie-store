import View from './View.js';

class HeaderView extends View {
  _parentElement = document.querySelector('.header');

  _movieBtnToggle = document.querySelector('.movie__btn--toggle');
  _moreBtnToggle = document.querySelector('.more__btn--toggle');
  _accountBtnToggle = document.querySelector('.account__btn--toggle');
  _wishlistBtnToggle = document.querySelector('.wishlist__btn--toggle');
  _searchBtnToggle = document.querySelector('.search__btn--toggle');

  constructor() {
    super();
    this._addHandlerShowNavMore();
    this._addHandlerShowNavMoreMovie();
    this._addHandlerShowAccount();
    this._addHandlerShowWishlist();
    this._addHandlerHiddenNavMoreMediaQuery992();
    this._addHandlerHiddenNavMoreMediaQuery576();
    this._addHandlerScrollTopShowHeader();
    this._addHandlerHiddenClick();
  }

  // xử lý khi dom đã được tải xong
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  // xử lý khi click vào menu sidebar
  addHandlerShowSidebar(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.sidebar__btn--show');
      if (!btn) return;
      handler();
      console.log('run');
    });
  }

  // Thêm xử lý toggle search
  addHandlerShowSearch(handler) {
    const parentEl = this._parentElement;
    let count = 0;
    this._searchBtnToggle.addEventListener('click', function () {
      handler();
      if(count == 0) {
        parentEl.style.background = '#181818';
        count++;
      } else {
        parentEl.style.background = 'transparent';
        count--;
      };
      
    });
  }

  handlerShowNavMoreMovie() {
    this.handlerHiddenNavMore.call(this);
    this.handlerHideAccount.call(this);
    this.handlerHideWishlist.call(this);
    this._movieBtnToggle.nextElementSibling.classList.toggle('hidden');
  }

  // thêm xử lý khi click vòa nav more movie
  _addHandlerShowNavMoreMovie() {
    this._movieBtnToggle.addEventListener('click', this.handlerShowNavMoreMovie.bind(this));
  }

  handlerShowNavMore() {
    this.handlerHiddenNavMoreMovie.call(this);
    this.handlerHideAccount.call(this);
    this.handlerHideWishlist.call(this);
    this._moreBtnToggle.nextElementSibling.classList.toggle('hidden');
  }

  // thêm xử lý khi click vòa nav more
  _addHandlerShowNavMore() {
    this._moreBtnToggle.addEventListener('click', this.handlerShowNavMore.bind(this));
  }

  handlerShowAccount() {
    this.handlerHiddenNavMore.call(this);
    this.handlerHiddenNavMoreMovie.call(this);
    this.handlerHideWishlist.call(this);
    this._accountBtnToggle.nextElementSibling.classList.toggle('hidden');
  }

  // Thêm xử lý toggle account
  _addHandlerShowAccount() {
    this._accountBtnToggle.addEventListener('click', this.handlerShowAccount.bind(this));
  }

  handlerShowWishlist() {
    this.handlerHiddenNavMore.call(this);
    this.handlerHiddenNavMoreMovie.call(this);
    this.handlerHideAccount.call(this);
    this._wishlistBtnToggle.nextElementSibling.classList.toggle('hidden');
  }

  addHandlerRenderWishList(handler) {
    this._wishlistBtnToggle.addEventListener('click', () => {
      handler();
    })
  }
  addHandlerClickSearch(handler) {
    this._searchBtnToggle.addEventListener('click', () => {
      handler();
    })
  }
  addHandlerClickAccount(handler) {
    this._accountBtnToggle.addEventListener('click', () => {
      handler();
    })
  }

  // Thêm xử lý toggle wishlist
  _addHandlerShowWishlist() {
    this._wishlistBtnToggle.addEventListener('click', this.handlerShowWishlist.bind(this));
  }

  // hidden
  handlerHideAccount() {
    if (!this._accountBtnToggle.nextElementSibling.classList.contains('hidden')) {
      this._accountBtnToggle.nextElementSibling.classList.add('hidden');
    }
  }

  handlerHideWishlist() {
    if (!this._wishlistBtnToggle.nextElementSibling.classList.contains('hidden')) {
      this._wishlistBtnToggle.nextElementSibling.classList.add('hidden');
    }
  }

  handlerHiddenNavMoreMovie() {
    if (!this._movieBtnToggle.nextElementSibling.classList.contains('hidden')) {
      this._movieBtnToggle.nextElementSibling.classList.add('hidden');
    }
  }

  handlerHiddenNavMore() {
    if (!this._moreBtnToggle.nextElementSibling.classList.contains('hidden')) {
      this._moreBtnToggle.nextElementSibling.classList.add('hidden');
    }
  }

  // thêm xử lý khi thay đổi kích thước màn hình
  _addHandlerHiddenNavMoreMediaQuery992() {
    // Tạo điểm cuối kích thức cửa sổ rộng ít nhất 992px
    const mediaQuery = window.matchMedia(`(min-width: 992px)`);
    // đăng ký với trình nghe sự kiện
    mediaQuery.addListener(e => {
      // nếu lớn hơn 992 thì xử lý
      if (e.matches) {
        // gọi lại method trong class
        this.handlerHiddenNavMore.call(this);
        this.handlerHiddenNavMoreMovie.call(this);
      }
    });
  }

  _addHandlerHiddenNavMoreMediaQuery576() {
    const mediaQuery = window.matchMedia(`(min-width: 576px)`);
    mediaQuery.addListener(e => {
      if (e.matches) {
        this.handlerHideWishlist.call(this);
      }
    });
  }

  // thêm xử lý khi click bất kỳ thì ẩn những gì đã hiện
  _addHandlerHiddenClick() {
    const listElementNotHidden = [
      '.movie__btn--toggle',
      '.more__btn--toggle',
      '.account__btn--toggle',
      '.wishlist__btn--toggle',
      '.search__btn--toggle',
    ];
    window.addEventListener('click', (e) => {
      const btn = e.target;
      const flag = listElementNotHidden.some(el => btn.closest(el));

      if (!flag) {
        this.handlerHiddenNavMore();
        this.handlerHiddenNavMoreMovie();
        this.handlerHideAccount();
      };
    })
  }

  // nếu cuộn xuống thì ẩn còn cuộn lên thì hiện
  _addHandlerScrollTopShowHeader() {
    let heightCurrent, height = 0;
    window.addEventListener('scroll', () => {
      heightCurrent = document.documentElement.scrollTop;
      
      if(height < heightCurrent) {
        this._parentElement.style.top = "-54px";
        this.handlerHiddenNavMore();
        this.handlerHiddenNavMoreMovie();
        this.handlerHideAccount();
        this._wishlistBtnToggle.nextElementSibling.style.top = '-500px';
        height = heightCurrent;
      } else {
        this._parentElement.style.top = "0";
        this._wishlistBtnToggle.nextElementSibling.style.top = 'calc(100% + 1rem)';
        heightCurrent == 54 ?
        this._parentElement.style.background = "transparent" :
        this._parentElement.style.background = "#181818";

        height = heightCurrent;
      }

      if (heightCurrent == 0) {
        this._parentElement.style.top = "0";
        this._parentElement.style.background = "transparent";
      }
    });
  }

  _generateMarkup() {
    return /*html */ `
      
    `;
  }
}

export default new HeaderView();
