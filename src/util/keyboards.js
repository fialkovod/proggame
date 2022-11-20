import { Markup } from "telegraf";

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

export function getWorkShopInlineKeyboard(ctx) {
  return Markup.inlineKeyboard([
    Markup.button.callback("Работа", "gowork"),
    Markup.button.callback("Магазин", "goshop"),
  ]);
}


export const getMainKeyboard = (ctx) => {
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
