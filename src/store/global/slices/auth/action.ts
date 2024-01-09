import isEqual from 'fast-deep-equal';
import { produce } from 'immer';
import type { StateCreator } from 'zustand/vanilla';

import { authService } from '@/services/auth';
import { payService } from '@/services/pay';
import type { GlobalStore } from '@/store/global';
import type { AuthInfo, LoginParams } from '@/types/auth';
import { merge } from '@/utils/merge';

/**
 * 设置操作
 */
export interface AuthAction {
  createPrePay: (token: number) => void;
  login: (params: LoginParams) => void;
  processLogin: () => void;
  updateUserInfo: (authInfo: AuthInfo) => void;
}

export const createAuthSlice: StateCreator<
  GlobalStore,
  [['zustand/devtools', never]],
  [],
  AuthAction
> = (set, get) => ({
  createPrePay: async (totalAmount: number) => {
    const tokenAmount = totalAmount * 1999;
    const accessToken = get().authInfo.accessToken;
    const result = await payService.createPrePay(totalAmount, tokenAmount, accessToken);
    console.log(tokenAmount, result);
  },
  login: (param) => {
    const loginParams = produce(get().loginParams, (draft: LoginParams) => {
      draft.email = param.email;
      draft.password = param.password;
    });
    set({ loginParams });
  },
  processLogin: async () => {
    const param = get().loginParams;
    const setSettings = get().setSettings;
    const authInfo = await authService.login(param.email, param.password);
    setSettings({ password: 'Djj12345' });
    set({
      authInfo: {
        accessToken: authInfo.accessToken,
        tokenBalance: authInfo.tokenBalance,
        username: authInfo.sub,
      },
    });
  },
  updateUserInfo: (authInfo: AuthInfo) => {
    const prevAuthInfo = get().authInfo;
    const nextAuthInfo = merge(prevAuthInfo, authInfo);

    if (isEqual(prevAuthInfo, nextAuthInfo)) return;

    set({ authInfo: merge(prevAuthInfo, authInfo) }, false);
  },
});
