import {
    getAboutInlineKeyboard,
  } from './helpers.js';
  import logger from '../../util/logger.js';
  import User from '../../models/User.js';
  import { getBackKeyboard } from '../../util/keyboards.js';
  
export const accountSummaryAction = async (ctx) => {
  logger.debug(ctx, 'Checking account summary');
  const user = await User.findById(ctx.from.id);

  await ctx.reply(
    `про аккаунт ${user.username}, ${user._id}, ${process.env.npm_package_version}`, 
    getAboutInlineKeyboard(ctx)
  );
  await ctx.answerCbQuery();
};
