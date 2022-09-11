import View from '../View.js';
import { calcRuntime, pathPictureW1920, pathPictureW220, getYear, getVoteAverage, getCertification, numberWithCommas } from '../../shared/helpers';

import icons from 'url:../../images/icons.svg';

class BannerView extends View {
  _parentElement = document.querySelector('.banner');

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerBookmark(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.banner__btn-wishlist');
      if (!btn) return ;
      const id = btn.dataset.id;
      handler(id);
    })
  }
  addHandlerBuy(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.banner__btn--buy');
      if (!btn) return ;
      handler();
    })
  }
  addHandlerRent(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.banner__btn--rent');
      if (!btn) return ;
      handler();
    })
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

          <div class="banner__wrap">
            <button data-title="${this._data.originalTitle}" class="banner__btn banner__btn-trailer card__btn-trailer--open hidden-miw-lg">
              <svg class="banner__icon">
                <use href='${icons}#icon-play'></use>
              </svg>

              <span>Đoạn giới thiệu</span>
            </button>

            <div class="banner__wrap-1">
              <a href=".detail.html#${this._data.id}" class="banner__poster hidden-maw-lg">
                <img src="${pathPictureW220(this._data.posterPath)}" alt="${this._data.title}" loading="lazy">
              </a>
              
              <div class="banner__wrap-sub">
                <h1 class="banner__title">${this._data.title}</h1>
  
                <p class="banner__info">
                <span>${this._data.genres[0].name}</span> • 
                <span>${getYear(this._data.releaseDate)}</span> • 
                <span>${calcRuntime(this._data.runtime)}</span>
                </p>
              </div>
            </div>

            <div class="banner__wrap-2">
              <div class="banner__wrap-sub banner__wrap-sub-center">
                <p>
                  <span>${getVoteAverage(this._data.voteAverage)}</span>

                  <svg class="star__icon">
                    <use href='${icons}#icon-star-fill'></use>
                  </svg>
                </p>

                <p>${this._data.voteCount} đánh giá</p>
              </div>
  
              <div class="vr"></div>
  
              <div class="banner__wrap-sub banner__wrap-sub-center">
                <p class="certification" title="${getCertification(this._certification) ? getCertification(this._certification).meaning : ''}">${
      getCertification(this._certification) ? getCertification(this._certification).certification : 'Chưa phân loại'
    }</p>

                <p>Mức phân loại</p>
              </div>
            </div>
          </div>

          <div class="banner__wrap-3">
            <div class="banner__wrap-1 banner__wrap-1-btn ${this._data.purchased ? ' hidden' : ''}">
              <button class="btn-primary banner__btn banner__btn--buy">Mua: ${numberWithCommas(this._data.price.buy)} đ</button>
  
              <button class="btn-secondary banner__btn banner__btn--rent">Thuê: ${numberWithCommas(this._data.price.rent)} đ</button>

              <button data-id="${this._data.id}" class="banner__btn banner__btn-wishlist">
                <svg class="banner__icon">
                  <use href='${icons}#icon-bookmark${this._data.bookmarked ? '-fill' : ''}'></use>
                </svg>
  
                <span>Thêm vào danh sách yêu thích</span>
              </button>
            </div>
            <div class="banner__wrap-1 banner__wrap-1-btn${this._data.purchased ? '' : ' hidden'}">
              <button data-title="${this._data.originalTitle}" class="btn-primary banner__btn banner__btn--buy card__btn-trailer--open">Xem ngay</button>
              
            </div>
          
            <div class="banner__wrap-3">
              <button data-title="${this._data.originalTitle}" class="banner__btn banner__btn-trailer card__btn-trailer--open hidden-maw-lg">
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
}

export default new BannerView();
