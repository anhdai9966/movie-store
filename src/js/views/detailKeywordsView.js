class DetailKeywordsView {
  _data;
  _parentElement = document.querySelector('.keyword__list');

  render(data) {
    // 
    this._data = data;
    // lấy đánh dấu
    const markup = this._generateMarkup();
    // xóa nội dung hiện tại
    this._parentElement.innerHTML = '';
    // render nội dung mới
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(keyword) {
    return /*html*/ `
      <li class="keyword__item">
        <a href="./movie.html/#keyword/${keyword.id}" class="keyword__link">${keyword.name}</a>
      </li>
    `;
  }
}

export default new DetailKeywordsView();