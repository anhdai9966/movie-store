import * as model from '../models/signupModel.js';
import { CONFIRM_NUMBER, MESSAGE_CONFIRM, MESSAGE_CONFIRM_ERROR_CREATE } from '../shared/config.js';

import messageView from '../views/messageView.js';
import signupCreateView from '../views/signupCreateView.js';
import signupConfirmView from '../views/signupConfirmView.js';
import signupInfoView from '../views/signupInfoView.js';
import signupCreditView from '../views/signupCreditView.js';

const controlSetValueEmail = function () {
  signupCreateView.setValueEmail(model.state.account.email);
}

const controlSignupCreate = async function () {
  const email = signupCreateView.getValueEmail();
  const password = signupCreateView.getValuePassword();
  model.addEmailPassword(email, password);
  signupCreateView.addHandlerHiddenCreate(); // ẩn
  signupConfirmView.addHandlerShownConfirm(); // hiện
}

const controSignupConfirm = async function () {
  const numberConfirm = signupConfirmView.getValueConfirm();

  if (+numberConfirm == +CONFIRM_NUMBER) {
    await model.lognup(model.state.account);
    if (!model.state.resAccount.signup) {
      controlMessage(MESSAGE_CONFIRM_ERROR_CREATE);
      signupCreateView.addHandlerShownCreate(); // hiện
      signupConfirmView.addHandlerHiddenConfirm(); // ẩn
    } else {
      signupInfoView.addHandlerShownCreateInfo()
      signupConfirmView.addHandlerHiddenConfirm(); // ẩn
    };
  } else {
    controlMessage(MESSAGE_CONFIRM);
  };
}

const controlSignupInfo = async function () {
  const name = signupInfoView.getValueName();
  const year = signupInfoView.getValueYear();
  model.addNameYear(name, year);
  await model.updateInfo(model.state.infoAccount);
  signupInfoView.addHandlerHiddenCreateInfo();
  signupCreditView.addHandlerShownCredit();
}

// const 

// thông báo đẩy
const controlMessage = function (mess) {
  messageView.render(mess);
  messageView.addHandlerShowMessage();
}

const init = function () {
  signupCreateView.addHandlerLoad(controlSetValueEmail);
  signupCreateView.addHandlerClickBtnCreate(controlSignupCreate);
  signupConfirmView.addHandlerClickBtnCreate(controSignupConfirm);
  signupInfoView.addHandlerClickCreateInfo(controlSignupInfo);
}

init();