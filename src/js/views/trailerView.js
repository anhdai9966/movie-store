class TrailerView {
  _data;
  _parentElement = document.querySelector('.trailer__overlay');
  _wrapperElement = this._parentElement.querySelector('.trailer__wrapper');
  _showElement = this._parentElement.querySelector('.trailer__show');

  constructor() {
    this._addHandlerCloseTrailer();
    this._addHandlerCloseTrailerOverlay();
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerShowTrailer() {
    this._parentElement.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      this._wrapperElement.style.opacity = '1';
      this._wrapperElement.style.top = '50%';
      this._wrapperElement.style.left = '50%';
    }, 100);
  }

  _addHandlerCloseTrailer() {
    document.addEventListener('click', (e) => {
      const btnClose = e.target.closest('.trailer__btn--close');

      if(!btnClose) return ;

      this._wrapperElement.style.top = '100%';
      this._wrapperElement.style.left = '0';
      this._wrapperElement.style.opacity = '0';
      
      setTimeout(() => {
        this._parentElement.classList.add('hidden');
        this._showElement.innerHTML = '';
      }, 250);
      document.body.style.overflow = 'auto';
    })
  }

  _addHandlerCloseTrailerOverlay() {
    this._parentElement.addEventListener('click', (e) => {
      this._wrapperElement.style.top = '100%';
      this._wrapperElement.style.left = '0';
      this._wrapperElement.style.opacity = '0';

      setTimeout(() => {
        this._parentElement.classList.add('hidden');
        this._showElement.innerHTML = '';
      }, 250);
      document.body.style.overflow = 'auto';
    })
  }

  render(data) {
    // 
    this._data = data;
    // lấy đánh dấu
    const markup = this._generateMarkup();
    // xóa nội dung hiện tại
    this._showElement.innerHTML = '';
    // render nội dung mới
    this._showElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = /*html*/ `
    <div class="spinner__render">
    <ul class="spinner">
      <li class="seen"></li>
      <li class="seen"></li>
      <li class="seen"></li>
      <li class="seen"></li>
      <li class="seen"></li>
      <li class="seen"></li>
      <li class="seen"></li>
      <li class="seen"></li>
      <li class="seen"></li>
      <li class="seen"></li>
    </ul>
  </div>
    `;
    this._showElement.innerHTML = '';
    this._showElement.insertAdjacentHTML('afterbegin', markup);
  }

  // HyperText Markup Language
  _generateMarkup() {
    return /*html*/ `
      <iframe src="https://www.youtube.com/embed/${this._data.videoId}" title="${this._data.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;
  }
};

export default new TrailerView();