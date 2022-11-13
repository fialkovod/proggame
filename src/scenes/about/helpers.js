import { Markup} from 'telegraf';

/**
 * Returns main settings keyboard
 */
 export function getAboutMainKeyboard(ctx) {
    const aboutMainKeyboardSummary = 'О персонаже';
    const aboutMainKeyboardBack = 'Главное меню';
    let aboutMainKeyboard = Markup.keyboard([
        [aboutMainKeyboardSummary, aboutMainKeyboardBack],
    ]).resize();
  
    return {
        aboutMainKeyboard,
        aboutMainKeyboardSummary,
        aboutMainKeyboardBack,
    };
}


export function getAboutInlineKeyboard(ctx) {
    return Markup.inlineKeyboard([
        Markup.button.callback("О персонаже", "О персонаже"),
        Markup.button.callback("Главное меню", "Главное меню"),

    ])
}