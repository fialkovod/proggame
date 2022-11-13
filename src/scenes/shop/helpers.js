import { Markup} from 'telegraf';

/**
 * Returns main settings keyboard
 */
export function getShopInlineKeyboard(ctx) {
    return Markup.inlineKeyboard([
        Markup.button.callback("Назад4", "/back"),
    ])
}

/**
 * Returns account summary keyboard

export function getAccountSummaryKeyboard(ctx) {
    return Markup.inlineKeyboard([
        Markup.button.callback("Назад1", "Назад3"),

    ])
}
 */