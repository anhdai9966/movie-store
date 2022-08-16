import { pathPictureW1920, calcRuntime, translateVietnamese } from '../shared/helpers.js';

class DetailView {
  _data;
  _parentElement = document.querySelector('.detail__render');

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
    let hidden = '';
    if (!this._data.belongsToCollection) hidden = 'hidden' ;
    return /*html*/ `
      <h5 class="detail__title">Giới thiệu phim</h5>

      <div class="detail__description">
        <p class="detail__text--wrap">
          ${this._data.overview? this._data.overview : ''};
        </p>

        <button class="detail__btn--more hidden">Thêm</button>
      </div>

      <h5 class="detail__title ${hidden}">Có trong bộ</h5>

      <div class="detail__collection ${hidden}">
        <div class="collection__card">
          <a href="#" class="collection__backdrop">
            <img
              src="${this._data.belongsToCollection? pathPictureW1920(this._data.belongsToCollection.backdrop_path) : ''}"
              alt=""
              loading="lazy"
            />
          </a>

          <div class="collection__info">
            <a href="#" class="collection__title">
              <h6>${this._data.belongsToCollection? this._data.belongsToCollection.name : ''}</h6>
            </a>

            <p class="collection__genres hidden">
              <span>Giả tưởng</span>, <span>Hành động</span>, <span>phưu lưu</span>
            </p>
          </div>
        </div>
      </div>

      <h5 class="detail__title">Thông tin</h5>

      <div class="detail__info">
        <ul class="detail__info_list">
          <li class="detail__info_item">
            <span>Hãng phim</span>
            <span>${this._data.productionCompanies[0].name}</span>
          </li>
          <li class="detail__info_item">
            <span>Quốc gia</span>
            <span>${this._data.productionCountries[0].name}</span>
          </li>
          <li class="detail__info_item">
            <span>Tiêu đề gốc</span>
            <span>${this._data.originalTitle}</span>
          </li>
          <li class="detail__info_item">
            <span>Thể loại</span>
            <span>${this._data.genres.map(i => i.name).join(', ')}</span>
          </li>
          <li class="detail__info_item">
            <span>Phát hành</span>
            <span>${this._data.releaseDate}</span>
          </li>
          <li class="detail__info_item">
            <span>Độ dài</span>
            <span>${calcRuntime(this._data.runtime)}</span>
          </li>
          <li class="detail__info_item">
            <span>Trạng thái</span>
            <span>${translateVietnamese(this._data.status)}</span>
          </li>
          <li class="detail__info_item">
            <span>Ngôn ngữ chính</span>
            <span>${translateVietnamese(this._data.originalLanguage)}</span>
          </li>
        </ul>
      </div>
    `;
  }
}

export default new DetailView();