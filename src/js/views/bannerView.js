import View from './View.js';
import { pathPictureW220 } from '../helpers.js';

import icons from 'url:../../imgs/icons.svg';

class BannerView extends View {
  _parentElement = document.querySelector('.banner');

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    console.log(this._parentElement);
    console.log('run');
    return /*html */ `
      <div class="windows">
        <div class="view-3d">
          <div class="rotate">
            <div class="wrapper">
              <div class="animation">
                <div class="grid__wrapper">
                  <div class="card__grid">
                    ${this._data.map(this._generateMarkupPreview).join('')}
                  </div>

                  <div class="card__grid">
                    ${this._data.map(this._generateMarkupPreview).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="overlay"></div>

      <div class="container">
        <div class="content">
          <div class="title">
            <h1 class="banner__title">Xem phim không giới hạn và còn hơn thế nữa.</h1>
            <h3 class="banner__subtitle">Xem ở bất cứ đâu. Hủy bất cứ lúc nào.</h3>
          </div>

          <div class="form__wrapper">
            <h6 class="sign-up__title">Bạn đã sẵn sàng xem chưa? Nhập email của bạn để tạo hoặc bắt đầu lại với tư cách thành viên.</h6>
            <form class="sign-up">
              <label class="input__wrapper">
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="email__input"
                  maxlength="50"
                  onblur="blurPlaceholder()"
                  onfocus="focusPlaceholder()"
                />
                <label for="email" class="placeholder">Địa chỉ email</label>
              </label>

              <button class="sign-up__btn">
                <span>Bắt đầu</span>
                <svg class="right__icon">
                  <use href="../../imgs/icons.svg#icon-right"></use>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  _generateMarkupPreview(movie) {
    return /*html */ `
      <div class="banner-card__item">
        <a href="#${movie.id}" class="movie__link">
          <img src="${pathPictureW220(movie.posterPath)}" class="movie__poster" loading="lazy" alt="${movie.title}">
          <div class="card__overlay"></div>
          <h6 class="movie__title">${movie.title}</h6>
        </a>
      </div>
    `;
  }
}

export default new BannerView();