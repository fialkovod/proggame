import logger from "../../util/logger.js";
import Profile from "../../models/Profile.js";
import User from "../../models/User.js";
import { getProfilesConfirmKeyboard } from "./helpers.js";
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
  logger.debug(ctx, user);

  const profilesConfirmKeyboard = getProfilesConfirmKeyboard(ctx);
  profilesConfirmKeyboard.disable_web_page_preview = true;

  await ctx.reply("переключаем профиль");
  await sleep(2);
  await ctx.reply("начинаем работу", profilesConfirmKeyboard);

  await ctx.answerCbQuery();
};
