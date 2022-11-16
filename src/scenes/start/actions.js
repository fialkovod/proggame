import logger from "../../util/logger.js";
import Profile from "../../models/Profile.js";
import { getProfilesConfirmKeyboard } from "./helpers.js";
import { sleep } from "../../util/common.js";

export const profileChangeAction = async (ctx) => {
  const profileData = JSON.parse(ctx.callbackQuery.data);

  await updateProfile(ctx, profileData.p);

  const profilesConfirmKeyboard = getProfilesConfirmKeyboard(ctx);
  profilesConfirmKeyboard.disable_web_page_preview = true;

  await ctx.reply("создаем новый профиль");
  await sleep(2);
  await ctx.reply("начинаем работу", profilesConfirmKeyboard);

  await ctx.answerCbQuery();
};

async function updateProfile(ctx, newProfile) {
  logger.debug(ctx, "Updating profile for user to %s", newProfile);
  await Profile.findOneAndUpdate(
    { author: ctx.from.id },
    {
      active: 1,
    },
    { new: true }
  );

  //saveToSession(ctx, "profile", newProfile);
}
