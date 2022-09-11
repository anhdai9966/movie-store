import View from '../View.js';
import { pathPictureW138 } from '../../shared/helpers.js';
import { BREAKPOINTS_MIN_WIDTH_4, BREAKPOINTS_MAX_WIDTH_4 } from '../../shared/config.js';

import icons from 'url:../../images/icons.svg';

class DetailCastView extends View {
  _grandparentElement = document.querySelector('.detail__cast')
  _parentElement = document.querySelector('.cast__list');

  constructor() {
    super();
  }
  
  addHandlerMediaQuery4(handler) {
    BREAKPOINTS_MIN_WIDTH_4.forEach(bp => this._addHandlerMediaQueryMinWidth(bp, handler))
    BREAKPOINTS_MAX_WIDTH_4.forEach(bp => this._addHandlerMediaQueryMaxWidth(bp, handler))
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

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(cast) {
    return /*html*/ `
      <div class="cast__item">
        <a href="#" class="cast__poster">
          <img
            src="${pathPictureW138(cast.profilePath)}"
            alt="${cast.name}"
            loading="lazy"
          />
        </a>

        <a href="#" class="cast__name"><h6>${cast.name}</h6></a>

        <p class="cast__character">${cast.character}</p>
      </div>
    `;
  }
}

export default new DetailCastView();