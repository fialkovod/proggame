import { Markup} from 'telegraf';

/**
 * Returns main settings keyboard
 */
export function getWorkMainKeyboard(ctx) {
  return Extra.HTML().markup((m) =>
    m.inlineKeyboard(
      [
        m.callbackButton(
          'Про работу',
          JSON.stringify({ a: 'accountSummary' }),
          false
        )
      ],
      {}
    )
  );
}

/**
 * Returns account summary keyboard
 */
export function getAccountSummaryKeyboard(ctx) {
  return Extra.HTML().markup((m) =>
    m.inlineKeyboard(
      [
        m.callbackButton(
          "Назад",
          JSON.stringify({ a: 'closeAccountSummary' }),
          false
        )
      ],
      {}
    )
  );
}
