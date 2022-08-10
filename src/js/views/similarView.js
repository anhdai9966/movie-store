import View from './View.js';
import { pathPictureW220 } from '../helpers.js';

import icons from 'url:../../imgs/icons.svg';

class SimilarView extends View {
  _parentElement = document.getElementById('similar');
  _errorMessage = 'Liên kết có thể bị hỏng hoặc trang này có thể đã bị gỡ.';

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(recommendations) {
    return /*html*/ `
      <div class="card__item">
        <a href="#${recommendations.id}" class="movie__link">
          <img src=${pathPictureW220(recommendations.posterPath)} alt="movie" loading="lazy" class="movie__poster">
        </a>

        <div class="movie__info">
          <a href="#${recommendations.id}" class="movie__title">${recommendations.title}</a>
          <p>Phim Gia Đình, Phim Hoạt Hình</p>
          <p class="movie__rate">
            <span>${recommendations.voteAverage.toFixed(1)}</span>
            <svg class="star__icon">
              <use href='${icons}#icon-star-fill'></use>
            </svg>
            <span>80.000 đ</span>
          </p>
        </div>
      </div>
    `;
  }
}

export default new SimilarView();

/**
 * ngăn chặn hành động mặc định 
 * nếu không thì trang sẽ tải lại
 * e.preventDefault();
 */