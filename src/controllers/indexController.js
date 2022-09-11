import * as model from '../models/indexModel.js';
import { NOTIFICATION_NOT_SUPPORT, NOTIFICATION_FORGETPASSWORD, NOTIFICATION_CONFIRM, NOTIFICATION_WRONG_PASSWORD, NOTIFICATION_CONFIRM_CORRECT, WARNING_TITLE_SIGNOUT } from '../shared/config.js';

import notificationView from '../views/notificationView.js';
import visualcompletionView from '../views/visualcompletionView.js';
import gototopView from '../views/gototopView.js';
import warningView from '../views/warningView.js';
import headerNAView from '../views/headerNAView.js';

import movie80View from '../views/index/movie80View.js';
import movie6View from '../views/index/movie6View.js';
import movie2View from '../views/index/movie2View.js';
import appView from '../views/index/appView.js';
import discoverView from '../views/index/discoverView.js';
import signinView from '../views/index/signinView.js';
import bannerView from '../views/index/bannerView.js';
import section5View from '../views/index/section5View.js';

// điều khiển thông báo
const controlNotification = function (message) {
  notificationView.render(message);
  notificationView.addHandlerNotification();
}

// điều khiển movie80pic
const controlMovie80 = async function () {
  // 1. load 80 pic poster movie
  await model.loadMovie80();
  // 2. render 80 pic
  movie80View.render(model.state.movie80);
}
// điều khiển movie6pic
const controlMovie6 = async function () {
  // 1. load 80 pic poster movie
  await model.loadMovie6();
  // 2. render 80 pic
  movie6View.render(model.state.movie6);
}
// điều khiển movie2pic
const controlMovie2 = async function () {
  // 1. load 80 pic poster movie
  await model.loadMovie2();
  // 2. render 80 pic
  movie2View.render(model.state.movie2);
}
// tạo nội dung thông báo app chưa hỗ trợ
const controlNotificationApp = function () {
  controlNotification(NOTIFICATION_NOT_SUPPORT);
}
// tạo sự kiên click vào btn với thông báo app
const controlApp = function () {
  appView.addHandlerClickAppStore(controlNotificationApp);
  appView.addHandlerClickGooglePlay(controlNotificationApp);
}
const controlDiscover = function () {
  // nếu chưa đăng nhập thì hiển thị discover
  if (model.state.account.signin) {
    discoverView.addHandlerHidden();
  } else {
    discoverView.addHandlerShown();
  };
}
const controlHeader = function () {
  // điều khiển nút đăng nhập đăng xuất
  if (model.state.account.signin) {
    headerNAView.addHandlerToggle();
  }
}
const controlShownSignin = function () {
  // hiển thị popup signin
  signinView.addHandlerShownSignin();
};
const controlCheckbox = function () {
  // lấy trạng thái checkbox
  const checked = signinView.getCheckbox();

  if (checked) {
    // lưu vào local để đăng nhập lần sau
    model.persistLocalAccount();
  } else {
    // lưu vào session để đăng nhập nhưng không có lần sau
    model.persistSessionAccount();
  };
}
// điều khiển đăng nhập với api
const controlSignin = async function (data) {
  // tạo visual loading
  visualcompletionView.addHandlerLoadingBarEnter();
  // đăng nhập api
  await model.lognin(data.email, data.password);
  // kiển tra trạng thái
  if(model.state.account.signin) {
    // xử lý check box
    controlCheckbox();
    // hiển thị thông báo
    controlNotification(model.state.account.message);
    // ẩn visual
    visualcompletionView.addHandlerLoadingDone();
    // chuyển nút đăng nhập thành đăng xuất
    headerNAView.addHandlerToggle();
    // ẩn popup singin
    signinView.addHandlerHiddenSignin();
    // ẩn discover
    discoverView.addHandlerHidden();
    // chờ 1 giây rồi vào trang home
    setTimeout(() => {
      window.location.assign('./home.html');
    }, 1000);
  } else {
    controlNotification(model.state.account.message);
    visualcompletionView.addHandlerLoadingDone();
  };
}
// cảnh báo mẫu chưa render tiêu đề
const controlWarning = function (title) {
  warningView.addhandlerWarningToggle();
  warningView.render(title);
}
const controlWarningSignout = function() {
  // hiển thị cảnh báo
  controlWarning(WARNING_TITLE_SIGNOUT);
}
//  điều khiển khi đăng xuất
const controlSignout = function () {
  // xóa tài khoản đã lưu
  model.removeAccount();
  // load lại trang
  window.location.reload();
};
// điều khiển banner
const controlBanner = function () {
  if (model.state.account.signin) {
    bannerView.addHandlerToggle();
  }
};
// điều khiển section5, hiển thị khi đã đăng nhập hay chưa
const controlsection5 = function () {
  if (model.state.account.signin) {
    section5View.addHandlerToggle();
  }
};
// điều khiển forgetpassword
const controlforgetpassword = async function (data) {
  // lấy giá trị trường email
  const email = signinView.getForgetEmail();

  if (email) {
    // tạo visual loading
    visualcompletionView.addHandlerLoadingBarEnter();
    // load api lấy confirm
    await model.confirm(data);
    // kiểm tra trạng thái confirm
    if (model.state.confirm.confirm) {
      // ẩn visual
      visualcompletionView.addHandlerLoadingDone();
      // tạo thông báo đã lấy confirm
      controlNotification(model.state.confirm.message);
      console.log(model.state.confirm.message);
      // hiển thị form confirm
      signinView.addHandlerShowConfirmForm();
    } else {
      // ẩn visual
      visualcompletionView.addHandlerLoadingDone();
      // tạo thông báo lấy confirm thất bại
      controlNotification(model.state.confirm.message);
    };
  } else {
    // tạo thông báo chưa nhập trường email
    controlNotification(NOTIFICATION_FORGETPASSWORD);
  };
}
// điều khiển confirm
const controlConfirm = function (data) {
  // get confirm ở dạng chuỗi
  const confirm = signinView.getConfirm();

  if (+confirm === model.state.confirm.confirmNumber) {
    // hiển thị form tạo password
    signinView.addHandlerShowCreatePassword();
    // tạo thông báo xác minh
    controlNotification(NOTIFICATION_CONFIRM_CORRECT);
  } else {
    controlNotification(NOTIFICATION_CONFIRM);
  };
};
// điều khiển tạo mật khẩu mới
const controlCreatePassword = async function (data) {
  // lấy trường giá trị password
  const newPassword = signinView.getCreatePassword();
  const newPasswordRepeate = signinView.getCreatePasswordRepeat();
  // tạo visual loading
  visualcompletionView.addHandlerLoadingBarEnter();
  // kiểm tra điều kiện
  if (newPassword == newPasswordRepeate) {
    // tạo mật khẩu qua api
    await model.createPassword(data);
    // ẩn visual
    visualcompletionView.addHandlerLoadingDone();
    if (model.state.createPassword.update) {
      // tạo thông báo
      controlNotification(model.state.createPassword.message);
      // hiển thị form thành công
      signinView.addHandlerShowCreatePasswordDone();
    } else {
      controlNotification(model.state.createPassword.message);
    };
  } else {
    // ẩn visual
    visualcompletionView.addHandlerLoadingDone();
    controlNotification(NOTIFICATION_WRONG_PASSWORD);
  };
}
// điều khiển banner email
const controlBannerEmail = function (data) {
  const email = data.email;
  model.addEmailInput(email);

  setTimeout(() => {
    window.location.assign('./signup.html');
  }, 100);
}
// điều khiển section5 email
const controlSection5Email = function (data) {
  const email = data.email;
  model.addEmailInput(email);

  setTimeout(() => {
    window.location.assign('./signup.html');
  }, 100);
}

