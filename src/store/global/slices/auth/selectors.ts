import { GlobalStore } from '../../store';

const loginParams = (s: GlobalStore) => s.loginParams;
const authInfo = (s: GlobalStore) => s.authInfo;
const processLogin = (s: GlobalStore) => s.processLogin;
const setLoginParams = (s: GlobalStore) => s.login;
const updateUserInfo = (s: GlobalStore) => s.updateUserInfo;
const createPrePay = (s: GlobalStore) => s.createPrePay;
export const authSelectors = {
  authInfo,
  createPrePay,
  loginParams,
  processLogin,
  setLoginParams,
  updateUserInfo,
};
