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
  const { mainKeyboard, mainKeyboardWork } = getMainKeyboard(ctx);

  let user = await User.findByIdAndUpdate(
    { _id: uid },
    {
      _id: uid,
      username: ctx.from.username,
      name: (ctx.from.first_name + " " + (ctx.from.last_name ?? "")).trim(),
      lastActivity: new Date().getTime(),
    },
    { new: true, upsert: true }
  );
  logger.debug(ctx, user);
  if (user.activeProfile) {
    logger.debug(ctx, "user has profile");
    await ctx.reply("user registered and has profile");
  } else {
    await ctx.reply(
      "Choose profile / Выбери профиль",
      getProfilesInlineKeyboard()
    );
  }
  //

  //await ctx.scene.leave();
});

start.leave(async (ctx) => {
  const { mainKeyboard } = getMainKeyboard(ctx);
  await ctx.reply("выход из сцены старт", mainKeyboard);
  await ctx.scene.leave();
});

start.command("back", leave());

start.action(/profileChange/, profileChangeAction);

export default start;
