import { Markup } from "telegraf";
export function getProfilesInlineKeyboard(ctx) {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback(
        "JavaScript",
        JSON.stringify({ a: "profileChange", p: "js" })
      ),
    ],
    [
      Markup.button.callback(
        "Python",
        JSON.stringify({ a: "profileChange", p: "python" })
      ),
    ],
    [
      Markup.button.callback(
        "Solidity",
        JSON.stringify({ a: "profileChange", p: "solidity" })
      ),
    ],
  ]);
}

export function getProfilesConfirmInlineKeyboard(ctx) {
  return Markup.inlineKeyboard([
    Markup.button.callback("Поехали", JSON.stringify({ a: "profileConfirm" })),
    Markup.button.callback(
      "Сменить профиль",
      JSON.stringify({ a: "profileSelect" })
    ),
  ]);
}
