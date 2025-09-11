interface TokenData {
  token: string;
  expiry: number;
}

const tokenStore: Record<string, TokenData> = {};

export function getToken(userId: string, broker: string): TokenData | undefined {
  return tokenStore[`${userId}-${broker}`];
}

export function setToken(userId: string, broker: string, token: string): void {
  tokenStore[`${userId}-${broker}`] = {
    token,
    expiry: Date.now() + 3600 * 1000, 
  };
}


export function isTokenExpired(tokenData?: TokenData): boolean {
  return !tokenData || Date.now() > tokenData.expiry;
}
