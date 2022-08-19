class MessageView {
  _data;
  _parentElement = document.querySelector('.message__wrapper');

  render(data) {
    this._data = data;
    console.log(this._data);
    const markup = this._generateMarkup();

    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerShowMessage() {
    this._parentElement.classList.remove('hidden');
    setTimeout(() => {
      this._parentElement.firstElementChild.style.left = '0';
    }, 10);
    // 
    setTimeout(() => {
      this._parentElement.firstElementChild.style.left = '100%';
      // this._parentElement.classList.add('hidden');
    }, 3500);
  }

  _generateMarkup() {
    return /*html */ `
      <div class="message__main">
        <p class="message__content">${this._data}</p>
      </div>
    `;
  }
}

export default new MessageView();