import { AJAX } from '../shared/helpers.js';
import { googleUsers, googleInfoUsers } from '../shared/config.js';
import movie2 from '../jsons/movie2.json';
// biến trung gian lưu trữ
export let state = {
  dataAccount: {
    email: '',
    password: '',
  },
  account: {
    message: '',
    signup: false,
  },
  dataInfo: {
    id: '', 
    email: '', 
    name: '', 
    gender: '', 
    birth: '', 
    credit: '', 
    momopay: '', 
    avatar: '',
  },
  info: {},
  purchases: [],
}

// tạo tài khoản api
export const signup = async function (data) {
  try {
    const res = await AJAX(googleUsers.API_KEY, data);
    console.log('🚀 ~ signup ~ res', res)

    if (res.signup) {
      state.account = {
        email: res.account.email,
        idUser: res.account.id_user,
        password: res.account.password,
        message: res.message,
        signup: res.signup,
        status: res.status,
      };
      
      state.dataInfo.id = res.account.id_user;
      state.dataInfo.email = res.account.email;
    } else {
      state.account = {
        message: res.message,
        signup: res.signup,
        status: res.status,
      };
    };

    
  } catch (error) {
    console.log(error);
  }
};
// tạo thông tin api
export const createInfo = async function (data) {
  try {
    const res = await AJAX(googleInfoUsers.API_KEY, data);

    state.info = {
      info: res.info,
      message: res.message,
      status: res.status,
      avatar: res.user_info.avatar,
      birth: res.user_info.birth,
      credit: res.user_info.credit,
      email: res.user_info.email,
      gender: res.user_info.gender,
      id: res.user_info.id,
      momopay: res.user_info.momopay,
      name: res.user_info.name,
      xu: res.user_info.xu,
    }
  } catch (error) {
    console.log(error);
  }
};

// get name birth
export const getNameBirth = function (data) {
  state.dataInfo.name = data.name;
  state.dataInfo.birth = data.birth;
}

export const giftMovie = function () {
  movie2.forEach(movie => {
    state.purchases.push(movie);
  })
  // thêm vào local
  persistPurchases();
}

const persistPurchases = function () {
  localStorage.setItem('purchases', JSON.stringify(state.purchases));
};

// nạp dữ liệu từ local, session vào state nếu có
const init = function () {
  const sessionStorageEmail = sessionStorage.getItem('email');
  if (sessionStorageEmail) state.dataAccount.email = JSON.parse(sessionStorageEmail);

  const storagePurchases = localStorage.getItem('purchases');
  if (storagePurchases) state.purchases = JSON.parse(storagePurchases);
};
init();