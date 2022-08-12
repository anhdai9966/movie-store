import View from './View.js';

class SidebarView extends View {
  _parentElement = document.querySelector('.header__sidebar');
  _sidebar = document.querySelector('.sidebar')
  _sidebarBtnClose = document.querySelector('.sidebar__btn--close')

  // đă ký chay các hàm khi tạo class
  constructor() {
    super();
    this._addHandlerCloseSidebar();
    this._addHandlerCloseSidebarMediaQuery();
  }

  // xử lý khi được gọi
  addHandlerShowSidebar() {
    // xóa ẩn
    this._parentElement.classList.remove('hidden');
    // chờ để nhìn được hiệu ứng chuyển động
    setTimeout(() => {
      this._sidebar.style.left = 0;
    }, 10);
    // chặn body có thể scroll
    // window.onscroll = () => window.scroll(0, 0);
    document.body.style.overflow = 'hidden';
  }

  closeSidebar() {
    // chạy sidebar vào trong
    this._sidebar.style.left = '-280px';
    // chờ để nhìn được hiệu ứng chuyển động
    setTimeout(() => {
      this._parentElement.classList.add('hidden');
    }, 300);
    // chặn body có thể scroll
    // window.onscroll = () => window.scroll(0, 0);
    document.body.style.overflow = 'auto';
  }

  // xử lý đóng side bar
  _addHandlerCloseSidebar() {
    // khi click vào nút đóng
    this._sidebarBtnClose.addEventListener('click', this.closeSidebar.bind(this));
    // khi click ra ngoài
    this._parentElement.addEventListener('click', this.closeSidebar.bind(this));
  }

  // xử lý khi thay đổi kích thước màn hình
  _addHandlerCloseSidebarMediaQuery() {
    // Tạo điểm cuối kích thức cửa sổ rộng ít nhất 992px
    const mediaQuery = window.matchMedia(`(min-width: 992px)`);
    // đăng ký với trình nghe sự kiện
    mediaQuery.addListener(e => {
      // nếu lớn hơn 992 thì xử lý 
      if (e.matches) {
        // gọi lại method trong class
        this.closeSidebar.call(this);
      }
    });
  }
  
  _generateMarkup() {
    return /*html*/ `
      
    `;
  }
}

export default new SidebarView();