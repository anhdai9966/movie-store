// import icons from 'url:../../imgs/icons.svg';

export default class View {
  _data;


  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = /*html*/`
      <ul class="spinner">
        <li class="spinner__line"></li>
        <li class="spinner__line"></li>
        <li class="spinner__line"></li>
        <li class="spinner__line"></li>
        <li class="spinner__line"></li>
        <li class="spinner__line"></li>
        <li class="spinner__line"></li>
        <li class="spinner__line"></li>
        <li class="spinner__line"></li>
        <li class="spinner__line"></li>
      </ul>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}