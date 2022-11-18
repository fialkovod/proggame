import { Scenes, session } from "telegraf";
//import { languageChangeAction } from './actions';
import logger from "../../util/logger.js";
import User from "../../models/User.js";
import Profile from "../../models/Profile.js";
import { getMainKeyboard } from "../../util/keyboards.js";
import {
  profileChangeAction,
  profileConfirm,
  profileSelect,
  profileSelectAction,
} from "./actions.js";
import { Markup } from "telegraf";

const { leave } = Scenes.Stage;
const start = new Scenes.BaseScene("start");

start.enter(async (ctx) => {
  const uid = String(ctx.from.id);
  //console.log("uid: ", uid);

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
  //logger.debug(ctx, user);
  ctx.user = user;
  await ctx.reply(`Привет, ${user.name}!`, Markup.removeKeyboard(true));

  if (user.activeProfile) {
    logger.debug(ctx, "user has profile");
    ctx.profile = await Profile.findById(user.activeProfile);
    await profileConfirm(ctx);
  } else {
    await profileSelect(ctx);
  }
  //

  //await ctx.scene.leave();
});

start.leave(async (ctx) => {
  const { mainKeyboard } = getMainKeyboard(ctx);
  await ctx.reply("Куда направимся? Работа, магазин?", mainKeyboard);
  await ctx.scene.leave();
});

start.command("back", leave());

start.action(/profileChange/, profileChangeAction);
start.action(/profileSelect/, profileSelectAction);
start.action(/profileConfirm/, async (ctx) => {
  await ctx.answerCbQuery();
  ctx.scene.leave();
});

export default start;
