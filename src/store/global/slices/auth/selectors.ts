import { GlobalStore } from '../../store';

const loginParams = (s: GlobalStore) => s.loginParams;
const authInfo = (s: GlobalStore) => s.authInfo;
const processLogin = (s: GlobalStore) => s.processLogin;
const setLoginParams = (s: GlobalStore) => s.login;
const updateUserInfo = (s: GlobalStore) => s.updateUserInfo;
export const authSelectors = {
  authInfo,
  loginParams,
  processLogin,
  setLoginParams,
  updateUserInfo,
};
