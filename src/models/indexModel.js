import { AJAX } from '../shared/helpers.js';
import { googleUsers, googleInfoUsers } from '../shared/config.js';

import movie80 from '../jsons/movie80.json';
import movie2 from '../jsons/movie2.json';
import movie6 from '../jsons/movie6.json';

// biến trung gian lưu trữ
export let state = {
  movie80: [],
  movie2: [],
  movie6: [],
  account: {
    signin: false,
    message: 'Đăng nhập thất bại',
  },
  info: {
    info: false,
    message: "Lấy thông tin thất bại",
  },
  confirm: {
    confirm: false,
    message: "Không thể xác nhận email",
  },
  createPassword: {
    signup: false,
    update: false,
    message: 'Cập nhật không thành công',
  },
  email: '',
};

// load accound, kiểm tra tài khoản đúng hoặc sai
// v3 https://script.google.com/macros/s/AKfycbyRaEoAaUBx7x84DLS3iSWn-XzQJhVfvhb-b7NpkHg7UPXtq18zOfNw2xJ5wy_RHlPx4w/exec?email=dailc9966@gmail.com&password=Dathaydoi
// gửi dữ liệu: method get
// var email = 'huy@gmail.com';
// var password = '123456';
// var action ='delete;
// var passwordEnco = '$uAuSjku3j)u';

// gửi dữ liệu: method post
// var email = 'huy@gmail.com';
// var password = '123456';
// var action = 'update;
// var passwordUpdate = 'abcdef';

/**
 * 
 * @param {str} mail email đăng nhập
 * @param {str} pass password đăng nhập
 */
export const lognin = async function (mail, pass) {
  try {
    const res = await AJAX(`${googleUsers.API_KEY}?email=${mail}&password=${pass}`);
    
    const {signin, id, email, password, status} = res;
    
    if (signin) {
      state.account = {
        id: id,
        email: email,
        password: password,
        signin: signin,
        status: status,
        message: 'Đăng nhập thành công',
      }
    }
    await loadInfo(id);
  } catch (error) {
    console.log(error);
  }
}

export const loadInfo = async function (id, action = 'update') {
  try {
    const res = await AJAX(`${googleInfoUsers.API_KEY}?id=${id}`);
    
    state.info = {
      status: res.status,
      info: res.info,
      message: res.message,
      accountInfo: {
        id: res.user_info.id,
        email: res.user_info.email,
        xu: res.user_info.xu,
        name: res.user_info.name,
        gender: res.user_info.gender,
        birth: res.user_info.birth,
        credit: res.user_info.credit,
        momopay: res.user_info.momopay,
        avatar: res.user_info.avatar,
        action: action,
      }
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * 
 * @param {obj} data ở dạng đối tượng được truyền vào
 */
export const confirm = async function (data) {
  try {
    const res = await AJAX(googleUsers.API_KEY, data);
    
    state.confirm = {
      status: res.status,
      confirm: res.confirm,
      confirmNumber: res.confirm_number,
      message: res.message,
    }
  } catch (error) {
    console.log(error);
  }
}
// change password
/**
 * 
 * @param {obj} data đối tượng được truyền vào
 */
export const createPassword = async function (data) {
  try {
    const res = await AJAX(googleUsers.API_KEY, data);
    
    state.createPassword = {
      message: res.message,
      signup: res.signup,
      status: res.status,
      update: res.update,
    }
  } catch (error) {
    console.log(error);
  }
}

// lưu email khi người dùng nhập vào ô input phần banner
export const addEmailInput = function (val) {
  state.email = val;

  // lưu vào sesstion
  persistSessionEmail();
}

// lưu account vào local
export const persistLocalAccount = function () {
  localStorage.setItem('account', JSON.stringify(state.account));
  localStorage.setItem('info', JSON.stringify(state.info));
}
// lưu account vào session
export const persistSessionAccount = function () {
  sessionStorage.setItem('account', JSON.stringify(state.account));
  sessionStorage.setItem('info', JSON.stringify(state.info));
}
// lưu email vào session
export const persistSessionEmail = function () {
  sessionStorage.setItem('email', JSON.stringify(state.email));
}

export const removeAccount = function () {
  // xóa trong local & session
  localStorage.removeItem('account');
  sessionStorage.removeItem('account');
  localStorage.removeItem('info');
  sessionStorage.removeItem('info');
  localStorage.removeItem('querys');
  localStorage.removeItem('purchases');
  localStorage.removeItem('bookmarks');
  localStorage.removeItem('historys');
  // reset account
  state.account = {
    signin: false,
    message: 'Đăng nhập thất bại',
    email: '',
    password: '',
    status: '',
  }
}

// nạp dữ liệu từ local, session vào state nếu có
const init = function () {
  const localStorageAcc = localStorage.getItem('account');
  if (localStorageAcc) state.account = JSON.parse(localStorageAcc);

  const sessionStorageAcc = sessionStorage.getItem('account');
  if (sessionStorageAcc) state.account = JSON.parse(sessionStorageAcc);
};
init();

// load dữ liệu tạo sẵn 80 pic
export const loadMovie80 = async function() {
  try {
    state.movie80 = movie80.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        backdropPath: rec.backdropPath,
        posterPath: rec.posterPath,
      };
    });

  } catch (error) {
    console.log(error)
    throw err;
  }
}

// load dữ liệu tạo sẵn 2 pic
export const loadMovie2 = async function() {
  try {
    state.movie2 = movie2.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        backdropPath: rec.backdropPath,
        posterPath: rec.posterPath,
      };
    });

  } catch (error) {
    console.log(error)
    throw err;
  }
}

// load dữ liệu tạo sẵn 6 pic
export const loadMovie6 = async function() {
  try {
    state.movie6 = movie6.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        backdropPath: rec.backdropPath,
        posterPath: rec.posterPath,
      };
    });

  } catch (error) {
    console.log(error)
    throw err;
  }
}