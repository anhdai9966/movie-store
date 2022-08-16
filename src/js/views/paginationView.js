import icons from 'url:../../imgs/icons.svg'; // Parcel 2

class PaginationView {
  _data;
  _parentElement = document.querySelector('.pagination');
  _prefix;
  render(data, prefix) {
    this._data = data;
    this._prefix = prefix;

    const markup = this._generateMarkup();

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  _generateMarkup() {
    console.log(this._prefix)

    let curPage = this._data.page;
    console.log('🚀 ~ PaginationView ~ _generateMarkup ~ curPage', curPage)
    let numPages = this._data.totalPages;
    console.log('🚀 ~ PaginationView ~ _generateMarkup ~ numPages', numPages)

    // Page 1, và có những page khác
    if (+curPage === 1 && numPages > 1) {
      return /*html */`
        <li class="page__item shown-md active">
          <a class="page__link" href="./movie.html#${this._prefix}&page=${+curPage}">${+curPage}</a>
        </li>
        <li class="page__item shown-md">
          <a class="page__link" href="./movie.html#${this._prefix}&page=${+curPage + 1}">${+curPage + 1}</a>
        </li>
        <li class="page__item shown-md">
          <a class="page__link" href="./movie.html#${this._prefix}&page=${+curPage + 2}">${+curPage + 2}</a>
        </li>
        <li class="page__item shown-md disabled">
          <a class="page__link">...</a>
        </li>
        <li class="page__item shown-md">
          <a class="page__link page__link--next" href="./movie.html#${this._prefix}&page=${+curPage + 1}">
            <svg class="page__icon">
              <use href="${icons}#icon-right"></use>
            </svg>
          </a>
        </li>
        <li class="page__item hidden-md page__item-mobile">
          <a class="page__link page__link--lazy-loading" href="./movie.html#${this._prefix}&page=${+curPage + 1}">
            Xem thêm
            <svg class="page__icon">
              <use href="${icons}#icon-arrow-next"></use>
            </svg>
          </a>
        </li>
      `;
    }
    // Page 2, và có những page khác
    if (+curPage === 2 && numPages > 1) {
      return /*html */`
        <li class="page__item shown-md">
          <a class="page__link page__link--previous" href="./movie.html#${this._prefix}&page=${+curPage - 1}">
            <svg class="page__icon">
              <use href="${icons}#icon-left"></use>
            </svg>
          </a>
        </li>
        <li class="page__item shown-md ">
          <a class="page__link" href="./movie.html#${this._prefix}&page=${+curPage - 1}">${+curPage - 1}</a>
        </li>
        <li class="page__item shown-md active">
          <a class="page__link" href="./movie.html#${this._prefix}&page=${+curPage}">${+curPage}</a>
        </li>
        <li class="page__item shown-md">
          <a class="page__link" href="./movie.html#${this._prefix}&page=${+curPage + 1}">${+curPage + 1}</a>
        </li>
        <li class="page__item shown-md disabled">
          <a class="page__link">...</a>
        </li>
        <li class="page__item shown-md">
          <a class="page__link page__link--next" href="./movie.html#${this._prefix}&page=${+curPage + 1}">
            <svg class="page__icon">
              <use href="${icons}#icon-right"></use>
            </svg>
          </a>
        </li>
        <li class="page__item hidden-md page__item-mobile">
          <a class="page__link page__link--lazy-loading" href="./movie.html#${this._prefix}&page=${+curPage + 1}">
            Xem thêm
            <svg class="page__icon">
              <use href="${icons}#icon-arrow-next"></use>
            </svg>
          </a>
        </li>
      `;
    }

    // page gần cuối cuối
    if (+curPage === numPages - 1 && numPages > 1) {
      return /*html */`
        <li class="page__item shown-md">
          <a class="page__link page__link--previous" href="./movie.html#${this._prefix}&page=${+curPage - 1}">
            <svg class="page__icon">
              <use href="${icons}#icon-left"></use>
            </svg>
          </a>
        </li>
        <li class="page__item shown-md disabled">
          <a class="page__link">...</a>
        </li>
        <li class="page__item shown-md">
          <a class="page__link" href="./movie.html#${this._prefix}&page=${+curPage - 1}">${+curPage - 1}</a>
        </li>
        <li class="page__item shown-md active">
          <a class="page__link" href="./movie.html#${this._prefix}&page=${+curPage}">${+curPage}</a>
        </li>
        <li class="page__item shown-md">
          <a class="page__link" href="./movie.html#${this._prefix}&page=${+curPage + 1}">${+curPage + 1}</a>
        </li>
        <li class="page__item hidden-md page__item-mobile">
          <a class="page__link page__link--lazy-loading" href="./movie.html#${this._prefix}&page=${+curPage}">
            Trang cuối
            <svg class="page__icon">
              <use href="${icons}#icon-arrow-next"></use>
            </svg>
          </a>
        </li>
      `;
    }

    // page cuối
    if (+curPage === numPages && numPages > 1) {
      return /*html */`
        <li class="page__item shown-md">
          <a class="page__link page__link--previous" href="./movie.html#${this._prefix}&page=${+curPage - 1}">
            <svg class="page__icon">
              <use href="${icons}#icon-left"></use>
            </svg>
          </a>
        </li>
        <li class="page__item shown-md disabled">
          <a class="page__link">...</a>
        </li>
        <li class="page__item shown-md">
          <a class="page__link" href="./movie.html#${this._prefix}&page=${+curPage - 2}">${+curPage - 2}</a>
        </li>
        <li class="page__item shown-md">
          <a class="page__link" href="./movie.html#${this._prefix}&page=${+curPage - 1}">${+curPage - 1}</a>
        </li>
        <li class="page__item shown-md active">
          <a class="page__link" href="./movie.html#${this._prefix}&page=${+curPage}">${+curPage}</a>
        </li>
        <li class="page__item hidden-md page__item-mobile">
          <a class="page__link page__link--lazy-loading" href="./movie.html#${this._prefix}&page=${+curPage}">
            Trang cuối
            <svg class="page__icon">
              <use href="${icons}#icon-arrow-next"></use>
            </svg>
          </a>
        </li>
      `;
    }

    // những page còn lại
    if (+curPage < numPages) {
      return /*html */`
        <li class="page__item shown-md">
          <a class="page__link page__link--previous" href="./movie.html#${this._prefix}&page=${+curPage - 1}">
            <svg class="page__icon">
              <use href="${icons}#icon-left"></use>
            </svg>
          </a>
        </li>
        <li class="page__item shown-md disabled">
          <a class="page__link">...</a>
        </li>
        <li class="page__item shown-md">
          <a class="page__link" href="./movie.html#${this._prefix}&page=${+curPage - 1}">${+curPage - 1}</a>
        </li>
        <li class="page__item shown-md active">
          <a class="page__link" href="./movie.html#${this._prefix}&page=${+curPage}">${+curPage}</a>
        </li>
        <li class="page__item shown-md">
          <a class="page__link" href="./movie.html#${this._prefix}&page=${+curPage + 1}">${+curPage + 1}</a>
        </li>
        <li class="page__item shown-md disabled">
          <a class="page__link">...</a>
        </li>
        <li class="page__item shown-md">
          <a class="page__link page__link--next" href="./movie.html#${this._prefix}&page=${+curPage + 1}">
            <svg class="page__icon">
              <use href="${icons}#icon-right"></use>
            </svg>
          </a>
        </li>
        <li class="page__item hidden-md page__item-mobile">
          <a class="page__link page__link--lazy-loading" href="./movie.html#${this._prefix}&page=${+curPage + 1}">
            Xem thêm
            <svg class="page__icon">
              <use href="${icons}#icon-arrow-next"></use>
            </svg>
          </a>
        </li>
      `;
    }

    // Page 1, không có page nào
    return /*html */`
      <li class="page__item shown-md active">
        <a class="page__link">1</a>
      </li>
      <li class="page__item hidden-md page__item-mobile">
        <a class="page__link page__link--lazy-loading">
          Hết trang
          <svg class="page__icon">
            <use href="${icons}#icon-arrow-next"></use>
          </svg>
        </a>
      </li>
    `;
  }
}

export default new PaginationView();
