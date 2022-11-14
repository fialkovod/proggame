// Add some general info, like isPremium, language, etc...
//import { ContextMessageUpdate } from 'telegraf';
import User from '../models/User.js';

/**
 * Modifies context and add some information about the user
 * @param ctx - telegram context
 * @param next - next function
 */
export const getUserInfo = async (ctx, next) => {
    //console.log("ctx: ", ctx);
    const user_id = ctx?.from?.id || ctx?.update?.poll_answer?.user?.id;

    const user = user_id? await User.findById(user_id): undefined;
    if(user) ctx.user = user;

  /*if (!ctx.session?.language) {
    const user = await User.findById(ctx.from.id);
    //console.log("ctx: ", ctx);
    //console.log("ctx.session: ", ctx.session);
    //console.log("user: ", user);
    if (user) {
      //ctx.session.language = user.language;
      //ctx.i18n.locale(user.language);
    }
  }*/

    return next();
};