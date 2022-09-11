import View from '../View.js';
import { apiPro } from '../../shared/config.js';

import icons from 'url:../../images/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination__list');

  _generateMarkup() {
    // hash #now_playing&page=2&with_genres=28
    const hash = window.location.hash.slice(1).split('&');
    // lấy các giá trị hash
    const pro = hash[0]? hash[0] : apiPro.nowPlaying;
    const subPro = hash[2]? `&${hash[2]}` : '';

    let curPage = this._data.page;
    let numPages = this._data.totalPages;

    // Page 1, và có những page khác
    if (+curPage === 1 && numPages > 1) {
      return /*html */`
        <li class="pagination__item hidden-maw-md pagination__item-active">
          <a class="pagination__link" href="./movie.html#${pro}&page=${curPage}${subPro}">1</a>
        </li>
        <li class="pagination__item hidden-maw-md">
          <a class="pagination__link pagination__link--next" href="./movie.html#${pro}&page=${curPage + 1}${subPro}">
            <svg class="pagination__icon">
              <use href="${icons}#icon-right"></use>
            </svg>
          </a>
        </li>
        <li class="pagination__item hidden-miw-md pagination__item-mobile">
          <a class="pagination__link pagination__link-mobile--next" href="./movie.html#${pro}&page=${curPage + 1}${subPro}">
            Xem tiếp
            <svg class="pagination__icon">
              <use href="${icons}#icon-arrow-next"></use>
            </svg>
          </a>
        </li>
      `;
    }

    // page cuối
    if (+curPage === numPages && numPages > 1) {
      return /*html */`
        <li class="pagination__item hidden-maw-md">
          <a class="pagination__link pagination__link--previous" href="./movie.html#${pro}&page=${curPage - 1}${subPro}">
            <svg class="pagination__icon">
              <use href="${icons}#icon-left"></use>
            </svg>
          </a>
        </li>
        <li class="pagination__item hidden-maw-md pagination__item-active">
          <a class="pagination__link" href="./movie.html#${pro}&page=${curPage + 1}${subPro}">${curPage}</a>
        </li>
        <li class="pagination__item hidden-miw-md pagination__item-mobile disabled">
          <p class="pagination__link pagination__link-mobile--next disabled">
            Hết
            <svg class="pagination__icon">
              <use href="${icons}#icon-arrow-next"></use>
            </svg>
          </p>
        </li>
      `;
    }

    // những page còn lại
    if (+curPage < numPages) {
      return /*html */`
        <li class="pagination__item hidden-maw-md">
          <a class="pagination__link pagination__link--previous" href="./movie.html#${pro}&page=${curPage - 1}${subPro}">
            <svg class="pagination__icon">
              <use href="${icons}#icon-left"></use>
            </svg>
          </a>
        </li>
        <li class="pagination__item hidden-maw-md pagination__item-active">
          <a class="pagination__link" href="./movie.html#${pro}&page=${curPage}${subPro}">${curPage}</a>
        </li>
        <li class="pagination__item hidden-maw-md">
          <a class="pagination__link pagination__link--next" href="./movie.html#${pro}&page=${curPage + 1}${subPro}">
            <svg class="pagination__icon">
              <use href="${icons}#icon-right"></use>
            </svg>
          </a>
        </li>
        <li class="pagination__item hidden-miw-md pagination__item-mobile">
          <a class="pagination__link pagination__link-mobile--next" href="./movie.html#${pro}&page=${curPage + 1}${subPro}">
            Xem tiếp
            <svg class="pagination__icon">
              <use href="${icons}#icon-arrow-next"></use>
            </svg>
          </a>
        </li>
      `;
    }

    // Page 1, không có page nào
    return /*html */`
      <li class="pagination__item hidden-maw-md">
        <p class="pagination__link">1</p>
      </li>
      <li class="pagination__item hidden-miw-md pagination__item-mobile disabled">
        <p class="pagination__link pagination__link-mobile--next disabled">
          Hết
          <svg class="pagination__icon">
            <use href="${icons}#icon-arrow-next"></use>
          </svg>
        </p>
      </li>
    `;
  }
}

export default new PaginationView();
