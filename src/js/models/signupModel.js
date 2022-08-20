import { AJAX } from '../shared/helpers.js';

import { googleUsers } from '../shared/config.js';

export let state = {
  account: {
    email: '',
    password: '',
  },
  resAccount: {},
  infoAccount: {
    id: '',
    email: '',
    xu: '',
    name: '',
    gender: '',
    year: '',
    creditId: '',
    momopay: '',
    avata: '',
    action: 'update',
  }
};

// v2 https://script.google.com/macros/s/AKfycbxuqfiFMv85RVY3vQqo98lAzUcQwkOlYwAezCi5M0BKcJQuIhp-KQRE0olHcv6DjJ8LhQ/exec
export const lognup = async function (dt) {
  try {
    const res = await fetch(
      'https://script.google.com/macros/s/AKfycbxuqfiFMv85RVY3vQqo98lAzUcQwkOlYwAezCi5M0BKcJQuIhp-KQRE0olHcv6DjJ8LhQ/exec',
      {
        method: 'POST',
        body: JSON.stringify(dt),
      },
    );

    const data = await res.json();
    const { result, signup, status } = data;

    state.resAccount = {
      created_at: result.created_at,
      email: result.email,
      id_user: result.id_user,
      token: result.token,
      password: result.password,
      signup: signup,
      status: status,
    };

    if (!res.ok) throw new Error(`${data.status} (${res.status})`);
  } catch (error) {
    console.log(error);
  }
};
// v2 https://script.google.com/macros/s/AKfycbw08pAHnPpTt3fUjXyMcJOK6vfAkh_3gd_XIlnjw7Bhhxum6bi9FtKv7agyc0RB5vaY/exec
export const updateInfo = async function (dt) {
  try {
    const res = await fetch(
      'https://script.google.com/macros/s/AKfycbw08pAHnPpTt3fUjXyMcJOK6vfAkh_3gd_XIlnjw7Bhhxum6bi9FtKv7agyc0RB5vaY/exec',
      {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(dt),
      },
    );
      console.log(res);
    if (!res.ok) throw new Error(`${data.status} (${res.status})`);
  } catch (error) {
    console.log(error);
  }
};


export const addEmailPassword = function (email = '', password = '') {
  state.account.email = email;
  state.account.password = password;
};
export const addNameYear = function (na = '', ye = '') {
  state.infoAccount.name = na;
  state.infoAccount.year = ye;
};

// lưu vào local
export const persistLocalAccount = function () {
  localStorage.setItem('account', JSON.stringify(state.account));
};
// lưu vào session
export const persistSessionAccount = function () {
  sessionStorage.setItem('account', JSON.stringify(state.account));
};
// nạp dữ liệu từ local session
const init = function () {
  sessionStorage.setItem('email', JSON.stringify(state.account.email));

  const sessionStorageEmail = localStorage.getItem('email');
  if (sessionStorageEmail) state.account.email = JSON.parse(sessionStorageEmail);
};
init();
