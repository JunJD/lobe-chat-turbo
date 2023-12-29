/**
 * 用户登陆信息
 */
export interface LoginParams {
  email: string;
  password: string;
}

export interface AuthInfo {
  accessToken: string;
  tokenBalance: number;
  username: string;
}
