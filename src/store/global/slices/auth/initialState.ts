import type { AuthInfo, LoginParams } from '@/types/auth';

export interface AuthState {
  /**
   * @localStorage
   */
  authInfo: AuthInfo;
  loginParams: LoginParams;
}

export const initialAuthState: AuthState = {
  authInfo: {} as AuthInfo,
  loginParams: {} as LoginParams,
};
