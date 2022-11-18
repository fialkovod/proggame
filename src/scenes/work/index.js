import { Scenes, session } from "telegraf";
import logger from "../../util/logger.js";
import {
  sendQuizAction,
  saveLikeAction,
  saveDislikeAction,
} from "./actions.js";
import { getMainKeyboard, getBackKeyboard } from "../../util/keyboards.js";
import {
  getWorkInlineKeyboard,
  getWorkMainKeyboard,
  getWorkShortInlineKeyboard,
  getWorkLowPowerInlineKeyboard,
} from "./helpers.js";

const { leave } = Scenes.Stage;
const work = new Scenes.BaseScene("work");
const { backKeyboard, backKeyboardBack } = getBackKeyboard();
const { workMainKeyboard, workMainKeyboardToWork, workMainKeyboardBack } =
  getWorkMainKeyboard();

work.enter(async (ctx) => {
  logger.debug(ctx, "Enters work scene");
  //console.log(ctx);
  await ctx.reply(
    `Выполнено заданий : ${ctx.profile.doneTask} из 10`,
    workMainKeyboard
  );
  if (ctx.profile.currentPower > 0) {
    await ctx.reply(
      `Запас энергии: ${ctx.profile.currentPower}`,
      getWorkShortInlineKeyboard(ctx)
    );
  } else {
    await ctx.reply(
      `Запас энергии: ${ctx.profile.currentPower}`,
      getWorkLowPowerInlineKeyboard(ctx)
    );
  }
});

work.leave(async (ctx) => {
  logger.debug(ctx, "Leaves work scene");
  const { mainKeyboard } = getMainKeyboard(ctx);
  await ctx.reply("Ждем снова на работе!", mainKeyboard);
});

//settings.command('saveme', leave());
work.hears(backKeyboardBack, leave());
work.hears(workMainKeyboardToWork, (ctx) => sendQuizAction(ctx));
work.hears(workMainKeyboardBack, leave());
work.command("/back", leave());

work.action(/sendquiz/, sendQuizAction);
work.action(/Лайк/, saveLikeAction);
work.action(/Отстой/, saveDislikeAction);
work.action(/Главное меню/, leave());
//work.action(/closeAccountSummary/, closeAccountSummaryAction);

/*work.on("poll_answer", ctx => console.log(ctx))
work.on("poll", ctx => console.log("poll: ", ctx))
*/

export default work;
