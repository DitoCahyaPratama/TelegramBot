const Telegraf = require('telegraf');

const bot = new Telegraf('1158489494:AAGh5nswEAf9utBx_FJwzEqzKxj_sowJnyY');

bot.command(['start', 'help'], ctx => {
    let message = `
        Referensi Help : 
        /surabaya - mendapatkan gambar untuk Surabaya
        /jakarta - mendapatkan gif dari Jakarta 
        /malang - mendapatkan lokasi dari Malang
        /cities - mendapatkan foto dari kota
        /citieslist - mendapatkan text file kota
    `;
    ctx.reply(message);
});

bot.command('test', ctx => {
    //url 
    // bot.telegram.sendPhoto(ctx.chat.id, "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F2.bp.blogspot.com%2F-z6vWdKAfKNs%2FWDrblZ61-bI%2FAAAAAAAAAJ4%2FsiDEfzrHRMsyVWGGNHot-hMjEpnF61x7ACLcB%2Fs1600%2FBS.jpg&f=1&nofb=1");
    //file path
    // bot.telegram.sendPhoto(ctx.chat.id, {source: "res/malang.jpg"});
    //file id
    // bot.telegram.sendPhoto(ctx.chat.id, 'AgACAgUAAxkBAAMNXoOucJAYrTUogussae35ZPSVShQAAqepMRv79yBU_JvvtQHP0US_pCUzAAQBAAMCAAN4AAMgRwUAARgE');
});

// bot.on('message', ctx => {
//     console.log(ctx.message.message_id);
// })

bot.command('surabaya', ctx => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo")
    bot.telegram.sendPhoto(ctx.chat.id, 
        {
            source : 'res/surabaya.jpg'
        },
        {
            reply_to_message_id : ctx.message.message_id
        }
    );
})

bot.command('jakarta', ctx => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_video")
    bot.telegram.sendAnimation(ctx.chat.id, "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FxT1R9RePMmgT2VQvkY%2Fgiphy.gif&f=1&nofb=1", 
    {
        reply_to_message_id : ctx.message.message_id
    })
})

bot.command('cities', ctx => {
    let cities = ['res/bandung.jpg', 'res/batu.jpg', 'res/jakarta.jpg', 'res/malang.jpg', 'res/surabaya.jpg']
    let result = cities.map(city => {
        return {
            type: 'photo',
            media: {
                source: city
            }
        }
    })
    // bot.telegram.sendMediaGroup(ctx.chat.id, [
    //     {
    //         type: 'photo', media: {source: 'res/bandung.jpg'}
    //     },
    //     {
    //         type: 'photo', media: {source: 'res/batu.jpg'}
    //     }
    // ])
    bot.telegram.sendMediaGroup(ctx.chat.id, result)
})

bot.command('citieslist', ctx => {
    bot.telegram.sendDocument(ctx.chat.id,
        {
            source: 'res/citieslist.txt'
        },
        {
            thumb: {
                source: "res/bandung.jpg"
            }
        }
    )
})

bot.command('malang', ctx => {
    bot.telegram.sendLocation(ctx.chat.id, -7.946338, 112.620450)
})

bot.on('message', async ctx => {
    if(ctx.updateSubTypes[0] == 'document'){
        // console.log(ctx.message.document.file_id)
        try{
            let link = await bot.telegram.getFileLink(ctx.message.document.file_id)
            ctx.reply('Link download anda: '+link)
        }catch(err){
            console.log(err)
            ctx.reply(err.description)
        }
    }else if(ctx.updateSubTypes[0] == 'photo'){
        // console.log(ctx.message.photo[0].file_id)
        try{
            let link = await bot.telegram.getFileLink(ctx.message.photo[0].file_id)
            ctx.reply('Link download anda: '+link)
        }catch(err){
            console.log(err)
            ctx.reply(err.description)
        }
    }
})

bot.launch();