import { Scenes, session } from 'telegraf';
//import { languageChangeAction } from './actions';
//import { getLanguageKeyboard } from './helpers';
import logger from '../../util/logger.js';
import User from '../../models/User.js';

import {
    accountSummaryAction,
    closeAccountSummaryAction
  } from './actions.js';
  import { getMainKeyboard, getBackKeyboard } from '../../util/keyboards.js';
  import { getWorkInlineKeyboard } from './helpers.js';
//import { deleteFromSession } from '../../util/session';


const { enter, leave } = Scenes.Stage;
const work = new Scenes.BaseScene('work');
const { backKeyboard, backKeyboardBack } = getBackKeyboard();

work.enter(async (ctx) => {
  logger.debug(ctx, 'Enters work scene');
  
  await ctx.reply('Вошли в сцена работы, ставим новую локальную главную клавиатуру', backKeyboard);
  await ctx.reply('Тут ждем работу на входе с локальной клавиатурой', getWorkInlineKeyboard(ctx));
});

work.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves work scene');
  const { mainKeyboard } = getMainKeyboard(ctx);
  await ctx.reply('Выход из сцены работы', mainKeyboard);
});

//settings.command('saveme', leave());
work.hears(backKeyboardBack, leave());
work.command("/back", leave());


work.action(/accountSummary/, accountSummaryAction);
work.action(/closeAccountSummary/, closeAccountSummaryAction);

export default work;