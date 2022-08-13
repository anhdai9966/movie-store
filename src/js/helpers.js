import { TIMEOUT_SEC } from './config.js';

// tạo lỗi về thời gian yêu từ api
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Yêu cầu mất nhiều thời gian! Đã đợi hết ${s} giây`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    // tạo lỗi api themoviedb.org
    if (!res.ok) throw new Error(`${data.status_message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};

// mockapi
// if (url.includes('mockapi')) {
//   if (!res.ok) throw new Error(`${res.statusText}, ${res.url}, ${data}`);
// }

// tính số ngày giờ phút từ một số nguyên
export const calcRuntime = function (runtime) {
  const hour = Math.floor(runtime / 60);
  const minute = runtime % 60;
  let day = 0;

  while (hour > 24) {
    hour -= 24;
    day++;
  };

  const strTime = `${day ? day + ' ngày' : hour + ' giờ ' + minute + ' phút'}`;
  return strTime;
};

// lấy đường dẫn đầy đủ với width 1920px
export const pathPictureW1920 = function(path) {
  return `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${path}`;
};

// lấy đường dẫn đầy đủ với width 600px
export const pathPictureW600 = function(path) {
  return `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${path}`;
};

// lấy đường dẫn đầy đủ với width 533px
export const pathPictureW533 = function(path) {
  return `https://www.themoviedb.org/t/p/w533_and_h300_bestv2${path}`;
};

// lấy đường dẫn đầy đủ với width 220px
export const pathPictureW220 = function(path) {
  return `https://www.themoviedb.org/t/p/w220_and_h330_face${path}`;
};

// dịch sang ngôn ngữ tiếng việt
export const translateVietnamese = function(wordEnglish) {
  const english = [
    {
      id: 0,
      word: 'Released',
    },
    {
      id: 1,
      word: 'en',
    }
  ]

  const vietnamese = [
    {
      id: 0,
      word: 'Đã phát hành',
    },
    {
      id: 1,
      word: 'Tiếng anh',
    }
  ]
  const englishId = english.find(obj => obj.word.toLowerCase() == wordEnglish.toLowerCase()).id;

  return vietnamese.find(obj => obj.id == englishId).word;
};

export function isEmpty(object) {
  for (let property in object) {
    return false;
  }
  return true;
}