import View from '../View';
import { validateEmail, validatePassword } from '../../shared/helpers.js';
import {NOTIFICATION_WRONG_PASSWORD} from '../../shared/config.js';

class SigninView extends View {
  _parentElement = document.querySelector('.signin');
  _signinForm = this._parentElement.querySelector('.signin__form');

  _forgetpasswordForm = this._parentElement.querySelector('.forgetpassword__form');
  _forgetEmailInput = this._forgetpasswordForm.querySelector('.forgetpassword__email');
  _forgetBtnContinue = this._forgetpasswordForm.querySelector('.signin__btn--continue');

  _confirmForm = this._parentElement.querySelector('.confirm__form');
  _confirmNumberInput = this._parentElement.querySelector('.confirm__number');
  _confirmBtn = this._parentElement.querySelector('.signin__btn--confirm');
  
  _createPasswordForm = this._parentElement.querySelector('.createPassword__form');
  _createPasswordInput = this._parentElement.querySelector('.createPassword__input');
  _createPasswordRepeatInput = this._parentElement.querySelector('.createPassword__input_repeat');
  _createPasswordBtn = this._parentElement.querySelector('.signin__btn--createPassword');

  _createPasswordDoneForm = this._parentElement.querySelector('.createPassword__done');
  _createPasswordDoneBtn = this._parentElement.querySelector('.signin__btn--done');

  // đăng ký sự kiện
  constructor() {
    super();
    this._handlerBtnCloseSignin();
    this._handlerOverlayCloseSignin();

    this._handlerShowForgetpasswordForm();
    this._handlerBlurForgetEmail();
    this._handlerBlurCreatePasswordRepeat();
    this._handlerClickCreatePasswordBtn();
    this._addHandlerPasswordValidator();
  }

