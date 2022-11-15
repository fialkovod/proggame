import { Markup } from "telegraf";

/**
 * Returns main settings keyboard
 */

export function getWorkMainKeyboard(ctx) {
  const workMainKeyboardToWork = "Работать";
  const workMainKeyboardBack = "Главное меню";
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
    Markup.button.callback("Работать", "sendquiz"),
    Markup.button.callback("Главное меню", "Главное меню"),
  ]);
}

/**
 * Returns account summary keyboard
 */
export function getAccountSummaryKeyboard(ctx) {
  return Markup.inlineKeyboard([Markup.button.callback("Назад1", "Назад3")]);
}
