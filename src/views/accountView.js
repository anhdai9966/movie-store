import View from './View.js';
import { numberWithCommas } from '../shared/helpers.js';

import icons from 'url:../images/icons.svg';

class AccountView extends View {
  _parentElement = document.querySelector('.header__account-item');

  _generateMarkup() {
    return /*html */ `
      <div class="account__item">
        <div class="header__icon">
          <div class="account__status"></div>
        </div>

        <div class="">
          <p>Hi, ${this._data.accountInfo.name}</p>
          <p style="color: #ff9500; font-weight: normal">${numberWithCommas(this._data.accountInfo.xu)} xu</p>
        </div>
      </div>
    `;
  }
}

export default new AccountView();
