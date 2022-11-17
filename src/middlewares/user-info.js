// Add some general info, like isPremium, language, etc...
//import { ContextMessageUpdate } from 'telegraf';
import User from "../models/User.js";
import Profile from "../models/Profile.js";

/**
 * Modifies context and add some information about the user
 * @param ctx - telegram context
 * @param next - next function
 */
export const getUserInfo = async (ctx, next) => {
  const user_id = ctx?.from?.id || ctx?.update?.poll_answer?.user?.id;
  //const user = user_id ? await User.findById(user_id) : undefined;

  const user = user_id
    ? await User.findOneAndUpdate(
        { _id: user_id },
        { lastActivity: new Date().getTime() },
        { new: true }
      )
    : undefined;
  //console.log("user: ", user);
  if (user) {
    let profile = await Profile.findById(user.activeProfile).exec();
    ctx.user = user;
    ctx.profile = profile;
  }
  //console.log("ctx: ", ctx);
  return next();
};
