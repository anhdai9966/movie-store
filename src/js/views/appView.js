class AppView {
  _googlePlay = document.querySelector('.google-play__btn');

  _appStore = document.querySelector('.app-store__btn');

  addHandlerClickGooglePlay(handler) {
    this._googlePlay.addEventListener('click', () => {
      handler();
    })
  }
  addHandlerClickAppStore(handler) {
    this._appStore.addEventListener('click', () => {
      handler();
    })
  }
}

export default new AppView();