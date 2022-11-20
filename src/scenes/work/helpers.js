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
      Markup.button.callback("Работать", JSON.stringify({ a: "sendquiz" })),
      Markup.button.callback(
        "Главное меню",
        JSON.stringify({ a: "Главное меню" })
      ),
    ],
    [
      Markup.button.callback(
        "👍 Лайк",
        JSON.stringify({ a: "plusVote", p: ctx.session.currentQuiz.quiz_id })
      ),
      Markup.button.callback(
        "👎 Отстой",
        JSON.stringify({ a: "minusVote", p: ctx.session.currentQuiz.quiz_id })
      ),
    ],
  ]);
}

export function getWorkShortInlineKeyboard(ctx) {
  return Markup.inlineKeyboard([
    Markup.button.callback("Работать", JSON.stringify({ a: "sendquiz" })),
    Markup.button.callback(
      "Главное меню",
      JSON.stringify({ a: "Главное меню" })
    ),
  ]);
}

export function getWorkLowPowerInlineKeyboard(ctx) {
  return Markup.inlineKeyboard([
    Markup.button.callback("Энергетик", JSON.stringify({ a: "Энергетик" })),
    Markup.button.callback(
      "Главное меню",
      JSON.stringify({ a: "Главное меню" })
    ),
  ]);
}
