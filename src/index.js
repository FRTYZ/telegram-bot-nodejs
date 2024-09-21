const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config();

// Template Engine settings
const path = require("path");

app.set("view engine","ejs");
app.set('views','./src/views');
app.use("/static", express.static(path.join(__dirname, "../public")));

// Helpers
const {bot} = require('./helpers/telegramBot');  
const connectDB = require('./helpers/database');

// Routes
const homeRoutes = require('./routes/home');

app.use(homeRoutes);

const startup = async () => {

    app.listen(PORT, () => {
        bot.launch();
        connectDB();
        
        console.log('started at ' + PORT)
    });
}
startup();
