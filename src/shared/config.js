// API https://www.themoviedb.org/
export const themoviedb = {
  API_URL: 'https://api.themoviedb.org/3',
  API_KEY: '19cceeb816328f42df0e6b332f489d75',
  LANGUAGE: 'vi',
};
// giá thành
export const cost = {
  BUY: '180000',
  RENT: '60000',
}
// api pro
export const apiPro = {
  nowPlaying: 'movie/now_playing',
  popular: 'movie/popular',
  topRate: 'movie/top_rated',
  upcoming: 'movie/upcoming',
  genres: 'discover/movie',
  search: 'search/movie',
}
export const apiSubPro = {
  action: 'with_genres=28',
  cartoon: 'with_genres=16',
  horror: 'with_genres=27',
  year: 'primary_release_year=',
  query: 'query=',
}
// state pro
export const statePro = {
  nowPlaying: 'nowPlaying',
  popular: 'popular',
  topRate: 'topRated',
  upcoming: 'upcoming',
  action: 'action',
  cartoon: 'cartoon',
  horror: 'horror',
  trailer: 'trailer',
  trailers: 'trailers',
  news: 'news',
  peoples: 'peoples',
  genres: 'genres',
  similar: 'similar',
  recommendations: 'recommendations',
}
// youtube api
// https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=trailer%202022&key=[YOUR_API_KEY]
export const youtube = {
  API_URL: 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyA3I44RNj6buHPOL1F2CX8jlSaBFkolmKI',
};
// export const youtubeSearch = {
//   API_URL: 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBDpgsyZOUhJ0ETZ_7FdF7dVA5wb2THdF8&type=video&maxResults=20&q=',
// };
// export const youtubeClick = {
//   API_URL: 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBDpgsyZOUhJ0ETZ_7FdF7dVA5wb2THdF8&type=video&maxResults=5&q=',
// };
// v12
export const googleSheetNews = {
  API_URL: 'https://script.google.com/macros/s/AKfycbzDcQM2yMhRk1o9mL6bLuNhOn7ygV5HPSjUA6xpkKXHY_K_Diuxwexmdj0Yw-LYPsJa/exec',
}
// v7
export const googleUsers = {
  API_KEY: 'https://script.google.com/macros/s/AKfycbyljpvniKLaryjsmCmn1Cqqkzhr2ArCxws5dVeLEXgpQBOXx04dWlZZQMq3j1ykuwT4Xw/exec',
}
// v7
export const googleInfoUsers = {
  API_KEY: 'https://script.google.com/macros/s/AKfycbyt8zhTxYzig60eRzVu8R11EGMCSBfxlgOHBlT3RbiAfYkBQZ0TqS2uW1qZdTlxfAtW/exec',
}

// API https://mockapi.io/
// export const mockapi = {
//   API_URL: 'https://62c46f2c7d83a75e39f9dad7.mockapi.io/api/',
// }

// Số ký tự mật khẩu
export const NUMBER_CHAR_PASSWORD = 6;
// Thời gian chờ gửi yêu cầu
export const TIMEOUT_SEC = 10;
// Thời gian hiển thị notification
export const NOTIFICATION_TIMEOUT_SEC = 3.5;
export const NOTIFICATION_NOT_SUPPORT = 'Ứng dụng này chưa được hỗ trợ';
// thông báo lỗi
export const ERROR_MESSAGE = 'Liên kết có thể bị hỏng hoặc trang này có thể đã bị gỡ.';
export const MESSAGE_DONT_BUY_CART = 'Tính năng mua bằng tiền không khả dụng';
export const NOTIFICATION_FORGETPASSWORD = 'Bạn phải nhập Email';
export const CONFIRM_NUMBER = 123;
export const NOTIFICATION_CONFIRM_NUMBER = 'Mã xác nhận email là 123';
export const NOTIFICATION_CONFIRM_WRONG = 'Mã xác nhận không chính xác';
export const NOTIFICATION_WRONG_PASSWORD = 'Mật khẩu nhập lại không chính xác';
export const WARNING_TITLE_SIGNOUT = 'Bạn có muốn đăng xuất!';
export const NOTIFICATION_ERROR_CREATE = 'Email hoặc mật khẩu nhập chưa chính xác';
export const NOTIFICATION_CONFIRM_ERROR_CREATE = 'Tài khoản này đã tồn tại';
export const NOTIFICATION_CONFIRM_CORRECT = 'Xác nhận thành công';
export const NOTIFICATION_CONFIRM = 'Sai mã xác nhận';


// tạo các breakpoint min width và maxwidth
export const BREAKPOINTS_MIN_WIDTH_1 = [
  { width: 0, item: 20 },
  { width: 576, item: 3 },
  { width: 768, item: 4 },
  { width: 992, item: 5 },
  { width: 1200, item: 6 },
];
export const BREAKPOINTS_MAX_WIDTH_1 = [
  { width: 576, item: 20 },
  { width: 768, item: 3 },
  { width: 992, item: 4 },
  { width: 1200, item: 5 },
  { width: 1920, item: 6 },
];
export const BREAKPOINTS_MIN_WIDTH_2 = [
  { width: 576, item: 3 },
  { width: 768, item: 6 },
  { width: 1200, item: 9 },
];
export const BREAKPOINTS_MAX_WIDTH_2 = [
  { width: 768, item: 3 },
  { width: 1200, item: 6 },
  { width: 1920, item: 9 },
];
export const BREAKPOINTS_MIN_WIDTH_3 = [
  { width: 0, item: 20 },
  { width: 576, item: 2 },
  { width: 768, item: 3 },
  { width: 992, item: 4 },
];
export const BREAKPOINTS_MAX_WIDTH_3 = [
  { width: 576, item: 20 },
  { width: 768, item: 2 },
  { width: 992, item: 3 },
  { width: 1920, item: 4 },
];
export const BREAKPOINTS_MIN_WIDTH_4 = [
  { width: 0, item: 20 },
  { width: 576, item: 4 },
  { width: 768, item: 5 },
  { width: 992, item: 6 },
];
export const BREAKPOINTS_MAX_WIDTH_4 = [
  { width: 576, item: 20 },
  { width: 768, item: 4 },
  { width: 992, item: 5 },
  { width: 1920, item: 6 },
];