import {
  getWorkInlineKeyboard,
  getAccountSummaryKeyboard,
} from './helpers.js';
import logger from '../../util/logger.js';
import User from '../../models/User.js';
import { getBackKeyboard } from '../../util/keyboards.js';


export const sendQuizAction = async (ctx) => {
    let open_period = 5;
    let ret = await ctx.sendQuiz('Тут отправляем poll', ['123', '456'], {correct_option_id: 0, open_period:open_period, is_anonymous: false});
    let failTO = setTimeout(async (ctx)=> {return await ctx.reply('Упс, время вышло!')}, open_period)
    ret.failTO = failTO;
    ctx.session.currentQuiz = ret;
    // console.log(ret);
}


export const analizeQuizAction = async (ctx) => {
    let user_id = ctx?.user._id
    if (user_id) {
      let currentQuiz = ctx.session.currentQuiz;
      let ctxPollId = ctx.update.poll_answer.poll_id;
      let ctxOptionId = ctx.update.poll_answer.option_ids[0];

      if ((ctxPollId === currentQuiz.poll.id) && (ctxOptionId === currentQuiz.poll.correct_option_id)) {
        await ctx.telegram.sendMessage(user_id, 'Отлично, правильный ответ!')
      } else {
        await ctx.telegram.sendMessage(user_id, 'Упс, ответ неверный!')
      }

    } else {
      logger.debug(ctx, 'Problems with poll answer');
    }


}