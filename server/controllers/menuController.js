const menu = require("../models/menu");

const menuController = {
  getAllMenu: async (req, res) => {
    try {
      const result = await menu.find();
      res.json({
        message: "조회 성공",
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "조회 실패",
        error: error,
      });
    }
  },
  uploadMenu: async (req, res) => {
    const { name, category } = req.body;

    const menuModel = new menu({
      name,
      category,
    });

    try {
      const result = await menuModel.save();
      return res.status(200).json({
        message: "저장 성공",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: "DB 서버 에러",
      });
    }
  },
};

module.exports = menuController;
