const Telegraf = require('telegraf')

const bot = new Telegraf('1137095182:AAH__dwOA-iMzKBMSYN8_yGjsazCKJNnztM')

bot.command("start", (ctx) => {
   ctx.reply("Haloo");
   ctx.telegram.sendMessage(ctx.chat.id, "Apa kabar", 
    {
        parse_mode: 'Markdown',
        disable_notification: true
    }
   ) 
   console.log(ctx.chat.id);
})

bot.launch()