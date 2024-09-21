const { sendMessageToBot } = require("../helpers/telegramBot");

exports.getApplicationForm = async function (req, res, next) {

  try {
    return res.render("index", {
      title: "Job Application",
    });
    
  } catch (err) { 
    next(err);
  }
};
