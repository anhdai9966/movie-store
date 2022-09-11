class DetailNavView {
  _detailsBtn = document.querySelector('.tab__btn-detail');
  _commentBtn = document.querySelector('.tab__btn-comment');
  _recommendBtn = document.querySelector('.tab__btn-similar');

  _detailDetail = document.querySelector('.detail__detail');
  _detailComment = document.querySelector('.detail__comment');
  _detailRecommendations = document.querySelector('.detail__recommendations');

  constructor() {
    this._addHandlerClickShowNav();
  }

  _addHandlerClickShowNav() {
    this._detailsBtn.addEventListener('click', () => {
      this._detailDetail.classList.remove('hidden-maw-lg');
      if(!this._detailComment.classList.contains('hidden-maw-lg')) {
        this._detailComment.classList.add('hidden-maw-lg');
      }
      if(!this._detailRecommendations.classList.contains('hidden-maw-lg')) {
        this._detailRecommendations.classList.add('hidden-maw-lg');
      }
      if(!this._detailsBtn.classList.contains('tab__btn--actived')) {
        this._detailsBtn.classList.toggle('tab__btn--actived');
      }
      this._commentBtn.classList.remove('tab__btn--actived');
      this._recommendBtn.classList.remove('tab__btn--actived');
    });
    this._commentBtn.addEventListener('click', () => {
      this._detailComment.classList.remove('hidden-maw-lg');
      if(!this._detailDetail.classList.contains('hidden-maw-lg')) {
        this._detailDetail.classList.add('hidden-maw-lg');
      } 
      if(!this._detailRecommendations.classList.contains('hidden-maw-lg')) {
        this._detailRecommendations.classList.add('hidden-maw-lg');
      }
      if(!this._commentBtn.classList.contains('tab__btn--actived')) {
        this._commentBtn.classList.toggle('tab__btn--actived');
      }
      this._detailsBtn.classList.remove('tab__btn--actived');
      this._recommendBtn.classList.remove('tab__btn--actived');
    });
    this._recommendBtn.addEventListener('click', () => {
      this._detailRecommendations.classList.remove('hidden-maw-lg');
      if(!this._detailComment.classList.contains('hidden-maw-lg')) {
        this._detailComment.classList.add('hidden-maw-lg');
      }
      if(!this._detailDetail.classList.contains('hidden-maw-lg')) {
        this._detailDetail.classList.add('hidden-maw-lg');
      }
      if(!this._recommendBtn.classList.contains('tab__btn--actived')) {
        this._recommendBtn.classList.toggle('tab__btn--actived');
      }
      this._commentBtn.classList.remove('tab__btn--actived');
      this._detailsBtn.classList.remove('tab__btn--actived');
    });
  }
};

export default new DetailNavView();