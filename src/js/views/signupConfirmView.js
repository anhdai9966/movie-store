class SignupConfirmView {
  _data;
  _parentElement = document.querySelector('.signup__confirm');
  _signupConfirm = this._parentElement.querySelector('.signup__confirm');

  _signupBtnConfirm = this._parentElement.querySelector('.signup__btn_confirm');

  constructor() {}

  addHandlerLoad(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerHiddenConfirm() {
    this._parentElement.classList.add('hidden');
  }
  addHandlerShownConfirm() {
    this._parentElement.classList.remove('hidden');
  }

  getValueConfirm() {
    return this._signupConfirm.value;
  }
  addHandlerClickBtnCreate(handler) {
    this._signupBtnConfirm.addEventListener('click', () => {
      handler();
    })
  }
};

export default new SignupConfirmView();