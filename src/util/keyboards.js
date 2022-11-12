import { Markup } from 'telegraf';

/**
 * Returns back keyboard and its buttons according to the language
 * @param ctx - telegram context
 */
export const getBackKeyboard = (ctx) => {
  const backKeyboardBack = 'Назад';
  let backKeyboard = Markup.keyboard([backKeyboardBack]);

  backKeyboard = backKeyboard.resize();

  return {
    backKeyboard,
    backKeyboardBack
  };
};

/**
 * Returns main keyboard and its buttons according to the language
 * @param ctx - telegram context
 */
export const getMainKeyboard = (ctx) => {
  //const mainKeyboardSearchMovies = ctx.i18n.t('keyboards.main_keyboard.search');
  //const mainKeyboardMyCollection = ctx.i18n.t('keyboards.main_keyboard.movies');
  //const mainKeyboardSettings = ctx.i18n.t('keyboards.main_keyboard.settings');
  const mainKeyboardAbout = 'О боте';
  const mainKeyboardSupport = 'Поддержка';
  const mainKeyboardContact = 'Контакты';
  let mainKeyboard = Markup.keyboard([
    [mainKeyboardAbout],
    [mainKeyboardSupport, mainKeyboardContact]
  ]);
  mainKeyboard = mainKeyboard.resize();

  return {
    mainKeyboard,
    mainKeyboardAbout,
    mainKeyboardSupport,
    mainKeyboardContact
  };
};