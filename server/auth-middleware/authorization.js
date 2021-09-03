const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    //1. destructure token
    const jwtToken = req.header("token");
    // console.log('token is:',jwtToken)

    //2. check if token present
    if (!jwtToken) {
      return res.status(403).json("not authorized 1");
    }

    //3. verify with secret in .env
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);

    req.user = payload.user;

    next();
  } catch (err) {
    console.log(err.message);
    return res.status(403).json("not authorized 2");
  }
};