  // xử lý hiển thị signin
  addHandlerShownSignin() {
    this._parentElement.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  addHandlerHiddenSignin() {
    this._parentElement.classList.add('hidden');
    document.body.style.overflow = 'auto';
    this._handlerResetForm();
  }
  _handlerResetForm() {
    this._signinForm.classList.remove('hidden');
    this._forgetpasswordForm.classList.add('hidden');
    this._confirmForm.classList.add('hidden');
    this._createPasswordForm.classList.add('hidden');
    this._createPasswordDoneForm.classList.add('hidden');
  }
  _handlerBtnCloseSignin() {
    this._parentElement.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn__close');
      if(!btn) return;
      this.addHandlerHiddenSignin();
    })
  }
  _handlerOverlayCloseSignin() {
    this._parentElement.addEventListener('click', (e) => {
      const btn = e.target.closest('.signin__overlay');
      if(!btn) return;
      this.addHandlerHiddenSignin();
    })
  }

  // phần sign in
  addHandlerSigninForm(handler) {
    this._signinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const dataArr = [...new FormData(this._signinForm)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    })
  }
  
  getCheckbox() {
    const checked = this._signinForm.querySelector('.checkbox--signin').checked;
    return checked;
  }
  
  // forget password
  _handlerShowForgetpasswordForm() {
    this._signinForm.addEventListener('click', (e) => {
      const btn = e.target.closest('.signin__btn--forgetpassword');
      if (!btn) return ;
      e.preventDefault();
      this._signinForm.classList.toggle('hidden');
      this._forgetpasswordForm.classList.toggle('hidden');
    }, true)
  }

  getForgetEmail() {
    const email = this._forgetEmailInput.value;
    return email;
  }

  addHandlerForgetEmailValidator(email) {
    if (email) {
      const message = validateEmail(email);
      if (message) {
        this._forgetEmailInput.nextElementSibling.classList.remove('hidden');
        this._forgetEmailInput.nextElementSibling.innerHTML = message;
        this._forgetEmailInput.style.border = 'thin solid #FF3B30';
      } else {
        this._forgetEmailInput.nextElementSibling.classList.add('hidden');
        this._forgetEmailInput.style.border = 'thin solid #34C759';
        this._forgetEmailInput.nextElementSibling.innerHTML = '';
      }
    } else {
      this._forgetEmailInput.nextElementSibling.classList.add('hidden');
      this._forgetEmailInput.nextElementSibling.innerHTML = '';
      this._forgetEmailInput.style.border = 'unset';
    }
  }

  _handlerBlurForgetEmail() {
    this._forgetEmailInput.addEventListener('blur', () => {
      const email = this.getForgetEmail();
      this.addHandlerForgetEmailValidator(email);
    });
  }

  addHandlerClickForgetpassword(handler) {
    this._forgetBtnContinue.addEventListener('click', (e) => {
      e.preventDefault();
      const email = this.getForgetEmail();
      handler({email: email, action: 'confirm',});
    }, true)
  }

  // confirm
  addHandlerShowConfirmForm() {
    if (this._forgetEmailInput.nextElementSibling.classList.contains('hidden') && this._forgetEmailInput.value) {
      this._forgetpasswordForm.classList.toggle('hidden');
      this._confirmForm.classList.toggle('hidden');
    }
  }

  getConfirm() {
    const confirm = this._confirmNumberInput.value;
    return confirm;
  }

  addHandlerClickConfirm(handler) {
    this._confirmBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handler();
    })
  }

  // create new password
  addHandlerShowCreatePassword() {
    this._confirmForm.classList.toggle('hidden');
    this._createPasswordForm.classList.toggle('hidden');
  }
  getCreatePassword() {
    const password = this._createPasswordInput.value;
    return password;
  }
  getCreatePasswordRepeat() {
    const passwordRepeat = this._createPasswordRepeatInput.value;
    return passwordRepeat;
  }
  _addHandlerPasswordValidator() {
    this._createPasswordInput.addEventListener('blur', e => {
      const passValue = this._createPasswordInput.value;
      if (passValue) {
        const message = validatePassword(passValue, 6);
        if (message) {
          this._createPasswordInput.nextElementSibling.classList.remove('hidden');
          this._createPasswordInput.nextElementSibling.innerHTML = message;
          this._createPasswordInput.style.border = "thin solid #FF3B30";
        } else {
          this._createPasswordInput.nextElementSibling.classList.add('hidden');
          this._createPasswordInput.style.border = "thin solid #34C759";
          this._createPasswordInput.nextElementSibling.innerHTML = '';
        };
      } else {
        this._createPasswordInput.nextElementSibling.classList.add('hidden');
        this._createPasswordInput.nextElementSibling.innerHTML = '';
        this._createPasswordInput.style.border = "unset";
      };
    });
  }
  _handlerBlurCreatePasswordRepeat() {
    this._createPasswordRepeatInput.addEventListener('blur', () => {
      const password = this.getCreatePassword();
      const passwordRepeat = this.getCreatePasswordRepeat();
      if (passwordRepeat == '') {
        // không làm gì
      } else if (password != passwordRepeat) {
        this._createPasswordRepeatInput.nextElementSibling.classList.remove('hidden');
        this._createPasswordRepeatInput.nextElementSibling.innerHTML = NOTIFICATION_WRONG_PASSWORD;
        this._createPasswordRepeatInput.style.border = 'thin solid #FF3B30';
        this._createPasswordInput.style.border = 'thin solid #FF3B30';
      } else {
        this._createPasswordRepeatInput.nextElementSibling.classList.add('hidden');
        this._createPasswordRepeatInput.style.border = 'thin solid #34C759';
        this._createPasswordInput.style.border = 'thin solid #34C759';
        this._createPasswordRepeatInput.nextElementSibling.innerHTML = '';
      }
    });
  }
  addHandlerClickCreatePassword(handler) {
    this._createPasswordBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const confirm = this.getConfirm();
      const email = this.getForgetEmail();
      const password = this.getCreatePassword();
      handler({email: email, password: confirm, action: 'update', passwordUpdate: password});
    })
  }

  // create Password Done
  addHandlerShowCreatePasswordDone() {
    this._createPasswordForm.classList.toggle('hidden');
    this._createPasswordDoneForm.classList.toggle('hidden');
  }
  _handlerClickCreatePasswordBtn() {
    this._createPasswordDoneBtn.addEventListener('click', () => {
      this._createPasswordDoneForm.classList.toggle('hidden');
      this._signinForm.classList.toggle('hidden');
    })
  }
}

export default new SigninView();

