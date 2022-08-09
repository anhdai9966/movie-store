import { TIMEOUT_SEC } from './config.js';

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
    console.log('🚀 ~ AJAX ~ res', res)
    const data = await res.json();
    console.log('🚀 ~ AJAX ~ data', data)

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