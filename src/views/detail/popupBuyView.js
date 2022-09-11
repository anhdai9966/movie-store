class PopupBuyView {
  _parentElement = document.querySelector('.popup-buy');
  _btnClose = this._parentElement.querySelector('.popup-buy__btn--close');
  _overlay = this._parentElement.querySelector('.popup-buy__overlay');

  _buyDone = this._parentElement.querySelector('.popup-buy__wrap-2-done');

  _titleBuy = this._parentElement.querySelector('.popup-buy__wrap-2-title-buy');
  _titleDone = this._parentElement.querySelector('.popup-buy__wrap-2-title-done');

  constructor() {
    this._addHandlerBtnClose();
    this._addHandlerClickOverlay();
  }

  togglePopup() {
    this._parentElement.classList.toggle('hidden');
  }

  shownTitleBuy() {
    this._titleBuy.classList.remove('hidden');
    this._titleDone.classList.add('hidden');
    this._buyDone.classList.add('hidden');
  }
  shownTitleDone() {
    this._titleBuy.classList.add('hidden');
    this._titleDone.classList.remove('hidden');
    this._buyDone.classList.remove('hidden');
  }

  _addHandlerBtnClose() {
    this._btnClose.addEventListener('click', this.togglePopup.bind(this))
  }
  _addHandlerClickOverlay() {
    this._overlay.addEventListener('click', this.togglePopup.bind(this))
  }
}

export default new PopupBuyView();