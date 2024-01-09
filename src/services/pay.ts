export interface Result {
  accessToken: string;
  id: number;
  sub: string;
  tokenBalance: number;
  username: string;
}

class PayService {
  async createPrePay(
    totalAmount: number,
    tokenAmount: number,
    accessToken: string,
  ): Promise<Result> {
    const response = await window.fetch(`http://127.0.0.1:7182/pay/alipay`, {
      body: JSON.stringify({
        subject: new Date().toString(),
        tokenAmount,
        totalAmount,
      }),
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json;charset=UTF-8',
      },
      method: 'POST',
    });
    // eslint-disable-next-line unicorn/no-await-expression-member
    return (await response.json()).result as Result;
  }
}

export const payService = new PayService();
