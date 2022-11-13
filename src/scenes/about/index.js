import { Scenes, session } from 'telegraf';
import logger from '../../util/logger.js';

import { getMainKeyboard, getBackKeyboard } from '../../util/keyboards.js';
import { getAboutInlineKeyboard, getAboutMainKeyboard } from './helpers.js';
import {accountSummaryAction} from './actions.js'

const { enter, leave } = Scenes.Stage;
const about = new Scenes.BaseScene('about');
const { backKeyboard, backKeyboardBack } = getBackKeyboard();
const {aboutMainKeyboard, aboutMainKeyboardSummary, aboutMainKeyboardBack} = getAboutMainKeyboard();
const { mainKeyboard } = getMainKeyboard();

about.enter(async (ctx) => {
  logger.debug(ctx, 'Enters about scene');
  await ctx.reply('Вошли в сцену about, ставим новую локальную главную клавиатуру', aboutMainKeyboard);
  await ctx.reply('Вот тут про бота, с инлайн-клавой', getAboutInlineKeyboard(ctx));
});

about.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves about scene');  
  await ctx.reply('Выход из сцены about с возвратом клавиатуры', mainKeyboard);
});

about.hears(backKeyboardBack, leave());
about.hears(aboutMainKeyboardBack, leave());
about.hears(aboutMainKeyboardSummary, accountSummaryAction);
about.command("/back", leave());

about.action(/О персонаже/, accountSummaryAction);
about.action(/Главное меню/, leave());

export default about;