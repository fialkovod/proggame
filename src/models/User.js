import mongoose, { Document } from 'mongoose';

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
  },
  { _id: false }
);

/*UserSchema.pre('find', function() {
  this.populate('observableMovies');
}).pre('findOne', function() {
  this.populate('observableMovies');
});*/

const User = mongoose.model('User', UserSchema);
export default User;