import { Markup} from 'telegraf';

/**
 * Returns main settings keyboard
 */
export function getAboutInlineKeyboard(ctx) {
    return Markup.inlineKeyboard([
        Markup.button.callback("Назад3", "/back"),

    ])
}