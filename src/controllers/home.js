const { sendMessageToBot } = require("../helpers/telegramBot");
const upload = require('../helpers/uploadFile');

const Applications = require('../models/applications'); 

exports.getApplicationForm = async function (req, res, next) {
  const alertMessage = req.session.alert;
  try {
    return res.render("index", {
      title: "Job Application",
      alert: alertMessage
    });
    
  } catch (err) { 
    next(err);
  }
};

exports.postApplicationForm = async function (req, res, next) {
  try {
    const {firstname, lastname, email, phone, role, cover_latter} = req.body;
    const resumeFile = req.file;

    if (Object.values(req.body).some(field => !field || field.trim() === '')) {
      req.session.alert = {
        text: "Please fill all fields.",
        class: "danger",     
      };

      res.redirect("/");
    }
    else{
      const { pathName, url } = await upload.uploadFile(resumeFile, 'resumes/' + email + '/');
      const resume_url = req.headers.host + url;

      const newApplication = new Applications({ 
        firstname,
        lastname,
        email,
        phone,
        role,
        cover_latter,
        resume_url
      });

      const savedApplication = await newApplication.save();

      if(savedApplication){
      
        const totalDocuments = await Applications.countDocuments();

        let date = new Date();
        let day = date.getUTCDate();
        let month = date.getUTCMonth() + 1;
        let year = date.getUTCFullYear();

        const message = `
<b>🔔‌ Job application #${totalDocuments} 🔔</b>

<b>1- Fullname:</b> ${firstname} ${lastname}
<b>2- Email:</b> ${email}
<b>3- Phone:</b> ${phone}
<b>4- Role:</b> ${role}
<b>8- Cover letter:</b> 
${cover_latter}

------
<b>Başvuru Tarihi:</b> ${day}/${month}/${year}
`;

        await sendMessageToBot(message, pathName);

        req.session.alert = {
          text: "Your job application has been submitted",
          class: "success",     
        };
        res.redirect('/');

      }
      else{
        req.session.user_message = {
          text: "An error occurred",
          class: "danger",     
        };

        res.redirect("/");
      }
  }
  } catch (err) { 
    next(err);
  }
};
