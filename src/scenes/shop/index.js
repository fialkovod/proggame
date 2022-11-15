import { Scenes, session } from "telegraf";
import logger from "../../util/logger.js";
import User from "../../models/User.js";
import { getMainKeyboard, getBackKeyboard } from "../../util/keyboards.js";
import { getShopInlineKeyboard } from "./helpers.js";

const { enter, leave } = Scenes.Stage;
const shop = new Scenes.BaseScene("shop");
const { backKeyboard, backKeyboardBack } = getBackKeyboard();

shop.enter(async (ctx) => {
  logger.debug(ctx, "Enters shop scene");

  await ctx.reply(
    "Вошли в сцену shop, ставим новую локальную главную клавиатуру",
    backKeyboard
  );
  await ctx.reply(
    "Тут ждем shop на входе с локальной клавиатурой",
    getShopInlineKeyboard(ctx)
  );
});

shop.leave(async (ctx) => {
  logger.debug(ctx, "Leaves shop scene");
  const { mainKeyboard } = getMainKeyboard(ctx);
  await ctx.reply("Выход из сцены shop", mainKeyboard);
});

//settings.command('saveme', leave());
shop.hears(backKeyboardBack, leave());
shop.command("/back", leave());

export default shop;
