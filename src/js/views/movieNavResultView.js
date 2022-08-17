class MovieNavView {
  _data;
  _parentElement = document.querySelector('.main__nav');
  _renderElement = this._parentElement.querySelector('.result__grid');

  render(data) {
    this._data = data;

    const markup = this._generateMarkup();

    this._renderElement.innerHTML = '';
    this._renderElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  // giao diện chờ
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

  _generateMarkup() {
    return this._data.map(this._generateMarkupCard).join('');
  }

  _generateMarkupCard(data) {
    return /*html */`
      <a href="#${data.prefix}=${data.id}" class="result__item">${data.name}</a>
    `;
  }
}

export default new MovieNavView();
