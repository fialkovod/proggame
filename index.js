const dotenv = require("dotenv")
const envFile = process.env.NODE_ENV === 'dev'? 'dev.env':'prod.env'
dotenv.config({ path: envFile })
console.log("envFile", envFile)
const {quizes} = require("./quiz/js/index.js")
const TelegramAPI = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options.js')
const bot = new TelegramAPI(process.env.TOKEN,{polling: true})


const start = () => {
    const chats = {};
    const quizRun = {};

    bot.setMyCommands([
        {command: "/start", description: "Запуск бота"},
        {command: "/info", description: "Информация о боте"},
        {command: "/game", description: "Играть"},
        {command: "/quiz", description: "Лотерея"},
    ])


    const startQuiz = async chatId => {
        console.log("quizes", quizes);
        let q = Math.floor(Math.random()*quizes.length) + 1;
        let curQuiz= quizes.find(qw=>qw.id==q);
        quizRun[chatId] = curQuiz;
        
        console.log("curQuiz", curQuiz);
        return bot.sendPoll(chatId, question=curQuiz.question, pollOptions=curQuiz.options, {id: 123, type: "quiz", correct_option_id:curQuiz.correct_option_id, open_period:5, is_anonymous: false});
    }


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
        
        if (text=== '/quiz') {
            let ret = await startQuiz(chatId)
            console.log("ret:", ret)
            return
        }

        console.log(msg);
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
        console.log(msg)
    })

    bot.on('poll_answer', (msg)=>console.log("poll_answer: ", msg))
    bot.on('poll', (msg)=>console.log("poll: ", msg))

    bot.on("polling_error", (msg) => console.log(msg));
}

start();