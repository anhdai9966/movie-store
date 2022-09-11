import View from '../View.js';

import { numberWithCommas } from '../../shared/helpers';


class InfoView extends View {
  _parentElement = document.querySelector('.account__info');

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  shown() {
    this._parentElement.classList.remove('hidden')
  }
  hidden() {
    this._parentElement.classList.add('hidden')
  }

  _generateMarkup() {
    return /*html*/ `
      <ul class="account__info_list">
        <li class="account__info_item">
          <span>Tên</span>
          <span>${this._data.name}</span>
        </li>
        <li class="account__info_item">
          <span>Năm sinh</span>
          <span>${this._data.birth}</span>
        </li>
        <li class="account__info_item">
          <span>Giới tính</span>
          <span>${this._data.gender}</span>
        </li>
        <li class="account__info_item">
          <span>Email</span>
          <span>${this._data.email}</span>
        </li>
        <li class="account__info_item">
          <span>Mật khẩu</span>
          <button class="btn-secondary">Thay đổi mật khẩu</button>
        </li>
      </ul>

      <div class="tab">
        <ul class="tab__list">
          <li class="tab__item">
            <button class="tab__btn tab__btn-detail">Phương thức thanh toán</button>
          </li>
        </ul>
      </div>

      <ul class="account__info_list">
        <li class="account__info_item">
          <span>Credit / thẻ ghi nợ</span>
          <span>${this._data.credit}</span>
        </li>
        <li class="account__info_item">
          <span>MoMoPay</span>
          <span>${this._data.credit}</span>
        </li>
        <li class="account__info_item">
          <span>Xu MovieStore</span>
          <span>${numberWithCommas(this._data.xu)} xu</span>
        </li>
      </ul>
    `;
  }
}

export default new InfoView();