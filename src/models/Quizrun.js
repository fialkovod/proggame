import mongoose, { Document } from "mongoose";

export const QuizrunSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  author: { type: String, ref: "User" },
  status: Number,
  createdDate: { type: Date, default: Date.now },
});

const Quizrun = mongoose.model("Quizrun", QuizrunSchema);
export default Quizrun;
