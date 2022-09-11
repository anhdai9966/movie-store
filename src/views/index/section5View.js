class BannerView {
  _parentElement = document.querySelector('.section-5');
  section5Signup = this._parentElement.querySelector('.section-5__signup');
  _section5Logged = this._parentElement.querySelector('.section-5__logged');
  _section5Form = this._parentElement.querySelector('.section-5__form');

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerToggle() {
    this.section5Signup.classList.toggle('hidden');
    this._section5Logged.classList.toggle('hidden');
  }

  addHandlerSignup(handler) {
    this._section5Form.addEventListener('submit', (e) => {
      e.preventDefault();
      const dataArr = new FormData(this._section5Form);
      const data = Object.fromEntries(dataArr);
      handler(data);
    })
  }
}

export default new BannerView();