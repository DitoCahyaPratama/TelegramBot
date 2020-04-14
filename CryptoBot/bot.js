const Telegraf = require('telegraf');
const bot = new Telegraf('947213926:AAF0Di454buHHKcivfmWucBQKzUOhEXs5zA');
const axios = require('axios');

const apikey = "784d4e6ebb10eaebbe473fe35cb9b61b7953f67edc20a417e6e0527655646f46";

bot.command('start', ctx => {
    sendStartMessage(ctx);
});

bot.action('start', ctx => {
    ctx.deleteMessage();
    sendStartMessage(ctx);
})

function sendStartMessage(ctx){
    let startMessage = `Selamat datang, bot ini memberikan informasi mengenai mata uang crypto`;
    bot.telegram.sendMessage(ctx.chat.id, startMessage,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: "Harga crypto", callback_data: 'price'}
                    ],
                    [
                        {text: "Coin Market Cap", url: 'https://www.cryptocompare.com/'}
                    ],
                    [
                        {text: "Bot Info", callback_data: 'info'}
                    ]
                ]
            }
        })
}

bot.action('price', ctx => {
    let priceMessage = `Dapatkan informasi harga, pilih satu mata uang crypto dibawah ini`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, priceMessage,
        {
            reply_markup:{
                inline_keyboard: [
                    [
                        {text: "BTC", callback_data: 'price-BTC'},
                        {text: "ETH", callback_data: 'price-ETH'}
                    ],
                    [
                        {text: "BCH", callback_data: 'price-BCH'},
                        {text: "BSV", callback_data: 'price-BSV'}
                    ],
                    [
                        {text: "Kembali ke menu", callback_data: 'start'}
                    ]
                ]
            }
        })
})

let priceActionList = ['price-BTC', 'price-ETH','price-BCH','price-BSV'];
bot.action(priceActionList, async ctx => {
    // console.log(ctx.match);
    let symbol = ctx.match.split('-')[1];
    // console.log(symbol);
    try{
        let res = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=IDR&api_key=${apikey}`);
        // console.log(res.data.DISPLAY[symbol].IDR);
        let data = res.data.DISPLAY[symbol].IDR;

        let message = 
        `
            Symbol: ${symbol}
            Price: ${data.PRICE}
            Open: ${data.OPENDAY}
            High: ${data.HIGHDAY}
            Low: ${data.LOWDAY}
            Supply: ${data.SUPPLY}
            Market Cap: ${data.MKTCAP}
        `;
        ctx.deleteMessage();
        bot.telegram.sendMessage(ctx.chat.id, message, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: "Kembali ke Harga", callback_data: 'price'}
                    ]
                ]
            }
        })
    }catch(err){
        console.log(err);
        ctx.reply("Error Ditemukan!");
    }
})

bot.action('info', ctx =>{
    ctx.answerCbQuery();
    bot.telegram.sendMessage(ctx.chat.id, "Bot Info", {
        reply_markup: {
            keyboard: [
                [
                    {text: "Credits"},
                    {text: "API"}
                ],
                [
                    {text: "Hilangkan keyboard"}
                ]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
})

bot.hears('Credits', ctx => {
    ctx.reply('Bot ini dibuat oleh Doyatama Code');
});

bot.hears('API', ctx => {
    ctx.reply('Bot ini menggunakan cryptocompare API');
});

bot.hears('Hilangkan keyboard', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Keyboard dihilangkan", 
    {
        reply_markup: {
            remove_keyboard: true
        }
    })
})

bot.launch();