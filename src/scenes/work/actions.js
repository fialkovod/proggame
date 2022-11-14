import {
  getWorkInlineKeyboard,
  getAccountSummaryKeyboard,
} from './helpers.js';
import logger from '../../util/logger.js';
import User from '../../models/User.js';
import { getBackKeyboard } from '../../util/keyboards.js';


export const sendQuizAction = async (ctx) => {
    let ret = await ctx.sendQuiz('Тут отправляем poll', ['123', '456'], {correct_option_id: 0, open_period:5, is_anonymous: false});
    // console.log(ret);
}


export const analizeQuizAction = async (ctx) => {
    /*console.log(ctx);
    console.log(ctx.update.poll_answer);
    console.log(ctx.update.poll_answer.user);
    console.log(ctx.update.poll_answer.option_ids);*/
    let user_id = ctx.user?._id
    await ctx.telegram.sendMessage(user_id, 'Тут надо оценить результат квиза');
}