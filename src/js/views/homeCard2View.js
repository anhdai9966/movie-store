import homeView from './homeView';

import { pathPictureW220, pathPictureW533, getGenresId, getYear, getVoteAverage } from '../shared/helpers.js';

import icons from 'url:../../imgs/icons.svg';

class HomeCard2View extends homeView {
  _parentElement = document.querySelector('.cardHome2');
  _cardListElement = this._parentElement.querySelector('.card__list');
  _leftBtn = this._parentElement.querySelector('.left__btn');
  _rightBtn = this._parentElement.querySelector('.right__btn');

  constructor() {
    super();
  }

  //  xử lý khi dom đã được tải xong
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  render2Card(data) {
    this._data = data;

    let markup = this._generateMarkup2();
    this._cardListElement.innerHTML = '';
    // render nội dung mới
    this._cardListElement.insertAdjacentHTML('afterbegin', markup);
    // khi render ra thì thêm sự kiện
    this._addHandlerClickControlRight2();
    this._addHandlerClickControlLeft();
  }

  // Xử lý khi click phải
  _addHandlerClickControlRight2() {
    let translateX = 0;
    this._rightBtn.addEventListener('click', () => {
      // lấy độ dài card
      const cardWidth = this._cardListElement.firstElementChild.offsetWidth;
      // lấy độ dài cardList = số card * width card / 3 vì xếp 3 hàng ngang
      const cardListWidth = this._cardListElement.childElementCount * cardWidth / 3;
      // lấy độ dài container
      translateX = this._parentElement.offsetWidth + 24;
      // thêm vào để làm trung gian di chuyển
      this._tempContainer += translateX;
      // di chuyển cardList bằng đúng điểm trung gian đó
      this._cardListElement.style.transform = `translateX(${-this._tempContainer}px)`;
      // kiểm tra nếu điếm trung gian đó lớn hơn độ dài listWidth thì ẩn control phải
      // trừ đi translateX vì ban đầu nó bằng 0 mà vị trí ban đầu của cardWidth đẵ bằng container rồi
      if (this._tempContainer >= cardListWidth - translateX) {
        // vì transition trễ 200 trong css
        setTimeout(() => {
          this._rightBtn.classList.add('hidden');
        }, 500);
      }
      // hiển thị control trái
      this._leftBtn.classList.remove('hidden');
    })
  }

  _generateMarkup2() {
    return this._data.map(this._generateMarkupCard2).join('');
  }

  _generateMarkupCard2(movie) {
    return /*html */ `
      <div class="card__item">
        <div class="card__image">
          <a href="#" class="card__poster-link">
            <img
              src="${pathPictureW220(movie.posterPath)}"
              alt="${movie.title}"
              loading="lazy"
              class="card__poster"
            />
          </a>

          <a href="#" class="card__backdrop-link">
            <img
              src="${pathPictureW533(movie.backdropPath)}"
              alt="${movie.title}"
              loading="lazy"
              class="card__backdrop"
            />
          </a>

          <a href="#" class="card__link-btn card__link--trailer">
            <svg class="card__icon">
              <use href='${icons}#icon-play-circle'></use>
            </svg>
          </a>
        </div>

        <div class="card__info">
          <a href="#" class="card__link">
            <h6 class="card__title">${movie.title}</h6>
          </a>

          <p class="card__hover-info2"><span>${getGenresId(movie.genreIds[0])}</span>, <span>${getGenresId(movie.genreIds[1])}</span></p>

          <p class="card__title">
            <span>${getVoteAverage(movie.voteAverage)}</span>

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

export default new HomeCard2View();
