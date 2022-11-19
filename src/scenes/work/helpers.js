import { Markup } from "telegraf";

/**
 * Returns main settings keyboard
 */

export function getWorkMainKeyboard(ctx) {
  const workMainKeyboardToWork = "Работать";
  const workMainKeyboardBack = "Меню";
  let workMainKeyboard = Markup.keyboard([
    [workMainKeyboardToWork, workMainKeyboardBack],
  ]).resize();

  return {
    workMainKeyboard,
    workMainKeyboardToWork,
    workMainKeyboardBack,
  };
}

export function getWorkInlineKeyboard(ctx) {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("Работать", "sendquiz"),
      Markup.button.callback("Главное меню", "Главное меню"),
    ],
    [
      Markup.button.callback("Лайк", "Лайк"),
      Markup.button.callback("Отстой", "Отстой"),
    ],
  ]);
}

export function getWorkShortInlineKeyboard(ctx) {
  return Markup.inlineKeyboard([
    Markup.button.callback("Работать", "sendquiz"),
    Markup.button.callback("Главное меню", "Главное меню"),
  ]);
}

export function getWorkLowPowerInlineKeyboard(ctx) {
  return Markup.inlineKeyboard([
    Markup.button.callback("Энергетик", "Энергетик"),
    Markup.button.callback("Главное меню", "Главное меню"),
  ]);
}
