import { getAboutInlineKeyboard } from "./helpers.js";
import logger from "../../util/logger.js";

export const makeSummaryText = (ctx) => {
  return `про аккаунт ${ctx.user.username}, 
    ID: ${ctx.user._id}, 
    power: ${ctx.profile.currentPower}, 
    maxPower: ${ctx.profile.maxPower}, 
    speedPower: ${ctx.profile.speedPower}, 
    doneTask: ${ctx.profile.doneTask}, 
    ${process.env.npm_package_version}`;
};

export const makeInventoryText = (ctx) => {
  return `про аккаунт ${ctx.user.username}, 
    ID: ${ctx.user._id}, 
    power: ${ctx.profile.currentPower}, 
    maxPower: ${ctx.profile.maxPower}, 
    speedPower: ${ctx.profile.speedPower}, 
    doneTask: ${ctx.profile.doneTask}, 
    ${process.env.npm_package_version}`;
};

export const makeStatisticsText = (ctx) => {
  return `про аккаунт ${ctx.user.username}, 
    ID: ${ctx.user._id}, 
    power: ${ctx.profile.currentPower}, 
    maxPower: ${ctx.profile.maxPower}, 
    speedPower: ${ctx.profile.speedPower}, 
    doneTask: ${ctx.profile.doneTask}, 
    ${process.env.npm_package_version}`;
};

export const accountSummaryAction = async (ctx) => {
  logger.debug(ctx, "Checking account summary");
  //console.log("ctx:", ctx);
  await ctx.reply(makeSummaryText(ctx), getAboutInlineKeyboard(ctx));
  await ctx.answerCbQuery();
};

export const accountInventoryAction = async (ctx) => {
  logger.debug(ctx, "Checking account inventory");
  //console.log("ctx:", ctx);
  await ctx.reply(makeInventoryText(ctx), getAboutInlineKeyboard(ctx));
  await ctx.answerCbQuery();
};

export const accountStatisticsAction = async (ctx) => {
  logger.debug(ctx, "Checking account statistics");
  //console.log("ctx:", ctx);
  await ctx.reply(makeStatisticsText(ctx), getAboutInlineKeyboard(ctx));
  await ctx.answerCbQuery();
};
