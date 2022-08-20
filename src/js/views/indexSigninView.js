import { validateEmail, validatePassword } from '../shared/helpers.js';

class AccountView {
  _parentElement = document.querySelector('.signin__item');
  _emailInput = this._parentElement.querySelector('.email__signin');
  _passwordInput = this._parentElement.querySelector('.password__signin');
  _buttonSigin = this._parentElement.querySelector('.button--signin');
  _checkboxSignin = this._parentElement.querySelector('.checkbox--signin');

  constructor() {
  }

  addHandlerLoad(handler) {
    window.addEventListener('load', handler);
  }

  getValueEmail() {
    return this._emailInput.value;
  }
  getValuePassword() {
    return this._passwordInput.value;
  }

  addHandlerClickButton(handler) {
    this._buttonSigin.addEventListener('click', () => {
      const emailValue = this._emailInput.value;
      const passValue = this._passwordInput.value;
      handler(emailValue, passValue);
    })
  }

  getValueClickCheckbox() {
    return this._checkboxSignin.checked;
  }
}

export default new AccountView();