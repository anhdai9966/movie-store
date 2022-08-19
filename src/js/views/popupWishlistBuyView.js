import { pathPictureW220 } from '../shared/helpers.js';

class PopupWishlistBuyView {
  _data;
  _parrentElement = document.querySelector('.wishlistBuy__overlay');

  _btnClose = this._parrentElement.querySelector('.btn__close');
  _picList = this._parrentElement.querySelector('.pic__list');
  _wishlistBuyXu = this._parrentElement.querySelector('.wishlistBuy__xu_wrapper');
  _titleNotdone = this._parrentElement.querySelector('.title__not-done');
  _titledone = this._parrentElement.querySelector('.title__not-done');

  constructor() {
    this._handlerClosePopupWishlistBuy();
  }

  addHandlerNotDoneShownWishlisttitle() {
    this._titleNotdone.classList.remove('hidden');
    this._titledone.classList.add('hidden');
  }
  addHandlerDonenWishlisttitle() {
    this._titleNotdone.classList.add('hidden');
    this._titledone.classList.remove('hidden');
  }

  addHandlerShowPopupWishlistBuy() {
    this._parrentElement.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  _handlerClosePopupWishlistBuy() {
    this._btnClose.addEventListener('click', () => {
      this._parrentElement.classList.add('hidden');
      document.body.style.overflow = 'auto';
    })
  }
  _handlerClosePopupWishlistClick() {
    document.addEventListener('click', (e) => {
      const overlay = e.target.closest('.wishlistBuy__overlay');
      if (!overlay) return ;
      this._parrentElement.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, true)
  }

  addHandlerPicWishlistAnimation() {
    const lengthPic = this._picList.childElementCount;
    const pics = this._picList.childNodes;
    if(lengthPic > 1) {
      let deg = -lengthPic * ( 20 / lengthPic);

      // this._picList.style.transform = `rotate(${lengthPic / 2}deg)`;
      
      Array.from(pics).forEach((pic, index) => {
        if (index !== 0 && index % 2 !== 0) {
          pic.style.transform = `rotate(${deg}deg)`;

          deg += (40 / lengthPic);
        } 
      });
    } else {
      this._picList.style.transform = 'rotate(0)'
    };
  }

  renderPic(data) {
    this._data = data;
    // lấy đánh dấu
    const markup = this._generateMarkup();
    // xóa nội dung hiện tại
    this._picList.innerHTML = '';
    // render nội dung mới
    this._picList.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPic).join('');
  }

  _generateMarkupPic(movie) {
    return /*html */ `
      <li class="pic__item">
      <a href="./detail.html#${movie.id}" class="pic__link">
        <img src="${pathPictureW220(movie.posterPath)}" alt="${movie.title}">
      </a>
      </li>
    `;
  }
}

export default new PopupWishlistBuyView();

// const items = document.querySelectorAll(".pic__item");
// const picList = document.querySelector(".pic__list");

// let deg;
// let custom_style = {};
// window.addEventListener("load", () => {
//   if(items.length > 1) {
//     picList.style.transform = `rotate(${items.length / 2}deg)`
//     deg = -items.length * ( 20 / items.length);
//     items.forEach((item) => {
//       custom_style = {
//         transform: `rotate(${deg}deg)`,
//       };

//       //Object.assign():
//       Object.assign(item.style, custom_style);
//       deg += (40 / items.length);
//     });
//   } else {
//     picList.style.transform = 'rotate(0)'
//   };
  
// });