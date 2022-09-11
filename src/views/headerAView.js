class HeaderView {
  _parentElement = document.querySelector('.header-account');
  _overlayElement = this._parentElement.previousElementSibling;

  _dropdowMovie = this._parentElement.querySelector('.header__dropdown-movie');
  _dropdowMore = this._parentElement.querySelector('.header__dropdown-more');
  _wishlist = this._parentElement.querySelector('.header__wishlist');
  _account = this._parentElement.querySelector('.header__account');

  constructor() {
    this._addHandlerCloseAllPopup();
    this._addHandlerScrollHeader();
    this._addHandlerMediaQuery992();
    this._addHandlerMediaQuery576();
  }

  // xử lý khi dom đã được tải xong
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  // xử lý toggle
  toggleHeader() {
    this._parentElement.classList.toggle('hidden');
  }
  closeAllPopup() {
    if (!this._overlayElement.classList.contains('hidden')) {
      this._overlayElement.classList.add('hidden');
    }
    if (!this._dropdowMovie.classList.contains('hidden')) {
      this._dropdowMovie.classList.add('hidden');
    }
    if (!this._dropdowMore.classList.contains('hidden')) {
      this._dropdowMore.classList.add('hidden');
    }
    if (!this._wishlist.classList.contains('hidden')) {
      this._wishlist.classList.add('hidden');
    }
    if (!this._account.classList.contains('hidden')) {
      this._account.classList.add('hidden');
    }
  }
  toggleOvelay() {
    if (
      this._dropdowMovie.classList.contains('hidden') &&
      this._dropdowMore.classList.contains('hidden') &&
      this._wishlist.classList.contains('hidden') &&
      this._account.classList.contains('hidden')
    ) {
      this._overlayElement.classList.add('hidden');
    } else {
      this._overlayElement.classList.remove('hidden');
    }
  }
  togglePopupMovie() {
    this._dropdowMovie.classList.toggle('hidden');
    this.toggleOvelay();
  }
  togglePopupMore() {
    this._dropdowMore.classList.toggle('hidden');
    this.toggleOvelay();
  }
  toggleWishlist() {
    this._wishlist.classList.toggle('hidden');
    if (!this._account.classList.contains('hidden')) {
      this._account.classList.add('hidden');
    }
    this.toggleOvelay();
  }
  toggleAccount() {
    this._account.classList.toggle('hidden');
    if (!this._wishlist.classList.contains('hidden')) {
      this._wishlist.classList.add('hidden');
    }
    this.toggleOvelay();
  }

  // xư lý khi click vào overlay close all
  _addHandlerCloseAllPopup() {
    this._overlayElement.addEventListener('click', this.closeAllPopup.bind(this));
  }
  // xử lý khi click vào phim
  addHandlerDropdownMovie(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.header__btn-movie--toggle');
      if (!btn) return;
      handler();
    });
  }
  // xử lý khi click vào hơn nữa
  addHandlerDropdownMore(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.header__btn-more--toggle');
      if (!btn) return;
      handler();
    });
  }
  // xử lý khi click vào wishlist
  addHandlerClickWishlist(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.header__btn-wishlist--toggle');
      if (!btn) return;
      handler();
    });
  }
  // xử lý khi click vào account
  addHandlerClickAccount(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.header__btn-account--toggle');
      if (!btn) return;
      handler();
    });
  }
  // xử lý khi click vào search
  addHandlerToggleSearch(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.header__btn-search--toggle');
      if (!btn) return;
      handler();
    });
  }
  // xử lý khi click vào menu sidebar
  addHandlerOpenSidebar(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.header__btn-sidebar--open');
      if (!btn) return;
      handler();
    });
  }

  // thêm xử lý khi thay đổi kích thước màn hình
  _addHandlerMediaQuery992() {
    // Tạo điểm cuối kích thức cửa sổ rộng ít nhất 992px
    const mediaQuery = window.matchMedia(`(min-width: 992px)`);
    // đăng ký với trình nghe sự kiện
    mediaQuery.addListener(e => {
      // nếu lớn hơn 992 thì xử lý
      if (e.matches) {
        // gọi lại method trong class
        this.closeAllPopup.call(this);
      }
    });
  }

  _addHandlerMediaQuery576() {
    const mediaQuery = window.matchMedia(`(min-width: 576px)`);
    mediaQuery.addListener(e => {
      if (e.matches) {
        this.closeAllPopup.call(this);
      }
    });
  }

  styleBackgroundBlack() {
    if (document.documentElement.scrollTop == 0) {
      this._parentElement.style.background = '#181818';
    }
  }
  styleBackgroundTransparent() {
    if (document.documentElement.scrollTop == 0) {
      this._parentElement.style.background = 'transparent';
    }
  }
  // nếu cuộn xuống thì ẩn còn cuộn lên thì hiện
  _addHandlerScrollHeader() {
    let heightCurrent,
      height = 0;
    window.addEventListener('scroll', () => {
      heightCurrent = document.documentElement.scrollTop;

      if (height < heightCurrent) {
        this._parentElement.style.top = '-54px';
        this.closeAllPopup();
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
