import { pathPictureW220, pathPictureW533, getVoteAverage, getGenresId } from '../shared/helpers.js';

import icons from 'url:../../imgs/icons.svg';

class DetailSimilarView {
  _data;
  _parentElement = document.querySelector('.detail__similar_list');

  render(data) {
    // 
    this._data = data;
    // lấy đánh dấu
    const markup = this._generateMarkup();
    // xóa nội dung hiện tại
    this._parentElement.innerHTML = '';
    // render nội dung mới
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(recommendations) {
    return /*html*/ `
      <div class="card__item">
        <div class="card__image">
          <a href="#${recommendations.id}" class="card__poster-link">
            <img
              src="${pathPictureW220(recommendations.posterPath)}"
              alt="${recommendations.title}"
              loading="lazy"
              class="card__poster"
            />
          </a>

          <a href="#${recommendations.id}" class="card__backdrop-link">
            <img
              src="${pathPictureW533(recommendations.backdropPath)}"
              alt="${recommendations.title}"
              loading="lazy"
              class="card__backdrop"
            />
          </a>

          <a href="#" class="card__link-btn card__link--trailer">
            <svg class="card__icon">
              <use href="${icons}#icon-play-circle"></use>
            </svg>
          </a>
        </div>

        <div class="card__info">
          <a href="#${recommendations.id}" class="card__link">
            <h6 class="card__title">${recommendations.title}</h6>
          </a>

          <p class="card__hover-info2">${recommendations.genreIds.map(id => getGenresId(id)).join(', ')}</p>

          <p class="card__title">
            <span>${getVoteAverage(recommendations.voteAverage)}</span>

            <svg class="star__icon">
              <use href="${icons}#icon-star-fill"></use>
            </svg>

            <span>80.000 đ</span>
          </p>
        </div>
      </div>
    `;
  }
}

export default new DetailSimilarView();