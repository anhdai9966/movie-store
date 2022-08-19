class WishlistBuyDone {
  _parentElement = document.querySelector('.wishlistBuy__done');

  addHandlerShownWishlistBuyDone() {
    this._parentElement.classList.remove('hidden');
  }
  addHandlerHiddennWishlistBuyDone() {
    this._parentElement.classList.add('hidden');
  }
}

export default new WishlistBuyDone();