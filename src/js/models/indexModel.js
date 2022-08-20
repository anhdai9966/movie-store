import { AJAX } from '../shared/helpers.js';
import { themoviedb, googleUsers } from '../shared/config.js';

import movie80 from '../../json/movie80.json';
import movie2 from '../../json/movie2.json';
import movie6 from '../../json/movie6.json';

export let state = {
  movie80: [],
  movie2: [],
  movie6: [],
  account: {
    signin: false,
    email: '',
    password: '',
    token: '',
  },
  email: '',
};

export const loadMovie80 = async function() {
  try {
    const data = movie80; // arr

    state.movie80 = data.map(rec => {
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

export const loadMovie2 = async function() {
  try {
    const data = movie2; // arr

    state.movie2 = data.map(rec => {
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

export const loadMovie6 = async function() {
  try {
    const data = movie6; // arr

    state.movie6 = data.map(rec => {
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

// load accound
// https://script.google.com/macros/s/AKfycbxgQZshMYOdwu4ySbhyfNwhRgmJ2vUUtzOxEW4HOvvMKu7gfqA-Z0rOQyBFg-fU8Y8vPQ/exec?email=dailc9966@gmail.com&password=Dathaydoi
// gửi dữ liệu: email, password, passwordEnco, || action data để sửa dữ liệu
// status": "success",
// "signin": true,
// "email": "dailc9966@gmail.com",
// "password": "YaSfYb9tSceu)cSb}f",
// "token": "4l70g206t"
// đăng nhập thất bại
// messega: "Account does not exist!"
// signin: false
// status: "fail"


export const lognin = async function (em, pass) {
  try {
    // const res = await AJAX(`${googleUsers}?email=${email}&password=${password}`);
    const res = await fetch(`https://script.google.com/macros/s/AKfycbxgQZshMYOdwu4ySbhyfNwhRgmJ2vUUtzOxEW4HOvvMKu7gfqA-Z0rOQyBFg-fU8Y8vPQ/exec?email=${em}&password=${pass}`);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const {signin, email, password, token, status, messega} = data;

    if (signin) {
      state.account = {
        signin: signin,
        email: email,
        password: password,
        token: token,
      }
    }
  } catch (error) {
    console.log(error);
  }
}
// lưu vào local
export const persistLocalAccount = function () {
  localStorage.setItem('account', JSON.stringify(state.account));
}
// lưu vào session
export const persistSessionAccount = function () {
  sessionStorage.setItem('account', JSON.stringify(state.account));
}

export const addEmailInput = function (val) {
  state.email = val
}
// lưu vào session
export const persistSessionEmail = function () {
  localStorage.setItem('email', JSON.stringify(state.email));
}
// nạp dữ liệu từ local
const init = function () {
  const storageAcc = localStorage.getItem('account');
  if (storageAcc) state.account = JSON.parse(storageAcc);

  const sessionStorageAcc = sessionStorage.getItem('account');
  if (sessionStorageAcc) state.account = JSON.parse(sessionStorageAcc);
};
init();