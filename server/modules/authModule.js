const user = require("../models/user");
const jwtModule = require("./jwtModule");

const authModule = {
  loggedIn: async (req, res, next) => {
    // 미들웨어 쓸 때는 next
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        message: "토큰 없음",
      });
    }

    const decoded = jwtModule.verify(token);
    // 여기서 verification 체크
    // console.log(decoded);
    // if (decoded.verified == false) {
    //   return res.status(409).json({
    //     message: "추가 정보를 입력해주세요",
    //   });
    // }

    if (decoded === -1) {
      return res.status(401).json({
        message: "만료된 토큰입니다",
      });
    } else if (decoded === -2) {
      return res.status(401).json({
        message: "유효하지 않은 토큰입니다",
      });
    } else if (decoded === -3) {
      return res.status(401).json({
        message: "토큰 에러입니다",
      });
    }

    let userInfo;
    try {
      userInfo = await user.findOne({ email: decoded.email });
      console.log(userInfo);
    } catch (error) {
      console.log(error);
      return res.status(409).json({
        message: "유효하지 않은 유저입니다",
      });
    }

    req.userInfo = userInfo; // req에 userInfo 담고
    next(); // next로 다음으로 넘김
  },
};

module.exports = authModule;
