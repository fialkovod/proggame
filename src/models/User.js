import mongoose, { Document } from "mongoose";

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
    created: Number,
    username: String,
    name: String,
    lastActivity: Number,
    language: String,
    correctAnswers: { type: Number, required: true, default: 0 },
    wrongAnswers: { type: Number, required: true, default: 0 },
    currentPower: { type: Number, required: true, default: 8 },
    maxPower: { type: Number, required: true, default: 8 },
    speedPower: { type: Number, required: true, default: 1 },
    doneTask: { type: Number, required: true, default: 0 },
    quizruns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quizrun" }],
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
