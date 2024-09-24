# How To Create a Telegram Bot with Node.js

![alt text](https://raw.githubusercontent.com/FRTYZ/telegram-bot-nodejs/main/preview-image.png)


## Hello Everyone,

I will explain how to create a simple telegram bot using Node.js. While creating the Telegram bot, I made the resume pool project that human resources can use

## Preview (Youtube) 🎬

[![How To Create a Telegram Bot with Node.js](https://img.youtube.com/vi/6lunP5kC2Qk/maxresdefault.jpg)](https://raw.githubusercontent.com/FRTYZ/telegram-bot-nodejs/main/public/preview-video.mp4)

## Features ✨
- Receiving job applications from telegram bot
- Receiving applications and transferring them to excel

## Tech 🛠

- [Node.js (v20.10.0 or LTS version) ](https://nodejs.org/en)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Telegram API](https://core.telegram.org/bots/api)


## Development 💻

Here are the steps to run the project locally.

1. Clone the repository

    ```
    git clone https://github.com/FRTYZ/telegram-bot-nodejs.git
    ```

2. Install dependencies

    ```
    npm install
    ```

3. Create Telegram bot

    3.1. Open [BotFather](https://t.me/BotFather) to create a bot

    3.2. Write the command to create a bot

    ```
    /newbot
    ```

    3.3. after you set the name and username, the process will look like the following. in the yellow area there will be a shortcut to open your bot. in the red area there is a token, use this token in the env file

    ![alt text](https://raw.githubusercontent.com/FRTYZ/telegram-bot-nodejs/main/public/images/create-bot.png)

4. Make a few connection settings to MongoDB

    4.1. Create a cluster from [MongoDB](https://cloud.mongodb.com/) Create a new cluster named 'telegramBot'

    ![alt text](https://raw.githubusercontent.com/FRTYZ/telegram-bot-nodejs/main/public/images/create-cluster.png)

    4.2. Connect Cluster. 

    Copy the link code in the red field

    ![alt text](https://raw.githubusercontent.com/FRTYZ/telegram-bot-nodejs/main/public/images/connect-cluster.png)

5. Create the .env file

    ```
    BOT_TOKEN = <Bot Token>
    BOT_CHAT_ID = <Bot Chat ID>
    MONGO_URI = <Bot_Chat_ID>
    ```  

6. Run the project

    ```
    npm run dev
    ```

7. Project setup is ready. To get bot chat id, open your bot and type the following command. The bot will tell you the chat id.

    ```
    /chatid
    ```

    ![alt text](https://raw.githubusercontent.com/FRTYZ/telegram-bot-nodejs/main/public/images/get-chat-id.png)

    7.1. Copy the chat id and update the `BOT_CHAT_ID` value in the `.env` file

8. 🎉 Project is now ready. The project will run on port `8080`

### package.json
```
{
  "name": "telegram-bot-nodejs",
  "version": "1.0.0",
  "description": "Create a Telegram Bot with Node.js",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "npx nodemon src/index.js",
    "start": "node src/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "dotenv": "^16.4.5",
    "ejs": "^3.1.10",
    "exceljs": "^4.4.0",
    "express": "^4.21.0",
    "express-session": "^1.18.0",
    "mongoose": "^8.6.3",
    "multer": "^1.4.5-lts.1",
    "telegraf": "^4.16.3"
  },
  "devDependencies": {
    "nodemon": "^3.1.6"
  }
}
```

### Good codings
