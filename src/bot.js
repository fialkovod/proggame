import { Telegraf, Scenes, session } from "telegraf";
import mongoose from "mongoose";
import logger from "./util/logger.js";
import { getConfig } from "./middlewares/config.js";
import { getUserInfo } from "./middlewares/user-info.js";
import startScene from "./scenes/start/index.js";
import workScene from "./scenes/work/index.js";
import shopScene from "./scenes/shop/index.js";
import aboutScene from "./scenes/about/index.js";
import dotenv from "dotenv";
import { getMainKeyboard } from "./util/keyboards.js";
import { analizeQuizAction } from "./scenes/work/actions.js";
import { startAgents } from "./util/agents.js";

const envFile = process.env.NODE_ENV === "dev" ? "dev.env" : "prod.env";
dotenv.config({ path: envFile });

mongoose.connect(`mongodb://localhost:27017/${process.env.DATABASE_HOST}`, {
  //useNewUrlParser: true,
  //useFindAndModify: false
});
mongoose.connection.on("error", (err) => {
  logger.error(
    undefined,
    `Error occurred during an attempt to establish connection with the database: %O`,
    err
  );
  process.exit(1);
});

mongoose.connection.on("open", () => {
  const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
  const stage = new Scenes.Stage([
    startScene,
    workScene,
    shopScene,
    aboutScene,
  ]);

  startAgents();

  bot.use(
    session({
      getSessionKey: ({ pollAnswer, from }) => {
        // for public quizzes
        if (pollAnswer?.user.id) {
          const { id } = pollAnswer.user;
          return `${id}:${id}`;
        }

        if (from.id == null) {
          return undefined;
        }

        return `${from.id}:${from.id}`;
      },
    })
  );
  bot.use(getUserInfo);
  bot.use(getConfig);
  bot.use(stage.middleware());

  bot.telegram.setMyCommands([
    { command: "/start", description: "Запустить бота" },
    { command: "/about", description: "О боте" },
  ]);

  bot.start((ctx) => ctx.scene.enter("start"));
  bot.command("/start", (ctx) => ctx.scene.enter("start"));
  bot.command("/work", (ctx) => ctx.scene.enter("work"));
  bot.command("/shop", (ctx) => ctx.scene.enter("shop"));
  bot.command("/about", (ctx) => ctx.scene.enter("about"));
  const {
    mainKeyboardWork,
    mainKeyboardShop,
    mainKeyboardAbout,
  } = getMainKeyboard();

  bot.hears(mainKeyboardWork, (ctx) => ctx.scene.enter("work"));
  bot.hears(mainKeyboardShop, (ctx) => ctx.scene.enter("shop"));
  bot.hears(mainKeyboardAbout, (ctx) => ctx.scene.enter("about"));
  

  // bot.hears(/()/, (ctx) => ctx.scene.enter("start"));

  bot.on("poll", (ctx) => analizeQuizAction(ctx));
  bot.on("poll_answer", async (ctx) => await ctx.reply("Главное меню", getMainKeyboard(ctx)));


  bot.hears("Меню", (ctx) => ctx.scene.enter("about")); 
  bot.hears(/(.*?)/, async (ctx) => {
    logger.debug(ctx, "Default handler has fired");
    // const { mainKeyboard } = getMainKeyboard(ctx);
    await ctx.reply("Не понял");
  });

  bot.catch((error) => {
    logger.error(undefined, "Global error has happened, %O", error);
  });

  bot.startPolling();

  // Enable graceful stop
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
});
