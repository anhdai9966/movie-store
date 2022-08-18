import { pathPictureW220, pathPictureW533, getGenresId, getYear, getVoteAverage } from '../shared/helpers.js';

import icons from 'url:../../imgs/icons.svg';
export default class View {
  _data;
  _tempHover = 0;
  _tempContainer = 0;
  _count = 0;

  renderCard(data) {
    this._data = data;

    let markup = this._generateMarkup();
    this._cardListElement.innerHTML = '';
    // render nội dung mới
    this._cardListElement.insertAdjacentHTML('afterbegin', markup);
    // khi render ra thì thêm sự kiện
    this._addHandlerHoverOver();
    this._addHandlerClickControlRight();
    this._addHandlerClickControlLeft();
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._cardListElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
    this._tempContainer = (this._parentElement.offsetWidth + 24) * this._count;
    console.log(this._tempContainer, this._parentElement.offsetWidth, this._count);
  }

  // mouseenter mouseover
  _addHandlerHoverOver() {
    this._parentElement.addEventListener('mouseover', e => {
      const cardItem = e.target.closest('.card__item');
      if (!cardItem) return;
      // lấy giá trị width của container + 24 vì ở đây container bị margin -12 2 bên
      const containerWidth = this._parentElement.offsetWidth + 24 + this._tempContainer;
      // lấy width của card
      const cardWidth = cardItem.offsetWidth;
      // lấy vị trí của card
      const cardLeft = cardItem.offsetLeft + cardWidth;
      // sự kiện khi di chuyển chuột ra thì đưa  biến tạm về 0 để reset lại từ đầu
      this._cardListElement.addEventListener('mouseleave', () => {
        this._cardListElement.style.transform = `translateX(${-this._tempContainer}px)`;
        this._tempHover = 0;
      });
      // nếu vị trí của nó == container width thì dịch chuyển card list
      if (cardLeft == containerWidth) {
        if (this._tempHover < 3) {
          this._cardListElement.style.transform = `translateX(-${cardWidth + this._tempContainer}px)`;
        }
      } else {
        this._tempHover = 6;
      };
    });
  }

  // Xử lý khi click phải
  _addHandlerClickControlRight() {
    let translateX = 0;
    this._rightBtn.addEventListener('click', () => {
      this._count += 1;
      // lấy độ dài card
      const cardWidth = this._cardListElement.firstElementChild.offsetWidth;
      // lấy độ dài cardList = số card * width card
      const cardListWidth = this._cardListElement.childElementCount * cardWidth;
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
      console.log(this._tempContainer, this._parentElement.offsetWidth, this._count);
    }, true)
  }

  // Xử lý khi click trái
  _addHandlerClickControlLeft() {
    let translateX = 0;
    this._leftBtn.addEventListener('click', () => {
      this._count -= 1;
      translateX = this._parentElement.offsetWidth + 24;
      this._tempContainer -= translateX;
      this._cardListElement.style.transform = `translateX(${-this._tempContainer}px)`;
      // mặc định control trái ẩn tương ứng với this._tempContainer = 0
      if (this._tempContainer == 0) {
        setTimeout(() => {
          this._leftBtn.classList.add('hidden');
        }, 500);
      }
      this._rightBtn.classList.remove('hidden');
      console.log(this._tempContainer, this._parentElement.offsetWidth, this._count);
    }, true)
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupCard).join('');
  }
  
  // phương thức xóa nội dung cũ
  _clear() {
    this._cardListElement.innerHTML = '';
  }

  // giao diện chờ
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
    this._clear();
    this._cardListElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = /*html*/ `
      <h3>Rất tiếc, trang này hiện không khả dụng.</h3>
      <p>
        <span>${message}</span> 
        <a href="#">Quay lại MovieStore</a>
      </p>
    `;
    this._clear();
    this._cardListElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkupCard(movie) {
    return /*html */ `
      <div class="card__item">
        <div class="card__image">
          <a href="./detail.html#${movie.id}" class="card__img-link">
            <img
              src="${pathPictureW220(movie.posterPath)}"
              alt="${movie.title}"
              loading="lazy"
              class="card__poster"
            />
          </a>

          <div class="card__hover">
            <a href="./detail.html#${movie.id}" class="card__img-link">
              <img
                src="${pathPictureW533(movie.backdropPath)}"
                alt="${movie.title}"
                loading="lazy"
                class="card__backdrop"
              />
            </a>

            <div class="card__overlay"></div>

            <button data-id="${movie.id}" class="card__btn-wishlist card__btn--wishlist">
              <svg class="card__icon">
                <use href="${icons}#icon-bookmark${movie.bookmarked? '-fill': ''}"></use>
              </svg>
            </button>

            <div class="card__hover-info">
              <a href="./detail.html#${movie.id}" class="card__link">
                <h6 class="card__hover-title">${movie.title}</h6>
              </a>

              <p class="card__hover-info2">
                <span>${getGenresId(movie.genreIds[0])}</span> - <span>${getYear(movie.releaseDate)}</span> - <span>Chỉ từ 80.000 đ</span>
              </p>

              <button data-title="${movie.originalTitle}" class="card__link-btn card__btn--trailer">Trailer</button>
            </div>
          </div>
        </div>

        <div class="card__info">
          <a href="./detail.html#${movie.id}" class="card__link">
            <h6 class="card__title">${movie.title}</h6>
          </a>

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