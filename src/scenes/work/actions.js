import { getWorkInlineKeyboard, getAccountSummaryKeyboard } from "./helpers.js";
import logger from "../../util/logger.js";
import { timeout } from "../../util/common.js";
import User from "../../models/User.js";

import { quizes } from "../../../quiz/js/index.js";

export const getNextQuizAction = async (ctx) => {
  let q = Math.floor(Math.random() * quizes.length) + 1;
  return quizes.find((qw) => qw.id == q);
};

export const sendQuizAction = async (ctx) => {
  if (!ctx.session.currentQuiz) {
    if (ctx?.user?.currentPower > 0) {
      const quiz = await getNextQuizAction(ctx);
      console.log("user: ", ctx.user);
      //console.log("ctx: ", ctx);
      let user_id = ctx?.user?._id;
      User.findOneAndUpdate(
        { _id: user_id },
        { $inc: { currentPower: -1 } },
        { new: true }
      )
        //.then(doc=>console.log(doc))
        .catch((err) => logger.debug(ctx, err));

      let open_period = quiz.open_period;
      let ret = await ctx.sendQuiz(quiz.question, quiz.options, {
        correct_option_id: quiz.correct_option_id,
        open_period: open_period,
        is_anonymous: false,
      });
      ret.quizTO = timeout(ctx, QuizTimeOutAction, open_period * 1000);
      ctx.session.currentQuiz = ret;
    } else {
      await ctx.reply("Энергия закончилась!");
    }
  } else {
    await ctx.reply("Есть задача!");
  }

  // console.log(ret);
};

const QuizTimeOutAction = async (ctx) => {
  console.log("timeout fired");
  //console.log('ctx: ', ctx);
  await ctx.reply("Время вышло");
  let user_id = ctx?.session?.currentQuiz?.chat?.id;
  User.findOneAndUpdate(
    { _id: user_id },
    { $inc: { wrongAnswers: 1 } },
    { new: true }
  )
    //.then(doc=>console.log(doc))
    .catch((err) => logger.debug(ctx, err));
  ctx.session.currentQuiz = null;
};

const QuizRightAnswerAction = async (ctx) => {
  //console.log('timeout fired');
  //console.log('ctx: ', ctx);
  let user_id = ctx?.user?._id;
  if (user_id) {
    await ctx.telegram.sendMessage(user_id, "Отлично, правильный ответ!");
    User.findOneAndUpdate(
      { _id: user_id },
      { $inc: { correctAnswers: 1 } },
      { new: true }
    )
      //.then(doc=>console.log(doc))
      .catch((err) => logger.debug(ctx, err));
  } else {
    logger.debug(ctx, "Problems with right poll answer");
  }
  ctx.session.currentQuiz = null;
};

const QuizWrongAnswerAction = async (ctx) => {
  //console.log('timeout fired');
  //console.log('ctx: ', ctx);
  let user_id = ctx?.user?._id;
  if (user_id) {
    await ctx.telegram.sendMessage(user_id, "Упс, ответ неверный!");
    User.findOneAndUpdate(
      { _id: user_id },
      { $inc: { wrongAnswers: 1 } },
      { new: true }
    )
      //.then(doc=>console.log(doc))
      .catch((err) => logger.debug(ctx, err));
  } else {
    logger.debug(ctx, "Problems with wrong poll answer");
  }
  ctx.session.currentQuiz = null;
};

export const analizeQuizAction = async (ctx) => {
  let user_id = ctx?.user._id;
  if (user_id) {
    ctx.session.currentQuiz.quizTO.cancel();
    let currentQuiz = ctx.session.currentQuiz;
    let ctxPollId = ctx.update.poll_answer.poll_id;
    let ctxOptionId = ctx.update.poll_answer.option_ids[0];

    if (
      ctxPollId === currentQuiz.poll.id &&
      ctxOptionId === currentQuiz.poll.correct_option_id
    ) {
      await QuizRightAnswerAction(ctx);
    } else {
      await QuizWrongAnswerAction(ctx);
    }
  } else {
    logger.debug(ctx, "Problems with poll answer");
  }
  ctx.session.currentQuiz = null;
};
