import { KiteConnect } from "kiteconnect";

const kc = new KiteConnect({ api_key: process.env.ZERODHA_API_KEY as string });

/
export async function generateLoginUrl(): Promise<string> {
  return kc.getLoginURL();
}

export async function setAccessToken(requestToken: string): Promise<any> {
  const session = await kc.generateSession(
    requestToken,
    process.env.ZERODHA_API_SECRET as string
  );
  kc.setAccessToken(session.access_token);
  return session;
}

export async function getProfile(): Promise<any> {
  return kc.getProfile();
}

export async function placeOrder(params: Record<string, any>): Promise<any> {
  return kc.placeOrder("regular", params);
}
