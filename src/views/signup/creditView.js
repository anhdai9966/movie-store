import SignupView from './signupView.js';

class CreditView extends SignupView {
  _parentElement = document.querySelector('.signup__form--credit');
};

export default new CreditView();