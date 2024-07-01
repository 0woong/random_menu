require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET_KEY;

const jwtModule = {
  create: (payload) => {
    // jwt 생성
    const option = {
      algorithm: "HS256",
      expiresIn: "30d",
      issuer: "eroe",
    };
    const token = jwt.sign(payload, jwtSecret, option);
    // 매개변수, 시크릿키, 옵션;

    return token;
  },

  verify: (token) => {
    // jwt 확인
    let decoded;
    try {
      decoded = jwt.verify(token, jwtSecret);
    } catch (error) {
      if (error.message === "jwt expired") {
        console.log("expired token");
        return -1;
      } else if (error.message === "invalid token") {
        console.log("invalind token");
        return -2;
      } else {
        console.log("error token");
        return -3;
      }
    }
    return decoded;
  },
};

module.exports = jwtModule;
