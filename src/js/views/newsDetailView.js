class NewsGridView {
  _data;
  _parentElement = document.querySelector('.news__render');
  _titleElement = document.querySelector('.title__render');
  _sourceElement = document.querySelector('.source__render');

  render(data) {
    this._data = data;

    const markup = this._generateMarkup();
    const markup2 = this._generateMarkupTitle();
    const markup3 = this._generateMarkupSource();

    const converter = new showdown.Converter();

    const html = converter.makeHtml(markup);

    this._titleElement.innerHTML = '';
    this._titleElement.insertAdjacentHTML('afterbegin', markup2);
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', html);
    this._sourceElement.innerHTML = '';
    this._sourceElement.insertAdjacentHTML('afterbegin', markup3);
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

  _generateMarkup() {
    return this._data.content;
  }

  _generateMarkupTitle() {
    return /*html */` 
      <h2>${this._data.title}</h2>
      
      <p class="author">Người viết: ${this._data.author}</p>
    `;
  }
  _generateMarkupSource() {
    return /*html */` 
      <p class="source__name">Theo ${this._data.nameSource}<a href="${this._data.sourceUrl}" target="_blank">Click vào đây</a></p>
    `;
  }
}

export default new NewsGridView();