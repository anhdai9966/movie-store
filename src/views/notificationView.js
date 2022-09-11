import View from './View.js';

import { NOTIFICATION_TIMEOUT_SEC } from '../shared/config.js';

class NotificationView extends View {
  _parentElement = document.querySelector('.notification');

  addHandlerNotification() {
    this._parentElement.classList.remove('hidden');

    // tạo trễ để xem được chuyển động của transition
    setTimeout(() => {
      this._parentElement.firstElementChild.style.left = '0';
    }, 10);

    // tạo trễ chờ bao nhiêu giây để đóng notificaiton
    setTimeout(() => {
      this._parentElement.firstElementChild.style.left = '100%';
    }, NOTIFICATION_TIMEOUT_SEC * 1000);

    // tạo trễ để xem được chuyển động của transition
    setTimeout(() => {
      this._parentElement.classList.add('hidden');
    }, NOTIFICATION_TIMEOUT_SEC * 1000 + 300);
  }

  _generateMarkup() {
    return /*html */ `
      <div class="notification__wrapper--transition-x">
        <p class="notification__content">${this._data}</p>
      </div>
    `;
  }
}

export default new NotificationView();