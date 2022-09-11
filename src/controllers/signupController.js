import * as model from '../models/signupModel.js';
import { CONFIRM_NUMBER, NOTIFICATION_CONFIRM_NUMBER, NOTIFICATION_ERROR_CREATE, NOTIFICATION_CONFIRM_WRONG } from '../shared/config.js';

import notificationView from '../views/notificationView.js';
import visualcompletionView from '../views/visualcompletionView.js';
import gototopView from '../views/gototopView.js';
import warningView from '../views/warningView.js';
import headerNAView from '../views/headerNAView.js';

import createView from '../views/signup/createView.js';
import confirmView from '../views/signup/confirmView.js';
import infoView from '../views/signup/infoView.js';
import creditView from '../views/signup/creditView.js';

// điều khiển thông báo
const controlNotification = function (message) {
  notificationView.render(message);
  notificationView.addHandlerNotification();
}
// cảnh báo mẫu chưa render tiêu đề
const controlWarning = function (title) {
  warningView.addhandlerWarningToggle();
  warningView.render(title);
}

// set email nếu đã được nhập từ trang giới thiệu
const controlEmail = function () {
  createView.setEmail(model.state.dataAccount.email);
}
// điều khiển tạo tài khoản
const controlCreate = function (data) {
  const valueCorrect = createView.addHandlerValidator();

  if (valueCorrect) {
    // lưu giá trị trong form vào state
    model.state.dataAccount = data;
    // ẩn create
    createView.addHandlerToggle();
    // hiển thị confirm
    confirmView.addHandlerToggle();
    // hiển thị thông báo mã xác nhận vì không hỗ trợ confirm email
    controlNotification(NOTIFICATION_CONFIRM_NUMBER);
  } else {
    controlNotification(NOTIFICATION_ERROR_CREATE);
  };
}
// điều khiển xác nhận
const controlConfirm = async function (data) {
  if (+data.confirm == CONFIRM_NUMBER) {
    // tạo visual loading
    visualcompletionView.addHandlerLoadingBarEnter();
    // gửi dữ liệu api để tạo tài khoản
    await model.signup(model.state.dataAccount);
    // kiểm tra đăng ký thành công chưa
    if (model.state.account.signup) {
      // ẩn confirm
      confirmView.addHandlerToggle();
      // hiện tạo info
      infoView.addHandlerToggle();
      // tạo thông báo đăng ký
      controlNotification(model.state.account.message);
      model.giftMovie();
    } else {
       // hiện create
      createView.addHandlerToggle();
      // ẩn confirm
      confirmView.addHandlerToggle();
      // tạo thông báo đăng ký
      controlNotification(model.state.account.message);
    };
    // ẩn visual
    visualcompletionView.addHandlerLoadingDone();
  } else {
    // tạo thông báo không chính xác
    controlNotification(NOTIFICATION_CONFIRM_WRONG);
  };
}

const controlInfo = async function (data) {
  // gán giá trị tên và năm sinh vào state
  model.getNameBirth(data);
  // tạo visual loading
  visualcompletionView.addHandlerLoadingBarEnter();
  // gửi dữ liệu api để tạo thông tin tài khoản
  await model.createInfo(model.state.dataInfo);
  if (model.state.info.info) {
    // ẩn tạo info
    infoView.addHandlerToggle();
    // hiển thị credit
    creditView.addHandlerToggle();
    // tạo thông báo thành công
    controlNotification(model.state.info.message);
  } else {
    controlWarningCredit();
    // tạo thông báo tạo thất bại
    controlNotification(model.state.info.message);
  };
  // ẩn visual
  visualcompletionView.addHandlerLoadingDone();
}
// điều khiển hiển thị cảnh báo
const controlWarningCredit = function (data) {
  console.log(data);
  controlWarning('Bạn sẽ chuyển đến trang đăng nhập!');
}
// điều khiển điều hướng sang trang giới thiệu
const controlCredit = function () {
  warningView.addhandlerWarningToggle();
  window.location.assign('./index.html#signin');
}

// khởi tạo các trình điều khiển
function init() {
  createView.addHandlerRender(controlEmail);
  createView.addHandlerSubmit(controlCreate);
  confirmView.addHandlerSubmit(controlConfirm);
  infoView.addHandlerSubmit(controlInfo);
  creditView.addHandlerSubmit(controlWarningCredit);
  warningView.addHandlerClickOk(controlCredit);
};

init();