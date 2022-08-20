class PopupSigninView {
  _parentElement = document.querySelector('.signin__popup');

  // đăng ký sự kiện
  constructor() {
    this._addHandlerClickClosePopupSignin();
    // this._addHandlerClickForgetPassword();
    // this._addHandlerClickContinue();
    // this._addHandlerClickConfirm();
    // this._addHandlerClickCreatePassword();
    // this._addHandlerClickCreateDone();
  }

  // thê xử lý hiển thị search
  addHandlerShowPopupSignin() {
    this._parentElement.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  addHandlerHiddenPopupSignin() {
    this._parentElement.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  _addHandlerClickClosePopupSignin() {
    this._parentElement.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn__close');
      if(!btn) return;
      this.addHandlerHiddenPopupSignin();
    })
  }
  // _addHandlerClickForgetPassword() {
  //   this._parentElement.addEventListener('click', (e) => {
  //     const btn = e.target.closest('.signin__btn--forgetpassword');
  //     if(!btn) return;
  //     e.preventDefault();
  //     // chặn mặc định from load lại trang
  //     this._signin.classList.toggle('hidden');
  //     this._forgetPassword.classList.toggle('hidden');
  //   })
  // }

  // _addHandlerClickContinue() {
  //   this._parentElement.addEventListener('click', (e) => {
  //     const btn = e.target.closest('.signin__btn--continue');
  //     if(!btn) return;
  //     e.preventDefault();
  //     // chặn mặc định from load lại trang
  //     this._forgetPassword.classList.toggle('hidden');
  //     this._confirm.classList.toggle('hidden');
  //   })
  // }

  // _addHandlerClickConfirm() {
  //   this._parentElement.addEventListener('click', (e) => {
  //     const btn = e.target.closest('.signin__btn--confirm');
  //     if(!btn) return;
  //     e.preventDefault();
  //     // chặn mặc định from load lại trang
  //     this._confirm.classList.toggle('hidden');
  //     this._createPassword.classList.toggle('hidden');
  //   })
  // }

  // _addHandlerClickCreatePassword() {
  //   this._parentElement.addEventListener('click', (e) => {
  //     const btn = e.target.closest('.signin__btn--createPassword');
  //     if(!btn) return;
  //     e.preventDefault();
  //     // chặn mặc định from load lại trang
  //     this._createPassword.classList.toggle('hidden');
  //     this._createDone.classList.toggle('hidden');
  //   })
  // }

  // _addHandlerClickCreateDone() {
  //   this._parentElement.addEventListener('click', (e) => {
  //     const btn = e.target.closest('.signin__btn--done');
  //     if(!btn) return;
  //     // chặn mặc định from load lại trang
  //     this._createDone.classList.toggle('hidden');
  //     this._signin.classList.toggle('hidden');
  //   })
  // }

  _generateMarkup() {
    return /*html */ `
      
    `;
  }
}

export default new PopupSigninView();

// const init = new PopupSigninView();

