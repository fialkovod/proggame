import { Markup } from "telegraf";

/**
 * Returns back keyboard and its buttons according to the language
 * @param ctx - telegram context
 */
export const getBackKeyboard = (ctx) => {
  const backKeyboardBack = "Главное меню";
  let backKeyboard = Markup.keyboard([backKeyboardBack]);

  backKeyboard = backKeyboard.resize();

  return {
    backKeyboard,
    backKeyboardBack,
  };
};


export function getRestartInlineKeyboard(ctx) {
  return Markup.inlineKeyboard([
    Markup.button.callback("Перезапустить", "restart"),
  ]);
}

/**
 * Returns main keyboard and its buttons according to the language
 * @param ctx - telegram context
 */
export const getMainKeyboard = (ctx) => {
  //const mainKeyboardSearchMovies = ctx.i18n.t('keyboards.main_keyboard.search');
  //const mainKeyboardMyCollection = ctx.i18n.t('keyboards.main_keyboard.movies');
  //const mainKeyboardSettings = ctx.i18n.t('keyboards.main_keyboard.settings');
  const mainKeyboardWork = "Работа";
  const mainKeyboardShop = "Магазин";
  const mainKeyboardSupport = "Поддержка";
  const mainKeyboardAbout = "О боте";
  let mainKeyboard = Markup.keyboard([
    [mainKeyboardWork, mainKeyboardShop],
    [mainKeyboardSupport, mainKeyboardAbout],
  ]);
  mainKeyboard = mainKeyboard.resize();

  return {
    mainKeyboard,
    mainKeyboardWork,
    mainKeyboardShop,
    mainKeyboardSupport,
    mainKeyboardAbout,
  };
};
