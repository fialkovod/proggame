import mongoose from "mongoose";

/*export interface IUser extends Document {
  _id: string;
  created: number;
  username: string;
  name: string;
  observableMovies: IMovie[];
  lastActivity: number;
  language: 'en' | 'ru';
  totalMovies: number;
}*/

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

/*UserSchema.pre('find', function() {
  this.populate('observableMovies');
}).pre('findOne', function() {
  this.populate('observableMovies');
});*/

const User = mongoose.model("User", UserSchema);
export default User;
