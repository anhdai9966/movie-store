import View from './View.js';

import logo from 'url:../../imgs/logo.png';
import icons from 'url:../../imgs/icons.svg';

class SidebarView extends View {
  _parentElement = document.querySelector('.sidebar__main');

  constructor() {
    super();
  }

  // khi click vào overlay (parentEl) thì xử lý
  addHandlerCloseSidebarClickOverlay() {
    this._parentElement.onclick = () => {
      const sidebar = this._parentElement.firstElementChild;

      sidebar.style.left = '-280px';
      
      // chờ .2s để nhìn được hiệu ứng transition
      setTimeout(() => {
        this._parentElement.style.opacity = '0';
      }, 200);

      // chờ .2s để nhìn được hiệu ứng transition
      setTimeout(() => {
        this._parentElement.style.display = 'none';
      }, 200);

      // trả body có thể cuộn
      document.body.style.overflow = 'auto';
    }
  }

  // khi click vào nút menu thì xử lý
  addHandlerCloseSidebar() {
    const parentElement = this._parentElement;
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.sidebar__btn--hide');
      if (!btn) return ;

      const sidebar = parentElement.firstElementChild;

      sidebar.style.left = '-280px';
      
      // chờ .2s để nhìn được hiệu ứng transition
      setTimeout(() => {
        parentElement.style.opacity = '0';
      }, 200);

      // chờ .2s để nhìn được hiệu ứng transition
      setTimeout(() => {
        parentElement.style.display = 'none';
      }, 200);

      // trả body có thể cuộn
      document.body.style.overflow = 'auto';
    }, true)
  }

  // khi thay đổi khích thước màn hình thì xử
  addHandlerCloseSidebarMediaQuery() {
    const parentElement = this._parentElement;
    const sidebarElement = parentElement.firstElementChild;
    // Tạo điểm kích thức cửa sổ rộng ít nhất 992px
    const mediaQuery = window.matchMedia(`(min-width: 992px)`);
    // đăng ký trình nghe sự kiện
    mediaQuery.addListener(handlerWidthChange);

    function handlerWidthChange(e) {
      // const parentElement = sidebar.parentElement;
      // kiểm tra nếu kích thước đúng
      if (e.matches) {
        // trả lại giá trị ban đầu
        sidebarElement.style.left = '-280px';
        
        // chờ .2s để nhìn được hiệu ứng transition
        setTimeout(() => {
          parentElement.style.opacity = '0';
        }, 200);

        // chờ .2s để nhìn được hiệu ứng transition
        setTimeout(() => {
          parentElement.style.display = 'none';
        }, 200);

        // trả body có thể cuộn
        document.body.style.overflow = 'auto';
      }
    }

    // khởi chạy hàm
    handlerWidthChange(mediaQuery);
  }

  // xử lý open
  addHandlerOpenTransition() {
    const sidebar = this._parentElement.firstElementChild;
    this._parentElement.style.display = 'block';
    
    // chờ để nhìn được hiệu ứng transition
    setTimeout(() => {
      this._parentElement.style.opacity = 1;
      sidebar.style.left = 0;
    }, 10);

    // ngăn body cuộn
    // window.onscroll = () => window.scroll(0, 0);
    document.body.style.overflow = 'hidden';
  }
  
  _generateMarkup() {
    return /*html*/ `
      <div class="sidebar">
        <div class="sidebar__link">
          <button class="sidebar__btn--hide">
            <svg class="sidebar__icon">
              <use href="${icons}#icon-menu"></use>
            </svg>
          </button>

          <a href="#" class="sidebar__logo">
            <img src="${logo}" alt="logo moviestore"/>
          </a>
        </div>

        <ul class="sidebar__list">
          <li class="sidebar__item">
            <a href="#" class="sidebar__link">
              <svg class="sidebar__icon">
                <use href="${icons}#icon-home"></use>
              </svg>
              <span>Trang chủ</span>
            </a>
          </li>

          <li class="sidebar__item">
            <a href="#" class="sidebar__link">
              <svg class="sidebar__icon">
                <use href="${icons}#icon-movie-new"></use>
              </svg>
              <span>Phim Mới</span>
            </a>
          </li>

          <li class="sidebar__item">
            <button class="sidebar__btn category__btn--show">
              <svg class="sidebar__icon">
                <use href="${icons}#icon-select-all"></use>
              </svg>
              <span>Thể loại</span>
            </button>
          </li>

          <li class="sidebar__item">
            <button class="sidebar__btn nation__btn--show">
              <svg class="sidebar__icon">
                <use href="${icons}#icon-globe"></use>
              </svg>
              <span>Quốc gia</span>
            </button>
          </li>

          <li class="sidebar__item">
            <button class="sidebar__btn release-year__btn--show">
              <svg class="sidebar__icon">
                <use href="${icons}#icon-calendar"></use>
              </svg>
              <span>Năm phát hành</span>
            </button>
          </li>

          <li class="sidebar__item">
            <a href="#" class="sidebar__link">
              <svg class="sidebar__icon">
                <use href="${icons}#icon-flame-fill"></use>
              </svg>
              <span>Phim thịnh hành</span>
            </a>
          </li>

          <li class="sidebar__item">
            <a href="#" class="sidebar__link">
              <svg class="sidebar__icon">
                <use href="${icons}#icon-list"></use>
              </svg>
              <span>Bảng xếp hạng</span>
            </a>
          </li>

          <li class="sidebar__item">
            <a href="#" class="sidebar__link">
              <svg class="sidebar__icon">
                <use href="${icons}#icon-calendar-time"></use>
              </svg>
              <span>Phim sắp phát hành</span>
            </a>
          </li>

          <li class="sidebar__item">
            <a href="#" class="sidebar__link">
              <svg class="sidebar__icon">
                <use href="${icons}#icon-news"></use>
              </svg>
              <span>Tin tức</span>
            </a>
          </li>

          <li class="sidebar__item">
            <a href="#" class="sidebar__link">
              <svg class="sidebar__icon">
                <use href="${icons}#icon-user"></use>
              </svg>
              <span>Người nổi tiếng</span>
            </a>
          </li>

          <li class="sidebar__item">
            <a href="#" class="sidebar__link">
              <svg class="sidebar__icon">
                <use href="${icons}#icon-youtube"></use>
              </svg>
              <span>Trailer mới</span>
            </a>
          </li>
        </ul>
      </div>
    `;
  }
}

export default new SidebarView();