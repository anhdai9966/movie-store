import View from './View.js';

class TrailerView extends View {
  _grandparentElement = document.querySelector('.trailer');
  _parentElement = this._grandparentElement.querySelector('.trailer__main');

  constructor() {
    super();
    this._addHandlerClickBtn();
    this._addHandlerClickOverlay();
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerBtnTrailer(handler) {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.card__btn-trailer--open');
      if(!btn) return ;
      const title = btn.dataset.title
      handler(title);
    })
  }

  shownTrailer() {
    this._grandparentElement.classList.remove('hidden');
    // chờ để nhìn được hiệu ứng
    setTimeout(() => {
      const style = {
        'opacity': '1',
        'top': '50%',
        'left': '50%',
      };
      Object.assign(this._grandparentElement.querySelector('.trailer__wrapper').style, style);
    }, 100);

    document.body.style.overflow = 'hidden';
  }

  closeTrailer() {
    const style = {
      'opacity': '0',
      'top': '100%',
      'left': '0',
    };
    Object.assign(this._grandparentElement.querySelector('.trailer__wrapper').style, style);
    // chờ để nhìn được hiệu ứng
    setTimeout(() => {
      this._grandparentElement.classList.add('hidden');
    }, 250);

    document.body.style.overflow = 'auto';
    this._parentElement.innerHTML = '';
  }

  _addHandlerClickBtn() {
    this._grandparentElement.addEventListener('click', (e) => {
      const btn = e.target.closest('.trailer__btn--close');

      if(!btn) return ;

      this.closeTrailer();
    })
  }

  _addHandlerClickOverlay() {
    this._grandparentElement.addEventListener('click', (e) => {
      const btn = e.target.closest('.trailer__overlay');

      if(!btn) return ;
      
      this.closeTrailer();
    })
  }

  // HyperText Markup Language
  _generateMarkup() {
    return /*html*/ `
      <iframe src="https://www.youtube.com/embed/${this._data.videoId}" title="${this._data.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;
  }
};

export default new TrailerView();