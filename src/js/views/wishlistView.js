import icons from 'url:../../imgs/icons.svg';

class WishlistView {
  _data;
  _parentElement = document.querySelector('.header__wishlist');

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  // render card movie
  addHandlerRenderBanner(data) {
    this._data = data;
    // lấy đánh dấu
    const markup = this._generateMarkup();
    // xóa nội dung hiện tại
    this._parentElement.innerHTML = '';
    // render nội dung mới
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupCard).join('');
  }

  _generateMarkupCard(movie) {
    return /*html */ `
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
                <use href="../../imgs/icons.svg#icon-star-fill"></use>
              </svg>
            </span>
            <span class="movie__price">80.000 đ</span>
          </p>
        </div>

        <button class="card__btn card__btn--remove">
          <svg class="card__icon">
            <use href="../../imgs/icons.svg#icon-dismiss"></use>
          </svg>
        </button>
      </div>
    `;
  }

  _generateMarkupEmpty() {
    return /*html */ `
      <div class="wishlist__empty hidden">
        <svg class="wishlist__icon">
          <use href="../../imgs/icons.svg#icon-list-empty"></use>
        </svg>
        <p class="wishlist__message">Oops!<br />Bạn hãy chọn phim yêu thích!</p>
      </div>
    `;
  }
}

export default new WishlistView();