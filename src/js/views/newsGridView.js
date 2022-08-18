import icons from 'url:../../imgs/icons.svg';
class NewsGridView {
  _data;
  _parentElement = document.querySelector('.news__grid');
  _errorMessage = 'Rất tiếc, trang này hiện không khả dụng.'

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

    const markup = this._generateMarkup();

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
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
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupCard).join('');
  }

  _generateMarkupCard(news) {
    return /*html */`
      <div class="news__item">
        <a href="./detailNews.html#${news.id}" class="image">
          <img src="${news.imageUrl}" alt="${news.title}">
        </a>
        
        <div class="text">
          <a href="#"><h6 class="title">${news.title}</h6></a>

          <p class="description">${news.description}</p>

          <p class="time">
            2 ngày trước
          </p>
        </div>
      </div>
    `;
  }
}

export default new NewsGridView();