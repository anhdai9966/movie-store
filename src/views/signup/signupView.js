export default class SigninView {
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  
  addHandlerToggle() {
    this._parentElement.classList.toggle('hidden');
  }

  addHandlerSubmit(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      const dataArr = new FormData(this._parentElement);
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}