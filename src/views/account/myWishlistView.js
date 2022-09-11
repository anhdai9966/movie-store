import View from '../View.js';

import { pathPictureW220, pathPictureW533, getGenresId, getYear, getVoteAverage, numberWithCommas } from '../../shared/helpers.js';

import icons from 'url:../../images/icons.svg';

class MyMovieView extends View {
  _grandParentElement = document.querySelector('.account__wishlist');
  _parentElement = this._grandParentElement.querySelector('.account__list');

  shown() {
    this._grandParentElement.classList.remove('hidden');
  }
  hidden() {
    this._grandParentElement.classList.add('hidden');
  }

  _generateMarkup() {
    if (!this._data.length) return `<h5>Danh sách yêu thích trống</h5>`
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(movie) {
    return /*html */ `
      <div class="account__item">
        <input type="checkbox" name="checkbox" id="checkbox" class="account__checkbox">
    
        <div class="account__main">
          <div class="account__card">
            <label for="checkbox" class="backdrop__img">
              <img src="${pathPictureW533(movie.backdropPath)}"
              alt="${movie.title}" loading="lazy" >
            </label>
        
            <div class="">
              <a href="./detail.html#${movie.id}" class="">
                <h6 class="h6">${movie.title}</h6>
              </a>
          
              <p>${movie.genreIds? getGenresId(movie.genreIds[0]) : movie.genres[0].name}</p>
          
              <p class="">
                <span>${getVoteAverage(movie.voteAverage)}</span>
                <svg class="star__icon">
                  <use href='${icons}#icon-star-fill'></use>
                </svg>
              </p>
            </div>
          </div>
      
          <div class="account__btn">
            <button class="btn-secondary rent__btn">Thuê: ${numberWithCommas(movie.price.rent)} đ</button>
            <button class="btn-primary buy__btn">Mua: ${numberWithCommas(movie.price.buy)} đ</button>
          </div>
        </div>
    
        <div class="btn account__btn2">
          <button class="icon__btn remove__btn">
            <svg class="account__icon">
              <use href='${icons}#icon-xmark'></use>
            </svg>
          </button>
        </div>
      </div>
    `;
  }
}

export default new MyMovieView();