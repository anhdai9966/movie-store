import { pathPictureW138 } from '../shared/helpers.js';

class DetailCastView {
  _data;
  _parentElement = document.querySelector('.cast__list');
  _grandparentEl = this._parentElement.parentElement;
  _leftBtn = document.querySelector('.left__btn');
  _rightBtn = document.querySelector('.right__btn');
  _tempContainer = 0;

  constructor() {
    this._addHandlerClickControlRight();
    this._addHandlerClickControlLeft();
  }

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

  // Xử lý khi click phải
  _addHandlerClickControlRight() {
    let translateX = 0;
    this._rightBtn.addEventListener('click', () => {
      // lấy độ dài card
      const cardWidth = this._parentElement.firstElementChild.offsetWidth;
      // lấy độ dài cardList = số card * width card
      const cardListWidth = this._parentElement.childElementCount * cardWidth;
      // lấy độ dài container
      translateX = this._grandparentEl.offsetWidth + 24;
      // thêm vào để làm trung gian di chuyển
      this._tempContainer += translateX;
      // di chuyển cardList bằng đúng điểm trung gian đó
      this._parentElement.style.transform = `translateX(${-this._tempContainer}px)`;
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

  // Xử lý khi click trái
  _addHandlerClickControlLeft() {
    let translateX = 0;
    this._leftBtn.addEventListener('click', () => {
      // lấy dộ dài container
      translateX = this._grandparentEl.offsetWidth + 24;
      this._tempContainer -= translateX;
      this._parentElement.style.transform = `translateX(${-this._tempContainer}px)`;
      // mặc định control trái ẩn tương ứng với this._tempContainer = 0
      if (this._tempContainer == 0) {
        setTimeout(() => {
          this._leftBtn.classList.add('hidden');
        }, 500);
      }
      this._rightBtn.classList.remove('hidden');
    })
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(cast) {
    return /*html*/ `
      <div class="cast__item">
        <a href="#" class="cast__poster">
          <img
            src="${pathPictureW138(cast.profilePath)}"
            alt="${cast.name}"
            loading="lazy"
          />
        </a>

        <a href="#" class="cast__name"><h6>${cast.name}</h6></a>

        <p class="cast__character">${cast.character}</p>
      </div>
    `;
  }
}

export default new DetailCastView();