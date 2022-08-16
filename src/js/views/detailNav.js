class DetailNavView {
  _detailsBtn = document.querySelector('.details__btn');
  _commentBtn = document.querySelector('.comments__btn');
  _recommendBtn = document.querySelector('.recommend__btn');

  _detailDetail = document.querySelector('.detail__detail');
  _detailComment = document.querySelector('.detail__comment');
  _detailRecommendations = document.querySelector('.detail__recommendations');

  constructor() {
    this._addHandlerClickShowNav();
  }

  _addHandlerClickShowNav() {
    this._detailsBtn.addEventListener('click', () => {
      this._detailDetail.classList.remove('shown-lg');
      if(!this._detailComment.classList.contains('shown-lg')) {
        this._detailComment.classList.add('shown-lg');
      }
      if(!this._detailRecommendations.classList.contains('shown-lg')) {
        this._detailRecommendations.classList.add('shown-lg');
      }
      if(!this._detailsBtn.classList.contains('nav__actived')) {
        this._detailsBtn.classList.toggle('nav__actived');
      }
      this._commentBtn.classList.remove('nav__actived');
      this._recommendBtn.classList.remove('nav__actived');
    });
    this._commentBtn.addEventListener('click', () => {
      this._detailComment.classList.remove('shown-lg');
      if(!this._detailDetail.classList.contains('shown-lg')) {
        this._detailDetail.classList.add('shown-lg');
      } 
      if(!this._detailRecommendations.classList.contains('shown-lg')) {
        this._detailRecommendations.classList.add('shown-lg');
      }
      if(!this._commentBtn.classList.contains('nav__actived')) {
        this._commentBtn.classList.toggle('nav__actived');
      }
      this._detailsBtn.classList.remove('nav__actived');
      this._recommendBtn.classList.remove('nav__actived');
    });
    this._recommendBtn.addEventListener('click', () => {
      this._detailRecommendations.classList.remove('shown-lg');
      if(!this._detailComment.classList.contains('shown-lg')) {
        this._detailComment.classList.add('shown-lg');
      }
      if(!this._detailDetail.classList.contains('shown-lg')) {
        this._detailDetail.classList.add('shown-lg');
      }
      if(!this._recommendBtn.classList.contains('nav__actived')) {
        this._recommendBtn.classList.toggle('nav__actived');
      }
      this._commentBtn.classList.remove('nav__actived');
      this._detailsBtn.classList.remove('nav__actived');
    });
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  // HyperText Markup Language
  _generateMarkup() {
    return /*html*/ `
    `;
  }
};

export default new DetailNavView();