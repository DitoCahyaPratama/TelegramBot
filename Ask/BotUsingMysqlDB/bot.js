const Telegraf = require('telegraf');

const bot = new Telegraf('1113031385:AAFdhisMIGFmY-q7VQTQwJPjSEQg0d9lGCU');

const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bot"
})

conn.connect(function(err){
    if(err){
        throw err;
    }

    console.log("connected !");
    conn.query("SELECT * FROM fruit", function (err, result, fields){
        if(err){
            throw err;
        }
        dataStore = [];
        // console.log(result);
        result.forEach(item => {
            // console.log(item.name);
            dataStore.push({
                id: item.id,
                name: item.name,
                price: item.price
            })
        })
     })
})

const helpMessage = `
    Untuk menggunakan bot ini ada beberapa perintah:
    /fruitlist - untuk melihat list buah
    /fruit <nama_buah> - untuk melihat harga buah berdasarkan nama buah
`;

bot.help(ctx => {
    ctx.reply(helpMessage);
});

bot.command('fruitlist', ctx => {
    let fruitMessage = `List Buah : \n`;

    dataStore.forEach(item => {
        fruitMessage += `${item.id}. ${item.name}\n`;
    })

    ctx.reply(fruitMessage);
})

bot.command('fruit', ctx => {
    let input = ctx.message.text.split(" ");
    if(input.length != 2){
        ctx.reply("Anda harus memberi nama buah pada argumen ke 2");
        return;
    }
    // console.log(input[1]);
    let fruitInput = input[1];
    dataStore.forEach(item => {
        if(item.name.includes(fruitInput)){
            let price = item.price.toLocaleString(
                undefined, {minimumFractionDigits: 2}
            )
            ctx.reply("Rp "+price);
            return;
        }
    })
})

bot.launch();