class SignupCreditView {
  _data;
  _parentElement = document.querySelector('.signup__create_credit');

  _signupBtnCredit = this._parentElement.querySelector('.signup__btn_create_credit');

  constructor() {
    this._addHandlerClickCredit();
  }

  addHandlerLoad(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerHiddenCredit() {
    this._parentElement.classList.add('hidden');
  }
  addHandlerShownCredit() {
    this._parentElement.classList.remove('hidden');
  }

  _addHandlerClickCredit() {
    this._signupBtnCredit.addEventListener('click', () => {
      window.location.assign('../../index.html');
    })
  }
};

export default new SignupCreditView();