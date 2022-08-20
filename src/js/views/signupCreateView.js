import { validateEmail, validatePassword } from '../shared/helpers.js';

class SignupCreateView {
  _data;
  _parentElement = document.querySelector('.signup__create');
  _signupEmail = this._parentElement.querySelector('.signup__email');
  _signupPassword = this._parentElement.querySelector('.signup__password');
  _signupBtnCreate = this._parentElement.querySelector('.signup__btn_create');

  constructor() {
    this._addHandlerEmailValidator();
    this._addHandlerPasswordValidator();
  }

  _addHandlerEmailValidator() {
    this._signupEmail.addEventListener('blur', e => {
      const emailValue = this._signupEmail.value;

      if (emailValue) {
        const message = validateEmail(emailValue);
        if (message) {
          this._signupEmail.nextElementSibling.classList.remove('hidden');
          this._signupEmail.nextElementSibling.innerHTML = message;
          this._signupEmail.style.border = 'thin solid #FF3B30';
        } else {
          this._signupEmail.nextElementSibling.classList.add('hidden');
          this._signupEmail.style.border = 'thin solid #34C759';
          this._signupEmail.nextElementSibling.innerHTML = '';
        }
      } else {
        this._signupEmail.nextElementSibling.classList.add('hidden');
        this._signupEmail.nextElementSibling.innerHTML = '';
        this._signupEmail.style.border = 'unset';
      }
    });
  }

  _addHandlerPasswordValidator() {
    this._signupPassword.addEventListener('blur', e => {
      const passValue = this._signupPassword.value;
      if (passValue) {
        const message = validatePassword(passValue, 6);
        if (message) {
          this._signupPassword.nextElementSibling.classList.remove('hidden');
          this._signupPassword.nextElementSibling.innerHTML = message;
          this._signupPassword.style.border = "thin solid #FF3B30";
        } else {
          this._signupPassword.nextElementSibling.classList.add('hidden');
          this._signupPassword.style.border = "thin solid #34C759";
          this._signupPassword.nextElementSibling.innerHTML = '';
        };
      } else {
        this._signupPassword.nextElementSibling.classList.add('hidden');
        this._signupPassword.nextElementSibling.innerHTML = '';
        this._signupPassword.style.border = "unset";
      };
    });
  }

  addHandlerLoad(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerHiddenCreate() {
    this._parentElement.classList.add('hidden');
  }
  addHandlerShownCreate() {
    this._parentElement.classList.remove('hidden');
  }

  setValueEmail(val) {
    this._signupEmail.value = val;
  }
  getValueEmail() {
    return this._signupEmail.value;
  }
  getValuePassword() {
    return this._signupPassword.value;
  }
  addHandlerClickBtnCreate(handler) {
    this._signupBtnCreate.addEventListener('click', () => {
      handler();
    });
  }
}

export default new SignupCreateView();
