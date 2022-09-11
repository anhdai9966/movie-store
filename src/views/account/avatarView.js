import View from '../View.js';

import icons from 'url:../../images/icons.svg';

class AvatarView extends View {
  _parentElement = document.querySelector('.avatar');

  _generateMarkup() {
    return /*html*/`
      <svg class="avatar__icon">
        <use href="${icons}#icon-user"></use>
      </svg>

      <h2>Xin chào, ${this._data.name}</h2>
    `
  }
}
export default new AvatarView();