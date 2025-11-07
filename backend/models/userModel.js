import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true}
});

const userModel = mongoose.models.Users || new mongoose.model("Users", userSchema);

export default userModel;