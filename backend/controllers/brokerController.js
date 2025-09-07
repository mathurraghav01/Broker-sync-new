const zerodha = require("../services/zerodhaAdapter");

exports.connectBroker = async (req,res) => {
  const url = await zerodha.generateLoginURL();
  res.json ({ loginUrl: url } );
};

exports.callback = async (req,res) => {
    const {requestToken} = req.query;
    try{
        const session = await zerodha.setAccessToken(requestToken);
        res.json({message: "Broker linked" , session});
    } catch (err){
        res.status(400).json({ error:err.message });
    }
};

exports.getProfile = async (req , res) =>{
    const profile = await zerodha.getProfile();
    res.jason(profile);
};
