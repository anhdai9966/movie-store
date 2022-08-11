export let state = {

};

function handlerWidthChange(mediaQuery, handler) {
  // kiểm tra nếu kích thước width đúng
  if (mediaQuery.matches) {
    handler();
  }
}

export const handlerMediaQuery = function(minWidth ,handler) {
  // Tạo điểm kích thức cửa sổ rộng ít nhất 992px
  const mediaQuery = window.matchMedia(`(min-width: ${minWidth}px)`);
  // đăng ký trình nghe sự kiện
  mediaQuery.addListener(handlerWidthChange);
  // khởi chạy hàm
  handlerWidthChange(mediaQuery, handler);
}