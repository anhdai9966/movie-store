import icons from 'url:../../imgs/icons.svg';

export default class View {
  _data; // data này có thể dùng ở nhiều nơi

  // render ra giao diện
  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    // xóa nội dung hiện tại
    this._clear();
    // render nội dung mới
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  
  // phương thức xóa nội dung cũ
  _clear() {
    this._parentElement.innerHTML = '';
  }

  // giao diện chờ
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
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = /*html*/ `
      <h3>Rất tiếc, trang này hiện không khả dụng.</h3>
      <p>
        <span>${message}</span> 
        <a href="#">Quay lại MovieStore</a>
      </p>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}