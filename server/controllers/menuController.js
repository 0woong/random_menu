const menu = require("../models/menu");

const menuController = {
  getAllMenu: async (req, res) => {
    try {
      const result = await menu.findAll();
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
  deleteMenu: async (req, res) => {
    const { id } = req.params;
    try {
      await menu.findOneAndDelete({ _id: id });
      return res.json({
        message: "삭제 완료",
      });
    } catch (error) {
      return res.status(500).json({
        message: "DB 서버 에러",
        error: error,
      });
    }
  },
  updateMenu: async (req, res) => {
    const { id } = req.params;
    const { name, category } = req.body;
    try {
      const result = await menu.findByIdAndUpdate(
        id,
        { name, category, updateDate: new Date() },
        { new: true }
      );
      return res.status(200).json({
        message: "수정 완료",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: "수정 실패",
        error: error,
      });
    }
  },
};

module.exports = menuController;
