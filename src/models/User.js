import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
  {
    _id: String,
    createdDate: { type: Date, default: Date.now },
    username: String,
    name: String,
    lastActivity: Number,
    profiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profile" }],
    activeProfile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
  },
  { _id: false }
);

const User = mongoose.model("User", UserSchema);
export default User;
