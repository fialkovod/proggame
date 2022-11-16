import { Markup } from "telegraf";
export function getProfilesInlineKeyboard(ctx) {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback(
        "JavaScript",
        JSON.stringify({ a: "profileChange", p: "JavaScript" })
      ),
    ],
    [
      Markup.button.callback(
        "Python",
        JSON.stringify({ a: "profileChange", p: "Python" })
      ),
    ],
    [
      Markup.button.callback(
        "Solidity",
        JSON.stringify({ a: "profileChange", p: "Solidity" })
      ),
    ],
  ]);
}

export function getProfilesConfirmKeyboard(ctx) {
  return Markup.inlineKeyboard([
    Markup.button.callback("Поехали", JSON.stringify({ a: "confirmProfile" })),
  ]);
}
