import { Scenes, session } from 'telegraf';
import logger from '../../util/logger.js';
import { sendQuizAction } from './actions.js';
import { getMainKeyboard, getBackKeyboard } from '../../util/keyboards.js';
import { getWorkInlineKeyboard, getWorkMainKeyboard } from './helpers.js';

const { enter, leave } = Scenes.Stage;
const work = new Scenes.BaseScene('work');
const { backKeyboard, backKeyboardBack } = getBackKeyboard();
const {workMainKeyboard, workMainKeyboardToWork, workMainKeyboardBack} = getWorkMainKeyboard()

work.enter(async (ctx) => {
  logger.debug(ctx, 'Enters work scene');
  
  await ctx.reply('Вошли в сцена работы, ставим новую локальную главную клавиатуру', workMainKeyboard);
  await ctx.reply('Тут ждем работу на входе с локальной клавиатурой', getWorkInlineKeyboard(ctx));
});

work.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves work scene');
  const { mainKeyboard } = getMainKeyboard(ctx);
  await ctx.reply('Выход из сцены работы', mainKeyboard);
});

//settings.command('saveme', leave());
work.hears(backKeyboardBack, leave());
work.hears(workMainKeyboardToWork, ctx => sendQuizAction(ctx));
work.hears(workMainKeyboardBack, leave());
work.command("/back", leave());


work.action(/sendquiz/, sendQuizAction);
work.action(/Главное меню/, leave());
//work.action(/closeAccountSummary/, closeAccountSummaryAction);

/*work.on("poll_answer", ctx => console.log(ctx))
work.on("poll", ctx => console.log("poll: ", ctx))
*/


export default work;