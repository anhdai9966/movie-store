import View from './View.js';

import logo from '../../imgs/logo.png';
import icons from 'url:../../imgs/icons.svg';

class HeaderView extends View {
  _parentElement = document.querySelector('.header');

  // xử lý khi dom đã được tải xong
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerRemoveShowClick() {
    const parentElement = this._parentElement;
    document.addEventListener('click', function (e) {
      const btn1 = e.target.closest('.movie__btn--toggle');
      const btn2 = e.target.closest('.more__btn--toggle');
      const btn3 = e.target.closest('.account__btn--toggle');
      const btn4 = e.target.closest('.search__btn--toggle');
      const btn5 = e.target.closest('.wishlist__btn--toggle');
      if (btn1 || btn2 || btn3 || btn4 || btn5) return;
      const findShow = parentElement.querySelector('.show');
      if (findShow) findShow.classList.remove('show');
    });
  }

  // khi click vào nút menu thì xử lý
  addHandlerOpenSidebar(handler = () => {}) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.sidebar__btn--show');
      if (!btn) return;
      handler();
      const findShow = document.querySelector('.show');
      if (findShow) findShow.classList.remove('show');
    });
  }

  addHandlerSearch(handler = () => {}) {
    const parentElement = this._parentElement;
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.search__btn--toggle');
      if (!btn) return;
      handler();
      const findShow = parentElement.querySelector('.show');
      if (findShow) findShow.classList.remove('show');
    });
  }

  addHandlerNavMoreMovie() {
    const markup = this._generateMarkupMovie();
    const parentElement = this._parentElement;
    let count = 1;
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.movie__btn--toggle');
      if (!btn) return;
      const navPopupMain = btn.nextElementSibling;
      const findShow = parentElement.querySelector('.show');

      if (!navPopupMain.classList.contains('show')) {
        if (findShow) findShow.classList.remove('show');
      }
      navPopupMain.classList.toggle('show');

      if (count == 1) {
        navPopupMain.innerHTML = '';
        navPopupMain.insertAdjacentHTML('afterbegin', markup);
        count--;
      }
    });
  }

  addHandlerNavMore() {
    const markup = this._generateMarkupMore();
    const parentElement = this._parentElement;
    let count = 1;
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.more__btn--toggle');
      if (!btn) return;
      const navPopupMain = btn.nextElementSibling;
      const findShow = parentElement.querySelector('.show');

      if (!navPopupMain.classList.contains('show')) {
        if (findShow) findShow.classList.remove('show');
      }
      navPopupMain.classList.toggle('show');

      if (count == 1) {
        navPopupMain.innerHTML = '';
        navPopupMain.insertAdjacentHTML('afterbegin', markup);
        count--;
      }
    });
  }

  addHandlerWishlish() {
    const markup = this._generateMarkupWishlist();
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.wishlist__btn--toggle');
      if (!btn) return;
      const navPopupMain = btn.nextElementSibling;
      const findShow = document.querySelector('.show');

      if (!navPopupMain.classList.contains('show')) {
        if (findShow) findShow.classList.remove('show');
      }
      navPopupMain.classList.toggle('show');

      navPopupMain.innerHTML = '';
      navPopupMain.insertAdjacentHTML('afterbegin', markup);
    });
  }

  addHandlerAccount() {
    const markup = this._generateMarkupAccount();
    let count = 1;
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.account__btn--toggle');
      if (!btn) return;
      const navPopupMain = btn.nextElementSibling;
      const findShow = document.querySelector('.show');

      if (!navPopupMain.classList.contains('show')) {
        if (findShow) findShow.classList.remove('show');
      }
      navPopupMain.classList.toggle('show');

      if (count == 1) {
        navPopupMain.innerHTML = '';
        navPopupMain.insertAdjacentHTML('afterbegin', markup);
        count--;
      }
    });
  }

  addHandlerRemoveShowMediaQuery() {
    const parentElement = this._parentElement;
    const mediaQuery = window.matchMedia(`(min-width: 992px)`);
    mediaQuery.addListener(handlerRemoveShow);

    function handlerRemoveShow(e) {
      if (!e.matches) {
        const findShow = parentElement.querySelector('.show');
        if (findShow) findShow.classList.remove('show');
      }
    }
    handlerRemoveShow(mediaQuery);
  }

  addHandlerRemoveShowScroll() {
    document.onscroll = () => {
      const findShow = this._parentElement.querySelector('.show');
      if (findShow) findShow.classList.remove('show');
    };
  }

  _generateMarkup() {
    return /*html */ `
      <div class="container">
        <nav class="nav">
          <ul class="nav__list">
            <li class="nav__item hide-lg">
              <button class="nav__btn sidebar__btn--show">
                <svg class="nav__icon">
                  <use href="${icons}#icon-menu"></use>
                </svg>
              </button>
            </li>

            <li class="nav__item">
              <a href="#" class="nav__logo">
                <img src="${logo}" alt="logo moviestore" />
              </a>
            </li>

            <li class="nav__item show-lg">
              <button class="nav__btn movie__btn--toggle">
                <span>Phim</span>
                <svg class="nav__icon--small">
                  <use href="${icons}#icon-caret"></use>
                </svg>
              </button>
              <div class="nav-popup__main"></div>
            </li>

            <div class="nav__item show-lg">
              <a href="#" class="nav__link">Trailer</a>
            </div>

            <div class="nav__item show-lg">
              <a href="#" class="nav__link">Tin tức</a>
            </div>

            <li class="nav__item show-lg">
              <button class="nav__btn more__btn--toggle">
                <span>Hơn Nữa</span>
                <svg class="nav__icon--small">
                  <use href="${icons}#icon-caret"></use>
                </svg>
              </button>
              <div class="nav-popup__main"></div>
            </li>
          </ul>

          <ul class="nav__list">
            <li class="nav__item show-sm">
              <button class="nav__btn wishlist__btn--toggle">
                <svg class="nav__icon">
                  <use href="${icons}#icon-bookmark"></use>
                </svg>
              </button>
              <div class="nav-popup__main"></div> 
            </li>

            <li class="nav__item">
              <button class="nav__btn account__btn--toggle">
                <svg class="nav__icon">
                  <use href="${icons}#icon-user"></use>
                </svg>
              </button>
              <div class="nav-popup__main"></div> 
            </li>

            <li class="nav__item">
              <button class="nav__btn search__btn--toggle">
                <svg class="nav__icon">
                  <use href="${icons}#icon-search"></use>
                </svg>
              </button>
            </li>

            <li class="nav__item hide">
              <button class="signIn__btn">Đăng nhập</button>
            </li>
          </ul>
        </nav>
      </div>
    `;
  }

  _generateMarkupMovie() {
    return /*html */ `
      <ul class="moreNav__popup">
        <li class="moreNav__item">
          <a href="#" class="moreNav__link">Phim Thịnh Hành</a>
        </li>

        <li class="moreNav__item">
          <a href="#" class="moreNav__link">Bảng Xếp Hạng</a>
        </li>

        <li class="moreNav__item">
          <a href="#" class="moreNav__link">Phim Sắp Phát Hành</a>
        </li>
      </ul>
    `;
  }

  _generateMarkupMore() {
    return /*html */ `
      <ul class="moreNav__popup">
        <li class="moreNav__item">
          <button class="moreNav__btn">Thể loại</button>
        </li>

        <li class="moreNav__item">
          <button class="moreNav__btn">Quốc gia</button>
        </li>

        <li class="moreNav__item">
          <button class="moreNav__btn">Năm Phát Hành</button>
        </li>

        <li class="moreNav__item">
          <a href="#" class="moreNav__link">Người Nổi Tiếng</a>
        </li>
      </ul>
    `;
  }

  _generateMarkupAccount() {
    return /*html */ `
      <div class="account__popup">
        <ul class="account__list">
          <div class="account__link">
            <div class="account__status"></div>
            <div class="account__info">
              <p>Hi, anhdai9966</p>
              <p>3200 xu</p>
            </div>
          </div>

          <li class="account__item">
            <a href="#" class="account__link">
              <svg class="account__icon">
                <use href="${icons}#icon-person"></use>
              </svg>
              <span>Tài khoản của tôi</span>
            </a>
          </li>

          <li class="account__item">
            <a href="#" class="account__link">
              <svg class="account__icon">
                <use href="${icons}#icon-film"></use>
              </svg>
              <span>Phim của tôi</span>
            </a>
          </li>

          <li class="account__item">
            <a href="#" class="account__link">
              <svg class="account__icon">
                <use href="${icons}#icon-bookmark"></use>
              </svg>
              <span>Danh sách mong muốn</span>
            </a>
          </li>

          <li class="account__item">
            <a href="#" class="account__link">
              <svg class="account__icon">
                <use href="${icons}#icon-history"></use>
              </svg>
              <span>Lịch sử đã xem</span>
            </a>
          </li>

          <li class="account__item">
            <a href="#" class="account__link">
              <svg class="account__icon">
                <use href="${icons}#icon-door-out"></use>
              </svg>
              <span>Đăng xuất</span>
            </a>
          </li>
        </ul>
      </div>
    `;
  }

  _generateMarkupWishlist() {
    return /*html */ `
      <div class="wishlist__popup">
        <p class="wishlist__title">
          <svg class="wishlist__icon">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
          <span>Danh sách yêu thích</span>
        </p>

        <div class="wrapper">
          <div class="wishlist__list">
            <div class="popupWishlist__card">
              <a href="#" class="card__link movie__poster">
                <img src="https://www.themoviedb.org/t/p/w500/xeg0UhMmzSalvyK7kvhTHcKXIf8.jpg" alt="movie" loading="lazy" />
              </a>
          
              <div class="wrapper">
                <a href="#" class="card__link">Thế giới khủng long</a>
                <p class="wrap">
                  <span class="">
                    <span class="movie__rate">7.0</span>
                    <svg class="star__icon">
                      <use href="${icons}#icon-star-fill"></use>
                    </svg>
                  </span>
                  <span class="movie__price">80.000 đ</span>
                </p>
              </div>
          
              <button class="card__btn card__btn--remove">
                <svg class="card__icon">
                  <use href="${icons}#icon-dismiss"></use>
                </svg>
              </button>
            </div>
      
            <div class="wishlist__empty">
              <svg class="wishlist__icon">
                <use href="${icons}#icon-list-empty"></use>
              </svg>
              <p class="wishlist__message">Oops!<br />Bạn hãy chọn phim yêu thích!</p>
            </div>
          </div>
        </div>

        <div class="wishlist__btn">
          <a href="#" class="view__link">Xem</a>
          <button class="buy__btn">Mua</button>
        </div>
      </div>
    `;
  }
}

export default new HeaderView();
