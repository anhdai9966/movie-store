class GototopView {
  _parentElement = document.querySelector('.goToTop');

  constructor() {
    this.addHandlerShowGototop();
    this._addHandlerGototop();
  }

  addHandlerRun(handler) {
    window.addEventListener('load', handler);
  }

  handlerShowGototop() {
    // window.scrollY > 400
    // console.log(document.documentElement.scrollTop);
    if (document.documentElement.scrollTop > 900) {
      this._parentElement.firstElementChild.style.transform = "translateY(0)";
    } else {
      this._parentElement.firstElementChild.style.transform = "translateY(7.5rem)";
    }
  }

  addHandlerShowGototop() {
    window.addEventListener('scroll', () => {
      this.handlerShowGototop();
    });
  }

  _addHandlerGototop() {
    this._parentElement.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    })
  }
}

export default new GototopView();