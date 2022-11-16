import { Scenes, session } from "telegraf";
//import { languageChangeAction } from './actions';
import { getProfilesInlineKeyboard } from "./helpers.js";
import logger from "../../util/logger.js";
import User from "../../models/User.js";
import Profile from "../../models/Profile.js";
import { getMainKeyboard } from "../../util/keyboards.js";
import { profileChangeAction } from "./actions.js";

const { enter, leave } = Scenes.Stage;
const start = new Scenes.BaseScene("start");

start.enter(async (ctx) => {
  //console.log("context on start", ctx);
  const uid = String(ctx.from.id);
  //console.log("ctx.from: ", ctx.from);
  console.log("uid: ", uid);
  const user = await User.findById(uid);
  const { mainKeyboard, mainKeyboardWork } = getMainKeyboard(ctx);

  if (user) {
    logger.debug(ctx, "user already registered");
    await ctx.reply("user already registered");
  } else {
    logger.debug(ctx, "New user has been created");

    const newUser = new User({
      _id: uid,
      username: ctx.from.username,
      name: (ctx.from.first_name + " " + (ctx.from.last_name ?? "")).trim(),
      lastActivity: new Date().getTime(),
    });
    await newUser.save();
    logger.debug(ctx, newUser);
  }
  // activate or create profile
  const profile = await Profile.findOne({ author: uid, active: 1 }).exec();
  console.log(profile);
  if (profile) {
    logger.debug(ctx, "profile already activated");
    logger.debug(ctx, profile);
    await ctx.reply("profile already activated");
  } else {
    logger.debug(ctx, "no active profile, need to choose");
    await ctx.reply(
      "no active profile, need to choose",
      getProfilesInlineKeyboard()
    );
  }

  //await ctx.reply('Choose language / Выбери язык', getLanguageKeyboard());

  //await ctx.scene.leave();
});

start.leave(async (ctx) => {
  const { mainKeyboard } = getMainKeyboard(ctx);
  await ctx.reply("выход из сцены старт", mainKeyboard);
  await ctx.scene.leave();
});

start.command("back", leave());

start.action(/profileChange/, profileChangeAction);

/*start.action(/confirmAccount/, async (ctx: ContextMessageUpdate) => {
    await ctx.answerCbQuery();
    ctx.scene.leave();
    });*/

export default start;
