const Telegraf = require('telegraf');

const bot = new Telegraf('849027493:AAHaOZRSru67PUJmXZt4S-A6WXfrEbYu7qQ');

const helpMessage = `
    Katakan sesuatu kepada saya
    /start - untuk memulai bot
    /help  - Referensi perintah
`;

bot.use((ctx, next) => {
    if(ctx.updateSubTypes[0] == "text"){
        // console.log(ctx.from.username + " Mengatakan: "+ctx.message.text);
        bot.telegram.sendMessage(-391783976, ctx.from.username + " Mengatakan: "+ctx.message.text);
    }else{
        // console.log(ctx.from.username + " Mengirim: "+ctx.updateSubTypes[0]);
        bot.telegram.sendMessage(-391783976, ctx.from.username + " Mengirim: "+ctx.updateSubTypes[0]);
    }
    next();
})

bot.start((ctx) => {
    ctx.reply('Hi saya echo717bot');
    ctx.reply(helpMessage);
});

bot.help((ctx) => {
    ctx.reply(helpMessage);
});

bot.command("echo", (ctx) => {
    let input = ctx.message.text;
    let inputArray = input.split(" ");
    let message = "";

    if(inputArray.length == 1){
        message = "anda mengatakan echo";
    }else{
        inputArray.shift();
        message = inputArray.join(" ");
    }
    ctx.reply(message);
});

bot.launch();