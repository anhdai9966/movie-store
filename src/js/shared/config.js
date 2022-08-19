// API https://www.themoviedb.org/
export const themoviedb = {
  API_URL: 'https://api.themoviedb.org/3',
  API_KEY: '19cceeb816328f42df0e6b332f489d75',
  LANGUAGE: 'vi',
};

// https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBDpgsyZOUhJ0ETZ_7FdF7dVA5wb2THdF8&type=video&q=avatar%20trailer&maxResults=10
export const youtubeSearch = {
  API_URL: 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBDpgsyZOUhJ0ETZ_7FdF7dVA5wb2THdF8&type=video&maxResults=24&q=',
};

export const youtubeClick = {
  API_URL: 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBDpgsyZOUhJ0ETZ_7FdF7dVA5wb2THdF8&type=video&maxResults=5&q=',
};

// v12
// https://script.google.com/macros/s/AKfycbwD1nTQ9mDGu47Fv4BKC45Yqx0bjtoM3tbrubxDFPZ8M15ctnoW8IZB0GPLC3LFkWMe/exec
export const googleSheetNews = {
  API_URL: 'https://script.google.com/macros/s/AKfycbzDcQM2yMhRk1o9mL6bLuNhOn7ygV5HPSjUA6xpkKXHY_K_Diuxwexmdj0Yw-LYPsJa/exec',
}

export const googleSheetUsers = {
  API_KEY: 'https://script.google.com/macros/s/AKfycbxgQZshMYOdwu4ySbhyfNwhRgmJ2vUUtzOxEW4HOvvMKu7gfqA-Z0rOQyBFg-fU8Y8vPQ/exec'
}

// API https://mockapi.io/
export const mockapi = {
  API_URL: 'https://62c46f2c7d83a75e39f9dad7.mockapi.io/api/'
}

// // JSON movie80
// export const MOVIE_80_JSON = '../json/movie80.json'

// Thời gian chờ gửi yêu cầu
export const TIMEOUT_SEC = 10;

// thông báo lỗi
export const ERROR_MESSAGE = 'Liên kết có thể bị hỏng hoặc trang này có thể đã bị gỡ.';

export const MESSAGE_DONT_BUY_CART = 'Tính năng mua bằng tiền không khả dụng';