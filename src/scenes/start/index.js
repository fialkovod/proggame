import { Scenes, session } from "telegraf";
//import { languageChangeAction } from './actions';
//import { getLanguageKeyboard } from './helpers';
import logger from "../../util/logger.js";
import User from "../../models/User.js";
import { getMainKeyboard } from "../../util/keyboards.js";

const { enter, leave } = Scenes.Stage;
const start = new Scenes.BaseScene("start");

start.enter(async (ctx) => {
  //console.log("context on start", ctx);
  const uid = String(ctx.from.id);
  //console.log("ctx.from: ", ctx.from);
  //console.log("uid: ", uid);
  const user = await User.findById(uid);
  const { mainKeyboard, mainKeyboardWork } = getMainKeyboard(ctx);

  if (user) {
    await ctx.reply("user already registered");
  } else {
    logger.debug(ctx, "New user has been created");
    const now = new Date().getTime();

    const newUser = new User({
      _id: uid,
      created: now,
      username: ctx.from.username,
      name: (ctx.from.first_name + " " + (ctx.from.last_name ?? "")).trim(),
      lastActivity: now,
    });

    await newUser.save();
    logger.debug(ctx, newUser);

    //await ctx.reply('Choose language / Выбери язык', getLanguageKeyboard());
  }
  await ctx.scene.leave();
});

start.leave(async (ctx) => {
  const { mainKeyboard } = getMainKeyboard(ctx);
  await ctx.reply("выход из сцены старт", mainKeyboard);
  await ctx.scene.leave();
});

start.command("back", leave());

//start.action(/languageChange/, languageChangeAction);
/*start.action(/confirmAccount/, async (ctx: ContextMessageUpdate) => {
    await ctx.answerCbQuery();
    ctx.scene.leave();
    });*/

export default start;
