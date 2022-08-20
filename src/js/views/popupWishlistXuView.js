class PopupWishlistBuyView {
  _data;
  _xu;
  _parrentElement = document.querySelector('.wishlistBuy__xu_wrapper');

  constructor() {
    
  }

  addHandlerShownWishlistXu() {
    this._parrentElement.classList.remove('hidden');
  }
  addHandlerHiddennWishlistXu() {
    this._parrentElement.classList.add('hidden');
  }

  renderXu(data, xu) {
    this._data = data;
    this._xu = xu;
    // lấy đánh dấu
    const markup = this._generateMarkup();
    // xóa nội dung hiện tại
    this._parrentElement.innerHTML = '';
    // render nội dung mới
    this._parrentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerCheckedXuInput(handler) {
    document.addEventListener('change', (e) => {
      const checkbox = e.target.closest('.wishlistBuy__checkbox_xu');
      if (!checkbox) return ;
      const pieceBuy = checkbox.value;
      if (checkbox.checked == true){
        handler(pieceBuy);
      } else {
        handler(0);
      }
    })
  }

  _generateMarkup() {
    // tính giá trừ
    console.log(this._data);
    let totalPiece = 0;
    this._data.forEach(movie => {
      totalPiece += movie.price.buy;
    })
    return /*html */ `
      <div class="wishlistBuy__xu_wrap">
        <h6 class="h6">Xu MovieStore</h6>
        <p>Dùng ${this._xu > totalPiece ? totalPiece : this._xu} xu / ${this._xu} xu</p>
      </div>
      <p class="wishlistBuy__xu_wrap">
        <label for="checkbox_xu">-${this._xu > totalPiece ? totalPiece : this._xu} xu</label>
        <input type="checkbox" name="checkbox_xu" id="checkbox_xu" class="wishlistBuy__checkbox_xu" value="${this._xu > totalPiece ? totalPiece : this._xu}">
      </p>
    `;
  }
}

export default new PopupWishlistBuyView();