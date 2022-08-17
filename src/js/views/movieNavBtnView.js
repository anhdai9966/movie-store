class MovieNavView {
  _data;
  _parentElement = document.querySelector('.main__nav');
  _yearElement = this._parentElement.querySelector('.nav__year');
  _genresElement = this._parentElement.querySelector('.nav__genres');
  _nationElement = this._parentElement.querySelector('.nav__nation');

  _resultElement = this._parentElement.querySelector('.nav__result');
  _yearInputElement = this._parentElement.querySelector('.year__input');
  _nationInputElement = this._parentElement.querySelector('.nation__input');

  _closeBtnElement = this._parentElement.querySelector('.close__btn');
  _resetBtnElement = this._parentElement.querySelector('.reset__btn');

  constructor() {
    this._addHandlerCloseResult();
    this._addHandlerShowReset();
    this._addHandlerClickReset();
  }
  
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  _handlerShowResult() {
    if (this._resultElement.classList.contains('hidden')) {
      this._resultElement.classList.toggle('hidden');
      setTimeout(() => {
        this._resultElement.style.opacity = '1';
        this._resultElement.style.height = '23rem';
        this._resultElement.style.padding = '1rem';
      }, 100);
    }
  }
  
  addHandlerClickGenres(handler) {
    this._genresElement.addEventListener('click', () => {
      if (this._parentElement.querySelector('.nav--active')) {
        this._parentElement.querySelector('.nav--active').classList.remove('nav--active');
      }
      this._genresElement.classList.add('nav--active');
      this._handlerShowResult();
      if (!this._yearInputElement.classList.contains('hidden')) {
        this._yearInputElement.classList.add('hidden');
      };
      if (!this._nationInputElement.classList.contains('hidden')) {
        this._nationInputElement.classList.add('hidden');
      };
      handler();
    })
  }

  addHandlerClickNation(handler) {
    this._nationElement.addEventListener('click', () => {
      if (this._parentElement.querySelector('.nav--active')) {
        this._parentElement.querySelector('.nav--active').classList.remove('nav--active');
      }
      this._nationElement.classList.add('nav--active');
      this._handlerShowResult();
      this._nationInputElement.classList.remove('hidden');
      if (!this._yearInputElement.classList.contains('hidden')) {
        this._yearInputElement.classList.add('hidden');
      };
      handler();
    })
  }
  addHandlerClickYear(handler) {
    this._yearElement.addEventListener('click', () => {
      if (this._parentElement.querySelector('.nav--active')) {
        this._parentElement.querySelector('.nav--active').classList.remove('nav--active');
      }
      this._yearElement.classList.add('nav--active');
      this._handlerShowResult();
      this._yearInputElement.classList.remove('hidden');
      if (!this._nationInputElement.classList.contains('hidden')) {
        this._nationInputElement.classList.add('hidden');
      };
      handler();
    })
  }

  addHandlerSearchNation(handler) {
    this._nationInputElement.addEventListener('input', () => {
      let value = this._nationInputElement.value;
      handler(value);
    })
  }
  addHandlerYearInput(handler) {
    this._yearInputElement.addEventListener('change', () => {
      let value = this._yearInputElement.value;
      handler(value);
    })
  }
  _addHandlerCloseResult() {
    this._closeBtnElement.addEventListener('click', () => {
      this._resultElement.style.opacity = '0';
      this._resultElement.style.height = '0';
      this._resultElement.style.padding = '0';
      setTimeout(() => {
        this._resultElement.classList.toggle('hidden');
      }, 300);
    })
  }
  _addHandlerShowReset() {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, () => {
      const id = window.location.hash;
      id ?
      this._resetBtnElement.classList.remove('hidden') :
      this._resetBtnElement.classList.add('hidden');
    }))
  }
  _addHandlerClickReset() {
    this._resetBtnElement.addEventListener('click', () => {
      window.location.hash = '';
    })
  }
}

export default new MovieNavView();
