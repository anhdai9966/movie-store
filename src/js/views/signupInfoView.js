class SignupInfoView {
  _data;
  _parentElement = document.querySelector('.signup__create_info');
  _signupName = this._parentElement.querySelector('.signup__name');
  _signupYear = this._parentElement.querySelector('.signup__year');

  _signupBtnCreatInfo = this._parentElement.querySelector('.signup__btn_create_info');

  constructor() {}

  addHandlerLoad(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerHiddenCreateInfo() {
    this._parentElement.classList.add('hidden');
  }
  addHandlerShownCreateInfo() {
    this._parentElement.classList.remove('hidden');
  }

  getValueName() {
    return this._signupName.value;
  }
  getValueYear() {
    return this._signupYear.value;
  }
  addHandlerClickCreateInfo(handler) {
    this._signupBtnCreatInfo.addEventListener('click', () => {
      handler();
    })
  }
};

export default new SignupInfoView();