import { getAboutInlineKeyboard } from "./helpers.js";
import logger from "../../util/logger.js";
import Profile from "../../models/Profile.js";
import { getBackKeyboard } from "../../util/keyboards.js";

export const accountSummaryAction = async (ctx) => {
  logger.debug(ctx, "Checking account summary");
  const profile = await Profile.findById(ctx.profile.id);
  await ctx.reply(
    `про аккаунт ${ctx.user.username}, 
    ID: ${ctx.user._id}, 
    power: ${profile.currentPower}, 
    maxPower: ${profile.maxPower}, 
    speedPower: ${profile.speedPower}, 
    doneTask: ${profile.doneTask}, 
    ${process.env.npm_package_version}`,
    getAboutInlineKeyboard(ctx)
  );
  await ctx.answerCbQuery();
};
