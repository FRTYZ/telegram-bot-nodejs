const { Scenes, Markup } = require('telegraf');

// Excel
const ExcelJS = require('exceljs');

// Models
const Applications = require('../models/applications'); 

// Create scene
const applicationScene = new Scenes.BaseScene('applicationScene');

applicationScene.enter(async (ctx) => {
    try {
      const alertMessage = 'What action do you want to take?'
      await ctx.reply(alertMessage, Markup.inlineKeyboard([
        [Markup.button.callback('➡️ All Application', 'ALL_APPLICATOIN')],
        [Markup.button.callback('❌ Cancel', 'CANCEL_PROCCESS')]
      ]));
      
    }
    catch (err){
        ctx.reply('A problem occurred');
        ctx.reply(err);
    }
});
  
applicationScene.action('CANCEL_PROCCESS', (ctx) => {
    ctx.scene.leave();
    ctx.reply('Process canceled');
});

applicationScene.action('ALL_APPLICATOIN', async(ctx) => {
 
  try {
        // Get values from database
        const values = await Applications.find({});

        if(values.length > 0){
            ctx.reply('Processing Data...');

            // Creating an Excel file
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Applications');

            // Adding titles
            worksheet.columns = [
                { header: 'ID', key: '_id' },
                { header: 'First Name', key: 'firstname' },
                { header: 'Last Name', key: 'lastname' },
                { header: 'E-mail', key: 'email' },
                { header: 'Phone', key: 'phone' },
                { header: 'Role', key: 'role' },
                { header: 'Cover Latter', key: 'cover_latter' },
                { header: 'Resume', key: 'resume_url' }
            ];

            values.forEach((application) => {
                worksheet.addRow(application);
            });

            const filePath = './public/all_applications.xlsx';
            await workbook.xlsx.writeFile(filePath);

            // Send Excel file via Telegram
            await ctx.replyWithDocument({ source: filePath, filename: 'all_applications.xlsx' });
            ctx.scene.leave();

        }else{
            ctx.reply('No applications available yet.');
            ctx.scene.reenter();
            ctx.answerCbQuery();
        }

    }catch(error){
        console.log(error)
        ctx.reply('Database error occurred.');
        ctx.scene.reenter();
    }
}); 

module.exports = applicationScene;