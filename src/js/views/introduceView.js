import { pathPictureW220 } from '../shared/helpers.js';

class IntroduceView {
  _parentElement = document.querySelector('.introduce');
  _data; 

  _giftList = this._parentElement.querySelector('.gift__list');
  _cardList = this._parentElement.querySelector('.card__list');

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  // dữ liệu ở đây là cố định
  renderMovie6(data) {
    // 
    this._data = data;
    // lấy đánh dấu
    const markup = this._generateMarkupMovie6();
    // xóa nội dung hiện tại
    this._cardList.innerHTML = '';
    // render nội dung mới
    this._cardList.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkupMovie6() {
    return this._data.map(this._generateMarkupCard).join('');
  }

  // dữ liệu ở đây là cố định
  renderMovie2(data) {
    // 
    this._data = data;
    // lấy đánh dấu
    const markup = this._generateMarkupMovie2();
    // xóa nội dung hiện tại
    this._giftList.innerHTML = '';
    // render nội dung mới
    this._giftList.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkupMovie2() {
    return this._data.map(this._generateMarkupCard).join('');
  }

  _generateMarkupCard(movie) {
    return /*html */ `
      <div class="banner-card__item">
        <a href="#${movie.id}" class="movie__link">
          <img
            src="${pathPictureW220(movie.posterPath)}"
            class="movie__poster"
            loading="lazy"
            title="${movie.title}"
          />
          <div class="card__overlay"></div>
          <h6 class="movie__title">${movie.title}</h6>
        </a>
      </div>
    `;
  }
}

export default new IntroduceView();