import icons from 'url:../../images/icons.svg';

import { numberWithCommas } from '../../shared/helpers.js';

class AvatarView {
  _parentElement = document.querySelector('.account__popup');

  shown() {
    this._parentElement.classList.remove('hidden');
  }
  hidden() {
    this._parentElement.classList.add('hidden');
  }

  render(xu, bookmarks) {
    this._data = { xu, bookmarks };
    const markup = this._generateMarkup();

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    const buy = this._data.bookmarks.reduce((a, b) => (a + +b.price.buy), 0);

    return /*html*/`
      <div class="container">
        <div class="account__xu">
          <h6 class="h6">Các nội dung đã mua sẽ phát trên các thiết bị tương thích</h6>
          <div class="account__xu_wrapper">
            <div class="account__xu_wrap">
              <h6 class="h6">Xu MovieStore</h6>
              <p>Dùng ${buy > this._data.xu ? numberWithCommas(this._data.xu) : numberWithCommas(buy)} xu / ${numberWithCommas(this._data.xu)} xu</p>
            </div>
            <div class="account__xu_wrap">
              <label for="checkbox_xu">-${buy > this._data.xu ? numberWithCommas(this._data.xu) : numberWithCommas(buy)} đ</label>
              <input type="checkbox" name="checkbox_xu" id="checkbox_xu" class="account__checkbox_xu">
            </div>
          </div>
        </div>

        <div class="account__pay">
          <div class="account__pay_wrap">
            <input type="checkbox" name="checkbox_pay" id="checkbox_pay" class="account__checkbox_pay">
            <label for="checkbox_pay">Chọn tất cả</label>
          </div>

          <div class="account__pay_wrapper">
            <h6 class="h6">Tổng thanh toán (${this._data.bookmarks.length} phim):</h6>

            <div class="account__pay_wrap_2">
              <div class="account__pay_wrap">
                <h6 class="h6">${numberWithCommas(buy)} đ</h6>
                <button class="btn-primary buy__btn account__pay_btn">Mua</button>
              </div>
              <div class="account__pay_wrap">
                <h6 class="h6">${numberWithCommas(this._data.bookmarks.reduce((a, b) => (a + +b.price.rent), 0))} đ</h6>
                <button class="btn-secondary rent__btn account__pay_btn">Thuê</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
}
export default new AvatarView();