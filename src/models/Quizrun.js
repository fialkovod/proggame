import mongoose, { Document } from "mongoose";

export const QuizrunSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
  status: Number,
  createdDate: { type: Date, default: Date.now },
});

const Quizrun = mongoose.model("Quizrun", QuizrunSchema);
export default Quizrun;
