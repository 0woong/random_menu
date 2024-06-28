const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: String, unique: true, required: true },
  nickName: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

userSchema.statics.checkAuth = async function (params) {
  const { logginId } = params;
  try {
    const ownResult = await this.findOne({ _id: logginId });
    const ownId = ownResult._id;

    if (ownId.toString() == logginId.toString()) {
      return 1;
    }
    return -1;
  } catch (error) {
    return -2;
  }
};

module.exports = mongoose.model("user", userSchema);
