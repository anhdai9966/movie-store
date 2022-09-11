import { pathPictureW138 } from '../../shared/helpers.js';

class DetailCrewView {
  _director;
  _writer;
  _parentElement = document.querySelector('.detail__crew');

  render(director, writer) {
    // 
    this._director = director;
    this._writer = writer;
    // lấy đánh dấu
    const markup = this._generateMarkup();
    // xóa nội dung hiện tại
    this._parentElement.innerHTML = '';
    // render nội dung mới
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return /*html*/ `
      <h6 class="detail__subtitle">Đạo diễn</h6>
    
      <p>${this._director.name}</p>

      <h6 class="detail__subtitle">Biên kịch</h6>

      <p>${this._writer? this._writer.name : 'Trống'}</p>
    `;
  }
}

export default new DetailCrewView();