import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "Users"}
});

const noteModel = mongoose.models.notes || mongoose.model("notes", noteSchema);

export default noteModel;