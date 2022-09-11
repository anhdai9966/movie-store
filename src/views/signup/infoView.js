import SignupView from './signupView.js';

class InfoView extends SignupView {
  _parentElement = document.querySelector('.signup__form--info');
  
  _nameInput = this._parentElement.querySelector('#signup__info-name');
  _birthInput = this._parentElement.querySelector('#signup__info-birth');

  getName() {
    return this._nameInput.value;
  }
  getBirth() {
    return this._birthInput.value;
  }
};

export default new InfoView();