const kiteConnect = require("kiteconnnect").KiteConnect;

const kc = new KiteConnect({ api_key: process.env.ZERODHA_API_KEY});

async function generateLoginUrl(){
  return kc.getLoginURL();
}

async function setAccessTokemn(requestToken){
  return kc.getLoginURL();
}

async function setAccessToken(requestToken){
  const session = await kc.generateSession(requestToken,process.env.ZERODHA_API_SECRET);
  kc.setAccessToken(session.access_token);
  return session;
}

async function getProfile(){
  return await kc.getprofile();
}

async function placeOrder(params){
  return await kc.placeOrder("regular",params);
}

module.exports = {
  generateLoginUrl,
  setAccessToken,
  getProfile,
  placeOrder
};
