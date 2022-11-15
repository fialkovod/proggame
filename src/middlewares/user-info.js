// Add some general info, like isPremium, language, etc...
//import { ContextMessageUpdate } from 'telegraf';
import User from "../models/User.js";

/**
 * Modifies context and add some information about the user
 * @param ctx - telegram context
 * @param next - next function
 */
export const getUserInfo = async (ctx, next) => {
  //console.log("ctx.from: ", ctx.from);

  const user_id = ctx?.from?.id || ctx?.update?.poll_answer?.user?.id;
  const user = user_id ? await User.findById(user_id) : undefined;
  if (user) {
    ctx.user = user;
    await User.findOneAndUpdate(
      { _id: user_id },
      { lastActivity: new Date().getTime() },
      { new: true }
    );
  }
  return next();
};
