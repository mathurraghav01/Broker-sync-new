
const tokenStore = {};

function getToken(userId, broker) {
  return tokenStore[`${userId}-${broker}`];
}

function setToken(userId, broker, token) {
  tokenStore[`${userId}-${broker}`] = { token, expiry: Date.now() + 3600 * 1000 };
}

function isTokenExpired(tokenData) {
  return !tokenData || Date.now() > tokenData.expiry;
}

module.exports = { getToken, setToken, isTokenExpired };
