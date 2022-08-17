import { calcRuntime, pathPictureW1920, pathPictureW220, pathPictureW600, translateVietnamese, getYear, getVoteAverage, getCertification } from '../shared/helpers';

import icons from 'url:../../imgs/icons.svg';

class DetailBanerView {
  _parentElement = document.querySelector('.banner__detail');
  _errorMessage = 'Liên kết có thể bị hỏng hoặc trang này có thể đã bị gỡ.';
  _data;
  _certification;

  render(data, certification) {
    // 
    this._data = data;
    this._certification = certification;
    // lấy đánh dấu
    const markup = this._generateMarkup();
    // xóa nội dung hiện tại
    this._parentElement.innerHTML = '';
    // render nội dung mới
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerClickTrailer(handler) {
    document.addEventListener('click', (e) => {
      const trailerBtn = e.target.closest('.banner__btn--trailer');
      if(!trailerBtn) return ;
      e.preventDefault();
      const title = trailerBtn.dataset.title
      handler(title);
    })
  }

  renderSpinner() {
    const markup = /*html*/ `
    <div class="spinner__render">
    <ul class="spinner">
      <li class="seen"></li>
      <li class="seen"></li>
      <li class="seen"></li>
      <li class="seen"></li>
      <li class="seen"></li>
      <li class="seen"></li>
      <li class="seen"></li>
      <li class="seen"></li>
      <li class="seen"></li>
      <li class="seen"></li>
    </ul>
  </div>
    `;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // HyperText Markup Language
  _generateMarkup() {
    return /*html*/ `
      <div class="container">
        <div class="banner__wrapper">
          <div class="banner__backdrop">
            <img src=${pathPictureW1920(this._data.backdropPath)} alt="${this._data.title}" loading="lazy" />
            <div class="banner__overlay"></div>
          </div>

          <div class="banner__content">
            <button data-title="${this._data.originalTitle}" class="banner__btn--trailer btn__top hidden-lg">
              <svg class="banner__icon">
                <use href='${icons}#icon-play'></use>
              </svg>

              <span>Đoạn giới thiệu</span>
            </button>

            <div class="banner__content_1">
              <a href="#" class="banner__poster shown-lg">
                <img src=${pathPictureW220(this._data.posterPath)} alt="poster" loading="lazy">
              </a>
              
              <div class="banner__text">
                <h1 class="banner__title">${this._data.title}</h1>

                <p class="banner__info">
                  <span>${this._data.genres[0].name}</span> • 
                  <span>${getYear(this._data.releaseDate)}</span> • 
                  <span>${calcRuntime(this._data.runtime)}</span>
                </p>
              </div>
            </div>

            <div class="banner__content_2">
              <div class="banner__wrap">
                <p class="banner__rate">
                  <span>${getVoteAverage(this._data.voteAverage)}</span>

                  <svg class="star__icon">
                    <use href='${icons}#icon-star-fill'></use>
                  </svg>
                </p>

                <p>${this._data.voteCount} đánh giá</p>
              </div>

              <div class="vertical__rule"></div>

              <div class="banner__wrap">
                <p class="certification" title="${getCertification(this._certification)? getCertification(this._certification).meaning : ''}">${getCertification(this._certification)? getCertification(this._certification).certification : 'Chưa phân loại'}</p>

                <p>Mức phân loại</p>
              </div>
            </div>
          </div>

          <div class="banner__btn">
            <div class="banner__btn_1">
              <button class="banner__btn--buy">Mua: 210.000 đ</button>

              <button class="banner__btn--rent">Thuê: 80.000 đ</button>
            </div>
          
            <div class="banner__btn_2">
              <button class="banner__btn--wishlist">
                <svg class="banner__icon">
                  <use href='${icons}#icon-bookmark'></use>
                </svg>

                <span>Thêm vào danh sách yêu thích</span>
              </button>

              <button data-title="${this._data.originalTitle}" class="banner__btn--trailer">
                <svg class="banner__icon">
                  <use href='${icons}#icon-play'></use>
                </svg>

                <span>Đoạn giới thiệu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

export default new DetailBanerView();