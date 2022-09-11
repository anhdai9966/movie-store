class SidebarView {
  _parentElement = document.querySelector('.sidebar')
  _sidebar = document.querySelector('.sidebar__main')
  _btnClose = document.querySelector('.header__btn-sidebar--close')
  _overlay = document.querySelector('.sidebar__overlay')

  // đă ký chay các hàm khi tạo class
  constructor() {
    this._addHandlerClickBtnClose();
    this._addHandlerClickOverlay();
    this._addHandlerMediaQuery992();
  }

  // xử lý khi được gọi
  showSidebar() {
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
  // khi click vào nút đóng
  _addHandlerClickBtnClose() {
    this._btnClose.addEventListener('click', this.closeSidebar.bind(this));
  }
  // khi click ra overlay
  _addHandlerClickOverlay() {
    this._overlay.addEventListener('click', this.closeSidebar.bind(this));
  }

  // xử lý khi thay đổi kích thước màn hình
  _addHandlerMediaQuery992() {
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
}

export default new SidebarView();