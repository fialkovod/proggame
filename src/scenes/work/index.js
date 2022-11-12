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
  import { getWorkMainKeyboard } from './helpers.js';
//import { deleteFromSession } from '../../util/session';


const { leave } = Scenes.Stage;
const work = new Scenes.BaseScene('work');

work.enter(async (ctx) => {
  logger.debug(ctx, 'Enters work scene');
  const { backKeyboard } = getBackKeyboard(ctx);

  await ctx.reply('Цто дальше делать', getWorkMainKeyboard(ctx));
  await ctx.reply('Сцена работы', backKeyboard);
});

work.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves work scene');
  const { mainKeyboard } = getMainKeyboard(ctx);
  await ctx.reply('Че дальше из работы', mainKeyboard);
});

//settings.command('saveme', leave());
work.hears("Назад", leave());
work.command("/back", leave());
work.action(/accountSummary/, accountSummaryAction);
work.action(/closeAccountSummary/, closeAccountSummaryAction);

export default work;