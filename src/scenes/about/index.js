import { Scenes, session } from 'telegraf';
import logger from '../../util/logger.js';

import { getMainKeyboard, getBackKeyboard } from '../../util/keyboards.js';
import { getAboutInlineKeyboard } from './helpers.js';


const { enter, leave } = Scenes.Stage;
const about = new Scenes.BaseScene('about');
const { backKeyboard, backKeyboardBack } = getBackKeyboard();
const { mainKeyboard } = getMainKeyboard();

about.enter(async (ctx) => {
  logger.debug(ctx, 'Enters about scene');
  await ctx.reply('Вошли в сцену about, ставим новую локальную главную клавиатуру', backKeyboard);
  await ctx.reply('Вот тут про бота, с инлайн-клавой', getAboutInlineKeyboard(ctx));
});

about.leave(async (ctx) => {
  logger.debug(ctx, 'Leaves about scene');  
  await ctx.reply('Выход из сцены about с возвратом клавиатуры', mainKeyboard);
});

about.hears(backKeyboardBack, leave());
about.command("/back", leave());

export default about;