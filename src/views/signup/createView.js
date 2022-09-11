import SignupView from './signupView.js';

import { validateEmail, validatePassword } from '../../shared/helpers.js';
import { NUMBER_CHAR_PASSWORD } from '../../shared/config.js';

class CreateView extends SignupView {
  _parentElement = document.querySelector('.signup__form--create');

  _emailInput = this._parentElement.querySelector('#signup__create-email');
  _passwordInput = this._parentElement.querySelector('#signup__create-password');

  constructor() {
    super();
    this._handlerEmailValidator();
    this._handlerPasswordValidator();
  }

  _handlerEmailValidator() {
    this._emailInput.addEventListener('blur', e => {
      const emailValue = this.getEmail();

      this.emailValidate(emailValue);
    });
  }
  _handlerPasswordValidator() {
    this._passwordInput.addEventListener('blur', e => {
      const passValue = this.getPassword();

      this.passwordValidate(passValue);
    });
  }

  addHandlerValidator() {
    return this._emailInput.nextElementSibling.classList.contains('hidden') &&
      this._passwordInput.nextElementSibling.classList.contains('hidden') &&
      this._emailInput.value &&
      this._passwordInput.value
      ? true
      : false;
  }

  setEmail(val) {
    this._emailInput.value = val;
  }
  getEmail() {
    return this._emailInput.value;
  }
  getPassword() {
    return this._passwordInput.value;
  }

  emailValidate(val) {
    if (val) {
      const message = validateEmail(val);
      if (message) {
        this._emailInput.nextElementSibling.classList.remove('hidden');
        this._emailInput.nextElementSibling.innerHTML = message;
        this._emailInput.style.border = 'thin solid #FF3B30';
      } else {
        this._emailInput.nextElementSibling.classList.add('hidden');
        this._emailInput.style.border = 'thin solid #34C759';
        this._emailInput.nextElementSibling.innerHTML = '';
      }
    } else {
      this._emailInput.nextElementSibling.classList.add('hidden');
      this._emailInput.nextElementSibling.innerHTML = '';
      this._emailInput.style.border = 'unset';
    }
  }
  passwordValidate(val) {
    if (val) {
      const message = validatePassword(val, NUMBER_CHAR_PASSWORD);
      if (message) {
        this._passwordInput.nextElementSibling.classList.remove('hidden');
        this._passwordInput.nextElementSibling.innerHTML = message;
        this._passwordInput.style.border = 'thin solid #FF3B30';
      } else {
        this._passwordInput.nextElementSibling.classList.add('hidden');
        this._passwordInput.style.border = 'thin solid #34C759';
        this._passwordInput.nextElementSibling.innerHTML = '';
      }
    } else {
      this._passwordInput.nextElementSibling.classList.add('hidden');
      this._passwordInput.nextElementSibling.innerHTML = '';
      this._passwordInput.style.border = 'unset';
    }
  }
}

export default new CreateView();
