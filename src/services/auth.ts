export interface Result {
  accessToken: string;
  id: number;
  sub: string;
  tokenBalance: number;
  username: string;
}

class AuthService {
  async login(email: string, password: string): Promise<Result> {
    const response = await window.fetch(`http://127.0.0.1:7182/auth/login`, {
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      method: 'POST',
    });
    // eslint-disable-next-line unicorn/no-await-expression-member
    return (await response.json()).result as Result;
  }
}

export const authService = new AuthService();
