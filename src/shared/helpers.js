import { TIMEOUT_SEC } from './config.js';

import genres from '../jsons/genres.json';
import certifications from '../jsons/certifications.json';
import dictionary from '../jsons/dictionary.json';

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
  if (!path) return '';
  return `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${path}`;
};

// lấy đường dẫn đầy đủ với width 600px
export const pathPictureW600 = function(path) {
  if (!path) return '';
  return `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${path}`;
};

// lấy đường dẫn đầy đủ với width 533px
export const pathPictureW533 = function(path) {
  if (!path) return '';
  return `https://www.themoviedb.org/t/p/w533_and_h300_bestv2${path}`;
};

// lấy đường dẫn đầy đủ với width 235px
export const pathPictureW235 = function(path) {
  if (!path) return '';
  return `https://www.themoviedb.org/t/p/w235_and_h235_face${path}`;
};
// lấy đường dẫn đầy đủ với width 220px
export const pathPictureW220 = function(path) {
  if (!path) return '';
  return `https://www.themoviedb.org/t/p/w220_and_h330_face${path}`;
};
// lấy đường dẫn đầy đủ với width 138px
export const pathPictureW138 = function(path) {
  if (!path) return '';
  return `https://www.themoviedb.org/t/p/w138_and_h175_face${path}`;
};

// dịch sang ngôn ngữ tiếng việt
export const translateVietnamese = function(word) {
  const findWord = dictionary.find(w => w.english.toLowerCase() === word.toLowerCase());

  if (!findWord) return word;

  return findWord.vietnamese;
};

// kiểm tra chuỗi rỗng
export function isEmpty(object) {
  for (let property in object) {
    return false;
  }
  return true;
}

// chuyển id thể loại sang name
export function getGenresId(id) {
  if(!id) return 'Trống';
  const genreId = genres.find(genre => genre.id == id);
  return genreId.name;
}

// lấy năm không chứa ngày tháng
export function getYear(releaseDate) {
  if(!releaseDate) return 'Trống';
  const year = releaseDate.slice(0, 4);
  return year;
}
// lấy tổng đánh giá với 1 chữ số ở sau
export function getVoteAverage(voteAverage) {
  if(!voteAverage) return 'Trống';
  const vote = voteAverage.toFixed(1);
  return vote;
}

// kiểm tra nếu có overview thì trả về không thì để trống
export function getOverview(overview) {
  if(!overview) return 'Trống';
  return overview;
}

// tạo mã mầu hex ngẫu nhiên
// export function randomColor() {
//   return '#' + Math.floor(Math.random()*16777215).toString(16);
// }
export function randomColor() {
  const x = Math.round(0xffffff * Math.random()).toString(16);
  const y = (6 - x.length);
  const z = '000000';
  const z1 = z.substring(0, y);
  return '#' + z1 + x;
}

// convert phân loại phim từ anh sang việt
export function getCertification(us) {
  if(!us) return ''; 
  const order = certifications.US.find(u => u.certification == us).order;

  return {
    certification: certifications.VN.find(v => v.order == order).certification,
    meaning: certifications.VN.find(v => v.order == order).meaning,
  }
}

// chuyển đổi số được phân cách bởi dấu . dễ nhìn
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
// kiểm tra nhập đúng form email
export function validateEmail(value, message) 
{
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(value) ? undefined : message || 'Trường này phải là email';
}
// kiểm tra kí tự ít nhất có thể nhập
export function validatePassword(value, min, message) {
  return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
}
