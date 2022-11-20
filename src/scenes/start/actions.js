import logger from "../../util/logger.js";
import Profile from "../../models/Profile.js";
import User from "../../models/User.js";
import {
  getProfilesInlineKeyboard,
  getProfilesConfirmInlineKeyboard,
} from "./helpers.js";
import { sleep } from "../../util/common.js";

export const profileChangeAction = async (ctx) => {
  const profileData = JSON.parse(ctx.callbackQuery.data);
  logger.debug(ctx, "create or update profile");
  let profile = await Profile.findOneAndUpdate(
    { author: ctx.from.id, profileName: profileData.p },
    {
      author: ctx.from.id,
      profileName: profileData.p,
    },
    { new: true, upsert: true }
  );

  let user = await User.findOneAndUpdate(
    { uid: ctx.from.id },
    { activeProfile: profile },
    { new: true }
  );
  //logger.debug(ctx, profile);
  //logger.debug(ctx, user);
  ctx.user = user;
  ctx.profile = profile;
  await ctx.answerCbQuery();
  await profileConfirmAction(ctx);
};

export const profileConfirm = async (ctx) => {
  //console.log(ctx);
  await ctx.reply(
    `Выбран профиль: ${ctx.profile.profileName}. Приступим?`,
    getProfilesConfirmInlineKeyboard(ctx)
  );
};

export const profileConfirmAction = async (ctx) => {
  await profileConfirm(ctx);
  await ctx.answerCbQuery();
};

export const profileSelect = async (ctx) => {
  await ctx.reply("Выберите профиль:", getProfilesInlineKeyboard());
};

export const profileSelectAction = async (ctx) => {
  profileSelect(ctx);
  await ctx.answerCbQuery();
};
