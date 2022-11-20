import logger from "../../util/logger.js";
import { timeout } from "../../util/common.js";
import Profile from "../../models/Profile.js";
import Quizrun from "../../models/Quizrun.js";
import Feedback from "../../models/Feedback.js";
import {
  getWorkInlineKeyboard,
  getWorkShortInlineKeyboard,
  getWorkLowPowerInlineKeyboard,
} from "./helpers.js";
import { quizesjs } from "../../../quiz/js/index.js";
import { quizespython } from "../../../quiz/python/index.js";
import { quizessolidity } from "../../../quiz/solidity/index.js";

import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const quizes = [];
quizes["js"] = quizesjs;
quizes["python"] = quizespython;
quizes["solidity"] = quizessolidity;

const _getNextQuiz = async (ctx) => {
  let q =
    Math.floor(Math.random() * quizes[ctx.profile.profileName].length) + 1;
  //console.log("len: ", quizes[ctx.profile.profileName].length);
  //console.log("q: ", q);
  return quizes[ctx.profile.profileName].find((qw) => qw.id == q);
};

export const sendQuizAction = async (ctx) => {
  if (!ctx.session.currentQuiz) {
    if (ctx?.profile?.currentPower > 0) {
      const quiz = await _getNextQuiz(ctx);
      //console.log("user: ", ctx.user);
      //console.log("ctx: ", ctx);
      let profile_id = ctx?.profile?._id;
      await Profile.findByIdAndUpdate(
        { _id: profile_id },
        { $inc: { currentPower: -1 } },
        { new: true }
      )
        //.then(doc=>console.log(doc))
        .catch((err) => logger.debug(ctx, err));

      let open_period = quiz.open_period;
      if (quiz.pic) {
        await ctx
          .sendPhoto({
            source: join(
              __dirname,
              "..",
              "..",
              "..",
              "quiz",
              ctx.profile.profileName,
              "pics",
              quiz.id + ".jpg"
            ),
          })
          .catch((err) => logger.debug(ctx, err));
      }
      let ret = await ctx.sendQuiz(quiz.question, quiz.options, {
        correct_option_id: quiz.correct_option_id,
        open_period: open_period,
        is_anonymous: false,
      });
      ret.quizTO = timeout(ctx, _QuizTimeOut, open_period * 1000);
      ret.quiz_id = quiz.id;
      ctx.session.currentQuiz = ret;
    } else {
      await ctx.reply("Энергия закончилась!");
    }
  } else {
    await ctx.reply("Есть задача!");
  }

  // console.log(ret);
};

const _QuizTimeOut = async (ctx) => {
  //console.log("timeout fired");
  //console.log("ctx: ", ctx);
  ctx.profile.currentPower--;
  await _sendResponse(ctx, "timeout");
  /*if (ctx.profile.currentPower > 0) {
    await ctx.reply("Время вышло", getWorkInlineKeyboard(ctx));
  } else {
    await ctx.reply("Время вышло", getWorkLowPowerInlineKeyboard(ctx));
  }*/

  //let user_id = ctx?.session?.currentQuiz?.chat?.id;
  let profile_id = ctx?.profile?.id;
  Profile.findOneAndUpdate(
    { _id: profile_id },
    { $inc: { timeoutAnswers: 1 } },
    { new: true }
  )
    //.then(doc=>console.log(doc))
    .catch((err) => logger.debug(ctx, err));
  const qr = new Quizrun({
    profile: ctx?.profile?.id,
    profileName: ctx?.profile?.profileName,
    quiz_id: ctx.session.currentQuiz.quiz_id,
    status: -1,
  });
  await qr.save();
  ctx.session.currentQuiz = null;
};

