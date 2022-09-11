import icons from 'url:../images/icons.svg'; // parcel 2.*

export default class View {
  _data;
  _certification;

  // render dữ liệu mặc định là phần tử cha
  render(data, certification = undefined) {
    this._data = data;
    
    if (certification) this._certification = certification;

    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // update dom
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  // scroll
  addHandlerScrollRender(handler, point = 10) {
    let scrollHeight = -1;
    window.addEventListener('scroll', () => {
      if(document.documentElement.scrollTop > point && scrollHeight < document.documentElement.scrollTop) {
        scrollHeight = document.documentElement.scrollTop;
        
        handler();
      }
    })
  }

  // xóa hết nội dung trong element
  _clear() {
    this._parentElement.innerHTML = '';
  }

  // render loading
  renderLoading() {
    const markup = /*html*/`
      <div class="loading">
        <svg class="loading__spinner">
          <use href='${icons}#icon-loading'></use>
        </svg>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // lấy số lượng child trong element
  get getChildElementCount() {
    return this._parentElement.children.length;
  }
}