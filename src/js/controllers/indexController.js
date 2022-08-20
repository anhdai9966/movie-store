import * as model from '../models/indexModel.js';
import { MESSAGE_ERROR_ACCOUNT, MESSAGE_CORRECT_ACCOUNT, MESSAGE_NOT_SUPPORT } from '../shared/config.js';

import headerView from '../views/headerIndexView.js';
import bannerView from '../views/bannerViewIndex.js';
import introduceView from '../views/introduceView.js';
import popupSigninView from '../views/popupSigninView.js';
import discoverView from '../views/discoverView.js';
import gototopView from '../views/gototopView.js';
import signinView from '../views/indexSigninView.js';
import messageView from '../views/messageView.js';
import indexSigninView from '../views/indexSigninView.js';
import appView from '../views/appView.js';

const controlBanner = async function () {
  await model.loadMovie80();

  bannerView.addHandlerRenderBanner(model.state.movie80);
}

const controlIntroduce = async function () {
  await model.loadMovie2();

  introduceView.renderMovie2(model.state.movie2);

  await model.loadMovie6();

  introduceView.renderMovie6(model.state.movie6);
}

const controlPopupSignin = async function () {
  popupSigninView.addHandlerShowPopupSignin();
}
// thông báo
const controlMessage = function (mess) {
  messageView.render(mess);
  messageView.addHandlerShowMessage();
}

const controlSignin = async function (email, password) {
  // sign in 
  await model.lognin(email, password);

  // kiển tra trạng thái
  if(model.state.account.signin) {
    popupSigninView.addHandlerHiddenPopupSignin();
    controlCheckboxSignin();
    controlMessage(MESSAGE_CORRECT_ACCOUNT);
    // chờ 1 giây rồi tải trang home
    setTimeout(() => {
      window.location.assign('../../html/pages/home.html');
    }, 1000);
  } else {
    controlMessage(MESSAGE_ERROR_ACCOUNT);
  };
}

const controlCheckboxSignin = function() {
  const check = indexSigninView.getValueClickCheckbox();
  if (check) {
    model.persistLocalAccount();
  } else {
    model.persistSessionAccount();
  };
}

const controlMessageNotSupport = function () {
  controlMessage(MESSAGE_NOT_SUPPORT);
}

const controlSaveSesstion = function () {
  const valEmail = bannerView.getValueEmail();
  model.addEmailInput(valEmail);
  model.persistSessionEmail()
}

const init = function () {
  headerView.addHandlerSigninOpenModal(controlPopupSignin);
  bannerView.addHandlerRender(controlBanner);
  introduceView.addHandlerRender(controlIntroduce);
  signinView.addHandlerClickButton(controlSignin);
  appView.addHandlerClickGooglePlay(controlMessageNotSupport);
  appView.addHandlerClickAppStore(controlMessageNotSupport);
  bannerView.addHandlerClickLinkSignup(controlSaveSesstion);
};
init();
