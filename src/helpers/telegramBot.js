const { Telegraf, session, Scenes } = require('telegraf');

const botToken = process.env.BOT_TOKEN;
const chatId = process.env.BOT_CHAT_ID;

const bot = new Telegraf(botToken);

/*
Scenes

A scene in Telegraf is essentially a context in which the bot can control the conversation flow. 
For example, if you are building a bot that needs to ask the user for multiple pieces of information 
(like a survey, form, or multi-step registration), you can use scenes to organize this process into individual steps.

Each scene can have multiple steps, and when the user completes one step, the bot automatically transitions to the next step. 
You can define how the bot should handle user input, what questions to ask, and how to move between steps or exit the scene.
*/
const applicationScene = require('../scenes/applicationScene');
 
/*
-Create Stage
Manages all scenes. It is essentially a collection of different scenes.
*/
const stage = new Scenes.Stage([applicationScene]);

// Launching a Telegram bot
bot.use(session());
bot.use(stage.middleware());

bot.start((ctx) => ctx.reply('welcome to hr notification bot.'));

// command used to access chat id information to send a message to the bot
bot.command('chatid', (ctx) => {
    ctx.reply(ctx.message.chat.id);
})

bot.command('applications', (ctx) => {
    ctx.scene.enter('applicationScene');
});

// helper function to send a message to the bot
async function sendMessageToBot(message, filePath = null) {
    try {
        if (filePath) {
            // Eğer dosya varsa dosyayı ve mesajı caption olarak gönder
            await bot.telegram.sendDocument(chatId, { 
                source: filePath 
            }, {
                caption: message, // Mesajı caption olarak ekle
                parse_mode: 'HTML'
            });
        } else {
            // Dosya yoksa sadece mesaj gönder
            await bot.telegram.sendMessage(chatId, message, { parse_mode: 'HTML' });
        }
    } catch (err) {
        console.log(err);
    }
}
module.exports = {bot, sendMessageToBot}