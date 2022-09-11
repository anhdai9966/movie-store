import SignupView from './signupView.js';

class ConfirmView extends SignupView {
  _parentElement = document.querySelector('.signup__form--confirm');

  _confirmInput = this._parentElement.querySelector('#signup__confirm-number');

  getConfirm() {
    return this._confirmInput.value;
  }
};

export default new ConfirmView();