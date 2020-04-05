const Telegraf = require('telegraf');

const bot = new Telegraf('1284061869:AAF9aV3zbgl729-sYN8hV2ZVYOhmFUU16OY');

const axios = require('axios');

let dataStore = [];

getData();

const helpMessage = `
    Selamat datang di bot Fakta, 
    Untuk perintahnya adalah: 
    /fact - untuk menampilkann fakta mengenai virus corona
    /update - untuk memperbarui data dari google spreadsheet
`;

bot.help((ctx) => {
    ctx.reply(helpMessage);
})

bot.command('fact', ctx => {
    let maxRow = dataStore.filter(item => {
        return(item.row == '1' && item.col == '2');
    })[0].val;
    // console.log(maxRow);
    let k = Math.floor(Math.random() * maxRow) + 1;
    let fact = dataStore.filter(item => {
        return (item.row == k && item.col == "5");
    })[0];
    // console.log(fact);

    let message = `
        Fact #${fact.row};
        ${fact.val}
    `;
    ctx.reply(message);
})

bot.command('update', async ctx => {
    try{
        await getData();
        ctx.reply('Data berhasil diperbarui');
    }catch(err){
        console.log(err);
        ctx.reply('Error ditemukan');
    }
})

async function getData(){
    try{
        let res = await axios('https://spreadsheets.google.com/feeds/cells/1uT7FOUia2dPRTJ5GdtDcBHAKjI9qztKwBLlItnVLJWI/1/public/full?alt=json');
        // console.log(res.data.feed.entry);
        let data = res.data.feed.entry;
        dataStore = [];
        data.forEach(item => {
            dataStore.push({
                row: item.gs$cell.row,
                col: item.gs$cell.col,
                val: item.gs$cell.inputValue,
            })
        })
        // console.log(dataStore);
    }catch(err){
        console.log(err);
        throw new Error;
    }
}

bot.launch();