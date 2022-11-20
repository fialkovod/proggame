import { Markup } from "telegraf";

/**
 * Returns main settings keyboard
 */
export function getAboutMainKeyboard(ctx) {
  const aboutMainKeyboardSummary = "Персонаж";
  const aboutMainKeyboardInventory = "Инвентарь";
  const aboutMainKeyboardStatistics = "Статистика";
  const aboutMainKeyboardBack = "Главное меню";
  let aboutMainKeyboard = Markup.keyboard([
    [aboutMainKeyboardSummary, aboutMainKeyboardInventory],
    [aboutMainKeyboardStatistics, aboutMainKeyboardBack],
  ]).resize();

  return {
    aboutMainKeyboard,
    aboutMainKeyboardSummary,
    aboutMainKeyboardInventory,
    aboutMainKeyboardStatistics,
    aboutMainKeyboardBack,
  };
}

export function getAboutInlineKeyboard(ctx) {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback("Персонаж", "summary"),
      Markup.button.callback("Инвентарь", "inventory"),
    ],
    [
      Markup.button.callback("Статистика", "statistics"),
      Markup.button.callback("Главное меню", "Главное меню"),
    ],
  ]);
}
