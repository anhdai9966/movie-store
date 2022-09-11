class GototopView {
  _parentElement = document.querySelector('.gototop');

  constructor() {
    this._addHandlerShowGototop();
    this._addHandlerGototop();
  }

  handlerShowGototop() {
    // window.scrollY > 400
    // console.log(document.documentElement.scrollTop);
    if (document.documentElement.scrollTop > 639) {
      this._parentElement.firstElementChild.style.transform = "translateY(0)";
    } else {
      this._parentElement.firstElementChild.style.transform = "translateY(7.5rem)";
    }
  }

  _addHandlerShowGototop() {
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