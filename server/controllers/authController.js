const user = require("../models/user");
const jwtModule = require("../modules/jwtModule");

const authController = {
  signUp: async (req, res) => {
    const { id, password, nickName } = req.body;
    const findResult = await user.findOne({ id });
    const findResult2 = await user.findOne({ nickName });
    if (findResult == null && findResult2 == null) {
      const userModel = new user({
        id,
        password,
        nickName,
      });
      try {
        const savedUser = await userModel.save();
        console.log(savedUser);
        return res.status(200).json({
          message: "유저 생성 성공",
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.status(400).json({
        message: "중복된 아이디 존재",
      });
    }
  },

  signIn: async (req, res) => {
    const { id, password } = req.body;
    try {
      const result = await user.findOne({ id, password });
      if (result) {
        const payload = {
          id: result.id,
          verified: result.verified,
        };

        const token = jwtModule.create(payload);
        console.log(token);

        return res.status(200).json({
          message: "로그인 성공",
          accessToken: token,
        });
      } else {
        return res.status(401).json({
          message: "로그인 실패",
        });
      }
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "DB 에러",
        error: error,
      });
    }
  },

  deleteUser: async (req, res) => {
    const userInfo = req.userInfo;

    // 일치하는 회원인지 아닌지 확인
    const ownResult = await user.checkAuth({
      logginId: userInfo._id,
    });
    const id = userInfo._id;

    if (ownResult === -1) {
      return res.status(409).json({
        message: "계정 권한이 없습니다",
      });
    } else if (ownResult === -2) {
      return res.status(500).json({
        message: "DB 서버 에러",
      });
    }
    try {
      console.log(ownResult._id);
      await user.findByIdAndDelete(id);
      res.status(200).json({
        message: "삭제 성공",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "DB 서버 에러",
      });
    }
  },

  updateUser: async (req, res) => {
    const userInfo = req.userInfo;
    const { type, age, degree, inoDate, gender, profileImage } = req.body;

    let verified = false; // verified 변할 수 있으니 let으로
    if (age !== null && degree !== null && inoDate !== null && type !== "") {
      verified = true;
    }
    const id = userInfo._id;
    const ownResult = await user.checkAuth({
      logginId: userInfo._id,
    });
    console.log(ownResult);
    if (ownResult === -1) {
      return res.status(409).json({ message: "접근 권한이 없습니다." });
    } else if (ownResult === -2) {
      return res.status(500).json({
        message: "DB 서버 에러",
      });
    }

    try {
      const result = await user.findByIdAndUpdate(
        id,
        {
          type,
          age,
          degree,
          gender,
          inoDate,
          profileImage,
          verified,
        },
        { new: true } // 업데이트 하고 난 후의 결과값 반환
      );
      console.log(result);

      const payload = {
        id: result.id,
        verified: result.verified,
      };

      const token = jwtModule.create(payload);
      console.log(token);

      return res.status(200).json({
        message: "수정 완료",
        data: result,
        accessToken: token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "DB 서버 에러",
        error,
      });
    }
  },

  getProfile: (req, res) => {
    const userInfo = req.userInfo;
    try {
      return res.status(200).json({
        message: " 완료",
        data: userInfo,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "DB 서버 에러",
        error,
      });
    }
  },
};

module.exports = authController;
