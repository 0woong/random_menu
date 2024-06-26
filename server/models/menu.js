const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true, collection: "menu" }
);

menuSchema.statics.findAll = function () {
  return this.find({});
};

module.exports = mongoose.model("menu", menuSchema);
