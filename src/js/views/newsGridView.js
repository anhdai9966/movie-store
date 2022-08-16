class NewsGridView {
  _data;
  _parentElement = document.querySelector('.news__grid');

  render(data) {
    this._data = data;

    const markup = this._generateMarkup();

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = /*html*/ `
      <div class='spinner'>
        <ul class='line__list'>
          <li class='spinner__line'></li>
          <li class='spinner__line'></li>
          <li class='spinner__line'></li>
          <li class='spinner__line'></li>
          <li class='spinner__line'></li>
          <li class='spinner__line'></li>
          <li class='spinner__line'></li>
          <li class='spinner__line'></li>
          <li class='spinner__line'></li>
          <li class='spinner__line'></li>
        </ul>
      </div>
    `;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupCard).join('');
  }

  _generateMarkupCard(news) {
    return /*html */`
      <div class="news__item">
        <a href="#" class="image">
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