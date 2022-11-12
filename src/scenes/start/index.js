//import Stage from 'telegraf/stage';
//import Scene from 'telegraf/scenes/base';
import { Scenes, session } from 'telegraf';
//import { languageChangeAction } from './actions';
//import { getLanguageKeyboard } from './helpers';
import logger from '../../util/logger.js';
import User from '../../models/User.js';
//import { getMainKeyboard } from '../../util/keyboards';

const { leave } = Scenes.Stage;
const start = new Scenes.BaseScene('start');

start.enter(async (ctx) => {
    const uid = String(ctx.from.id);
    const user = await User.findById(uid);
    //const { mainKeyboard } = getMainKeyboard(ctx);
  
    if (user) {
      await ctx.reply("user already registered");
    } else {
      logger.debug(ctx, 'New user has been created');
      const now = new Date().getTime();
  
      const newUser = new User({
        _id: uid,
        created: now,
        username: ctx.from.username,
        name: (ctx.from.first_name + ' ' + (ctx.from.last_name ?? "")).trim(),
        lastActivity: now,
      });
  
      await newUser.save();
      logger.debug(ctx, newUser);
      //await ctx.reply('Choose language / Выбери язык', getLanguageKeyboard());
    }
  });
  
  start.leave(async (ctx) => {
    //const { mainKeyboard } = getMainKeyboard(ctx);
  
    await ctx.reply('дальше');
  });
  
  start.command('saveme', leave());
  //start.action(/languageChange/, languageChangeAction);
  /*start.action(/confirmAccount/, async (ctx: ContextMessageUpdate) => {
    await ctx.answerCbQuery();
    ctx.scene.leave();
  });*/
  
  export default start;