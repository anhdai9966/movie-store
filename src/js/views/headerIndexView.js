class HeaderIndexView {
  _parentElement = document.querySelector('.headerIndex');

  constructor() {
    this._addHandlerScrollTopShowHeader();
  }

  // nếu cuộn xuống thì ẩn còn cuộn lên thì hiện
  _addHandlerScrollTopShowHeader() {
    let heightCurrent, height = 0;
    window.addEventListener('scroll', () => {
      heightCurrent = document.documentElement.scrollTop;
      if(height < heightCurrent) {
        this._parentElement.style.top = "-54px";
        
        height = heightCurrent;
      } else {
        this._parentElement.style.top = "0";
        
        heightCurrent == 0 ?
        this._parentElement.style.background = "transparent" :
        this._parentElement.style.background = "#181818";

        height = heightCurrent;
      };

      if (heightCurrent == 0) {
        this._parentElement.style.top = "0";
        this._parentElement.style.background = "transparent";
      }

    });
  }

  addHandlerSigninOpenModal(handler) {
    this._parentElement.addEventListener('click', (e) => {
      const btn = e.target.closest('.sigin__btn--open-modal');
      if(!btn) return;
      handler();
    })
  }
}

export default new HeaderIndexView();