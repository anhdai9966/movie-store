class PopupWishlistMessageView {
  _data;
  _parrentElement = document.querySelector('.wishlistBuy__message');

  constructor() {
    this._handlerClickCancel();
  }

  _handlerClickCancel() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.wishlistBuy_mess__btn--cancel');
      if (!btn) return ;
      this.addHandlerHiddenMessage();
    })
  }

  addHandlerMessageClickBuy(handler) {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.wishlistBuy_mess__pay--buy');
      if (!btn) return ;
      handler()
    })
  }

  addHandlerShowMessage() {
    this._parrentElement.classList.remove('hidden');
  }
  addHandlerHiddenMessage() {
    this._parrentElement.classList.add('hidden');
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
    this._parrentElement.innerHTML = '';
    this._parrentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new PopupWishlistMessageView();