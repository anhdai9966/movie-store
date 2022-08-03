import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Yêu cầu mất nhiều thời gian! Đã hết thời gian chờ ${s} giây`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const fetchTemp = fetch(url);
    const res = await Promise.race([fetchTemp, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    // mockapi
    if (url.includes('mockapi')) {
      if (!res.ok) throw new Error(`${res.statusText}, ${res.url}, ${data}`);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};