const _QuizCorrectAnswer = async (ctx) => {
  //console.log("right answer");
  //console.log("ctx: ", ctx);
  let profile_id = ctx?.profile?._id;
  if (profile_id) {
    await _sendResponse(ctx, "correct");
    Profile.findOneAndUpdate(
      { _id: profile_id },
      { $inc: { correctAnswers: 1, doneTask: 1 } },
      { new: true }
    )
      //.then(doc=>console.log(doc))
      .catch((err) => logger.debug(ctx, err));

    const qr = new Quizrun({
      profile: ctx?.profile?.id,
      profileName: ctx?.profile?.profileName,
      quiz_id: ctx.session.currentQuiz.quiz_id,
      status: 1,
    });
    await qr.save();
    //.then(doc=>console.log(doc))
    //.catch((err) => logger.debug(ctx, err));
  } else {
    logger.debug(ctx, "Problems with right poll answer");
  }
  ctx.session.currentQuiz = null;
};

const _QuizWrongAnswer = async (ctx) => {
  //console.log('timeout fired');
  //console.log('ctx: ', ctx);
  let profile_id = ctx?.profile?._id;
  if (profile_id) {
    await _sendResponse(ctx, "wrong");
    Profile.findOneAndUpdate(
      { _id: profile_id },
      { $inc: { wrongAnswers: 1 } },
      { new: true }
    )
      //.then(doc=>console.log(doc))
      .catch((err) => logger.debug(ctx, err));
    const qr = new Quizrun({
      profile: profile_id,
      profileName: ctx?.profile?.profileName,
      quiz_id: ctx.session.currentQuiz.quiz_id,
      status: 0,
    });
    await qr.save();
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
      await _QuizCorrectAnswer(ctx);
    } else {
      await _QuizWrongAnswer(ctx);
    }
  } else {
    logger.debug(ctx, "Problems with poll answer");
  }
  ctx.session.currentQuiz = null;
};

export const saveLikeAction = async (ctx) => {
  const buttonData = JSON.parse(ctx.callbackQuery.data);
  const quiz_id = buttonData.p;

  console.log(`like action fired for quiz ${quiz_id}`);
  const fb = await Feedback.findOne({
    profile: ctx?.profile?.id,
    quiz_id: quiz_id,
  });
  if (fb) {
    ctx.reply("Уже голосовали");
  } else {
    const newfb = new Feedback({
      profile: ctx?.profile?.id,
      profileName: ctx?.profile?.profileName,
      quiz_id: quiz_id,
      status: 1,
    });
    await newfb.save();
    ctx.reply("Очень рады");
  }
};

export const saveDislikeAction = async (ctx) => {
  const buttonData = JSON.parse(ctx.callbackQuery.data);
  const quiz_id = buttonData.p;

  console.log(`dislike action fired for quiz ${quiz_id}`);
  const fb = await Feedback.findOne({
    profile: ctx?.profile?.id,
    quiz_id: quiz_id,
  });
  if (fb) {
    ctx.reply("Уже голосовали");
  } else {
    const newfb = new Feedback({
      profile: ctx?.profile?.id,
      profileName: ctx?.profile?.profileName,
      quiz_id: quiz_id,
      status: -1,
    });
    await newfb.save();
    ctx.reply("Очень жаль");
  }
};

async function _sendResponse(ctx, type) {
  let msg;
  let energy = `\n⚡ Энергия ${ctx.profile.currentPower}/${ctx.profile.maxPower} (-1)`;
  let plan = `\n🛠️ Выполнение плана ${ctx.profile.doneTask + 1}/10`;
  let experience = `\n🏆 Опыт ${ctx.profile.correctAnswers + 1} (+1)`;

  switch (type) {
    case "correct":
      msg = "👍 Отлично, правильный ответ!" + energy + experience + plan;
      break;
    case "wrong":
      msg = "👎 Упс! Ответ неверный!" + energy;
      break;
    case "timeout":
      msg = "⌛ Время вышло!" + energy;
      break;
  }
  const kbd =
    ctx.profile.currentPower > 0
      ? getWorkInlineKeyboard(ctx)
      : getWorkLowPowerInlineKeyboard(ctx);
  await ctx.telegram.sendMessage(ctx?.user?._id, `${msg}`, kbd);
}
