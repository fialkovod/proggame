import { Scenes, session } from "telegraf";
import logger from "../../util/logger.js";

import { getMainKeyboard, getBackKeyboard } from "../../util/keyboards.js";
import { getAboutInlineKeyboard, getAboutMainKeyboard } from "./helpers.js";
import {
  accountSummaryAction,
  makeSummaryText,
  makeInventoryText,
  makeStatisticsText,
  accountInventoryAction,
  accountStatisticsAction,
} from "./actions.js";

import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { enter, leave } = Scenes.Stage;
const about = new Scenes.BaseScene("about");
const { backKeyboard, backKeyboardBack } = getBackKeyboard();
const { aboutMainKeyboard, aboutMainKeyboardSummary, aboutMainKeyboardBack } =
  getAboutMainKeyboard();
const { mainKeyboard } = getMainKeyboard();

about.enter(async (ctx) => {
  logger.debug(ctx, "Enters about scene");
  //await ctx.reply("Статистика персонажа", aboutMainKeyboard);
  await ctx.sendPhoto(
    {
      source: join(__dirname, "..", "..", "pics", "person.jpg"),
    },
    aboutMainKeyboard
  );
  await ctx.reply(makeSummaryText(ctx), getAboutInlineKeyboard(ctx));
});

about.leave(async (ctx) => {
  logger.debug(ctx, "Leaves about scene");
  await ctx.reply("ок", mainKeyboard);
});

about.hears(backKeyboardBack, leave());
about.hears(aboutMainKeyboardBack, leave());
//about.hears(aboutMainKeyboardSummary, accountSummaryAction);
about.command("/back", leave());

about.hears(
  /Персонаж/,
  async (ctx) =>
    await ctx.reply(makeSummaryText(ctx), getAboutInlineKeyboard(ctx))
);
about.hears(
  /Инвентарь/,
  async (ctx) =>
    await ctx.reply(makeInventoryText(ctx), getAboutInlineKeyboard(ctx))
);
about.hears(
  /Статистика/,
  async (ctx) =>
    await ctx.reply(makeStatisticsText(ctx), getAboutInlineKeyboard(ctx))
);
about.hears(/Главное меню/, leave());

about.action(/summary/, accountSummaryAction);
about.action(/inventory/, accountInventoryAction);
about.action(/statistics/, accountStatisticsAction);
about.action(/Главное меню/, leave());

export default about;
