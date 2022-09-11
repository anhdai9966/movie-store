import View from '../View.js';
import { BREAKPOINTS_MAX_WIDTH_1, BREAKPOINTS_MIN_WIDTH_1, BREAKPOINTS_MAX_WIDTH_2, BREAKPOINTS_MIN_WIDTH_2, BREAKPOINTS_MAX_WIDTH_3, BREAKPOINTS_MIN_WIDTH_3 } from '../../shared/config.js';

import icons from 'url:../../images/icons.svg';

export default class HomeView extends View {
  _dataBtn;

  constructor() {
    super();
  }

  addHandlerRender(handler) {
    window.addEventListener('load', () => {
      this.gototop();

      handler();
    });
  }

  gototop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  addHandlerMediaQuery1(handler) {
    BREAKPOINTS_MIN_WIDTH_1.forEach(bp => this._addHandlerMediaQueryMinWidth(bp, handler))
    BREAKPOINTS_MAX_WIDTH_1.forEach(bp => this._addHandlerMediaQueryMaxWidth(bp, handler))
  }
  addHandlerMediaQuery2(handler) {
    BREAKPOINTS_MIN_WIDTH_2.forEach(bp => this._addHandlerMediaQueryMinWidth(bp, handler))
    BREAKPOINTS_MAX_WIDTH_2.forEach(bp => this._addHandlerMediaQueryMaxWidth(bp, handler))
  }
  addHandlerMediaQuery3(handler) {
    BREAKPOINTS_MIN_WIDTH_3.forEach(bp => this._addHandlerMediaQueryMinWidth(bp, handler))
    BREAKPOINTS_MAX_WIDTH_3.forEach(bp => this._addHandlerMediaQueryMaxWidth(bp, handler))
  }

  // thêm xử lý khi thay đổi kích thước màn hình
  _addHandlerMediaQueryMinWidth(breakpoint, handler) {
    // Tạo điểm cuối kích thức cửa sổ rộng ít nhất minWidth
    const mq = window.matchMedia(`(min-width: ${breakpoint.width}px)`);
    // đăng ký với trình nghe sự kiện
    mq.addListener(e => {
      // nếu lớn hơn minWidth thì xử lý
      if (e.matches) {
        handler(breakpoint.item);
      }
    });
  };

  // thêm xử lý khi thay đổi kích thước màn hình
  _addHandlerMediaQueryMaxWidth(breakpoint, handler) {
    // Tạo điểm cuối kích thức cửa sổ rộng ít nhất minWidth
    const mq = window.matchMedia(`(max-width: ${breakpoint.width}px)`);
    // đăng ký với trình nghe sự kiện
    mq.addListener(e => {
      // nếu lớn hơn minWidth thì xử lý
      if (e.matches) {
        handler(breakpoint.item);
      }
    });
  };

  // Xử lý khi click control
  addHandlerBtnControl(handler) {
    this._grandparentElement.addEventListener('click', (e) => {
      const btn = e.target.closest('.home__btn');
      if (!btn) return ;
      // lấy chỉ số page trong nút đã render
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    })
  }

  // render dữ liệu btn
  renderBtnControl(data) {
    this._dataBtn = data;
    const markup = this._generateMarkupBtnControl();

    this._grandparentElement.querySelector('.home__btn-control').innerHTML = '';
    this._grandparentElement.querySelector('.home__btn-control').insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkupBtnControl() {
    const curPage = this._dataBtn.page;
    const numPages = Math.floor(
      this._dataBtn.results.length / this._dataBtn.resultsPerPage
    );

    // Page 1, và những page khác
    if (curPage === 1 && numPages > 1) {
      return /*html*/`
        <button data-goto="${curPage + 1}" class="btn__right home__btn home__btn--right">
          <svg class="btn__icon">
            <use href="${icons}#icon-right-circle"></use>
          </svg>
        </button>
      `;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return /*html*/`
        <button data-goto="${curPage - 1}" class="btn__left home__btn home__btn--left">
          <svg class="btn__icon">
            <use href="${icons}#icon-left-circle"></use>
          </svg>
        </button>
      `;
    }

    // có những page khác
    if (curPage < numPages) {
      return /*html*/`
        <button data-goto="${curPage - 1}" class="btn__left home__btn home__btn--left">
          <svg class="btn__icon">
            <use href="${icons}#icon-left-circle"></use>
          </svg>
        </button>

        <button data-goto="${curPage + 1}" class="btn__right home__btn home__btn--right">
          <svg class="btn__icon">
            <use href="${icons}#icon-right-circle"></use>
          </svg>
        </button>
      `;
    }

    // Page 1, không có page nào
    return '';
  }
}