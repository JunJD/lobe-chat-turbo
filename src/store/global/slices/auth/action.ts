import { produce } from 'immer';
import type { StateCreator } from 'zustand/vanilla';

import { authService } from '@/services/auth';
import type { GlobalStore } from '@/store/global';
import type { LoginParams } from '@/types/auth';

/**
 * 设置操作
 */
export interface AuthAction {
  login: (params: LoginParams) => void;
  processLogin: () => void;
}

export const createAuthSlice: StateCreator<
  GlobalStore,
  [['zustand/devtools', never]],
  [],
  AuthAction
> = (set, get) => ({
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
});
