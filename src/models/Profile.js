import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  author: { type: String, ref: "User" },
  profileName: { type: String, required: true, default: "JavaScript" },
  createdDate: { type: Date, default: Date.now },
  correctAnswers: { type: Number, required: true, default: 0 },
  wrongAnswers: { type: Number, required: true, default: 0 },
  timeoutAnswers: { type: Number, required: true, default: 0 },
  currentReputation: { type: Number, required: true, default: 5 },
  currentPosition: { type: Number, required: true, default: 1 },
  currentPower: { type: Number, required: true, default: 8 },
  maxPower: { type: Number, required: true, default: 8 },
  speedPower: { type: Number, required: true, default: 1 },
  doneTask: { type: Number, required: true, default: 0 },
  currentSalary: { type: Number, required: true, default: 200 },
  currentRent: { type: Number, required: true, default: 50 },
  currentBudget: { type: Number, required: true, default: 0 },
  quizruns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quizrun" }],
});

const Profile = mongoose.model("Profile", ProfileSchema);
export default Profile;
