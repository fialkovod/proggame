const dotenv = require("dotenv")
const envFile = process.env.NODE_ENV === 'dev'? 'dev.env':'prod.env'
dotenv.config({ path: envFile })
console.log(envFile)
const TelegramAPI = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options.js')
const bot = new TelegramAPI(process.env.TOKEN,{polling: true})


const start = () => {
    const chats = {};

    bot.setMyCommands([
        {command: "/start", description: "Запуск бота"},
        {command: "/info", description: "Информация о боте"},
        {command: "/game", description: "Играть"},
    ])



    const startGame = async chatId => {
        await bot.sendMessage(chatId, `Угадай число от 0 до 9`);
        const randomNumber = Math.floor(Math.random()*10);
        chats[chatId] = randomNumber;
        return bot.sendMessage(chatId, 'Отгадывай', gameOptions);
    }

    bot.on("message", async msg => {
        const text = msg.text;
        const chatId = msg.chat.id; 
    
        if (text === '/start') {
           return bot.sendMessage(chatId, `Привет в наш бот`);
        }
        if (text === '/info') {
           return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
           return bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/ffb/53d/ffb53d6e-399a-48f2-b798-586605cbb536/192/4.webp');
        }

        if (text=== '/game') {
            return startGame(chatId)
        }

       // console.log(msg);
        return bot.sendMessage(chatId, `Я тебя не понял`);
    })
    
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId)
        }
        if (data == chats[chatId]) {
            return bot.sendMessage(chatId, `Ты угадал`, againOptions);
        } else {
            return bot.sendMessage(chatId, `Ты проиграл, я загадал ${chats[chatId]}`, againOptions);
        }
        //bot.sendMessage(chatId, `Ты выбрал цифру ${data}`);
        //console.log(msg)
    })


    bot.on("polling_error", (msg) => console.log(msg));
}

start();