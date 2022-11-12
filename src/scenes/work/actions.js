import {
  getWorkMainKeyboard,
  getAccountSummaryKeyboard,
} from './helpers.js';
import logger from '../../util/logger.js';
import User from '../../models/User.js';
import { getBackKeyboard } from '../../util/keyboards.js';


export const accountSummaryAction = async (ctx) => {
  logger.debug(ctx, 'Checking account summary');
  const user = await User.findById(ctx.from.id);

  await ctx.editMessageText(
    "про аккаунт", {
      username: user.username,
      id: user._id,
      totalMovies: user.totalMovies,
      version: process.env.npm_package_version
    },
    getAccountSummaryKeyboard(ctx)
  );
  await ctx.answerCbQuery();
};

export const closeAccountSummaryAction = async (ctx) => {
  await ctx.editMessageText("Чего менять", getMainKeyboard(ctx));
  await ctx.answerCbQuery();
};