// Kiểm tra nếu đã đăng nhập rồi thì vào trang home
const controlLogged = function () {
  // để quay lại trang này thì thêm #1
  const id = window.location.hash.slice(1);

  if (model.state.account.signin && id == '') {
    window.location.assign('./home.html');
  } else if (id == 'signin') {
    // nếu id có singin thì hiển thị form đăng nhập
    setTimeout(() => {
      controlShownSignin();
    }, 1000);
  };
}
// chạy khi load dom
window.onload = controlLogged;

// khởi tạo các trình điều khiển
function init() {
  movie80View.addHandlerRender(controlMovie80);
  movie6View.addHandlerRender(controlMovie6);
  movie2View.addHandlerRender(controlMovie2);
  appView.addHandlerRender(controlApp);
  discoverView.addHandlerRender(controlDiscover);
  headerNAView.addHandlerRender(controlHeader);
  headerNAView.addHandlerClickSignin(controlShownSignin);
  headerNAView.addHandlerClickSignout(controlWarningSignout);
  warningView.addHandlerClickOk(controlSignout);
  signinView.addHandlerSigninForm(controlSignin);
  signinView.addHandlerClickForgetpassword(controlforgetpassword);
  signinView.addHandlerClickConfirm(controlConfirm);
  signinView.addHandlerClickCreatePassword(controlCreatePassword);
  bannerView.addHandlerRender(controlBanner);
  bannerView.addHandlerSignup(controlBannerEmail);
  section5View.addHandlerRender(controlsection5);
  section5View.addHandlerSignup(controlSection5Email);
};

init();