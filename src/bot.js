import { Telegraf, Markup,  Scenes, session } from 'telegraf';
//import Stage from 'telegraf/stage';
//import session from 'telegraf/session';
import mongoose from 'mongoose';
import logger from './util/logger.js';
import { getUserInfo } from './middlewares/user-info.js';
import startScene from './scenes/start/index.js';
import dotenv from "dotenv"
//import { session } from 'telegraf';
//const dotenv = require("dotenv")
const envFile = process.env.NODE_ENV === 'dev'? 'dev.env':'prod.env'
dotenv.config({ path: envFile })

//const telegram = new Telegram(process.env.TELEGRAM_TOKEN, {});

mongoose.connect(`mongodb://localhost:27017/${process.env.DATABASE_HOST}`, {
  //useNewUrlParser: true,
  //useFindAndModify: false
});
mongoose.connection.on('error', err => {
  logger.error(
    undefined,
    `Error occurred during an attempt to establish connection with the database: %O`,
    err
  );
  process.exit(1);
});

mongoose.connection.on('open', () => {
    const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
    const stage = new Scenes.Stage([
        startScene,
        /*searchScene,
        moviesScene,
        settingsScene,
        contactScene,
        adminScene*/
    ]);

    bot.use(session());
    bot.use(getUserInfo);

    bot.use(stage.middleware()); 
    bot.command('/start',(ctx) => ctx.scene.enter('start'));

    bot.catch((error) => {
        logger.error(undefined, 'Global error has happened, %O', error);
    });

    bot.startPolling();
})
