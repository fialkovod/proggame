import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
  profileName: { type: String, default: "" },
  quiz_id: Number,
  status: Number,
  createdDate: { type: Date, default: Date.now },
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);
export default Feedback;
