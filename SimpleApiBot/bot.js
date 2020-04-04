const Telegraf = require('telegraf');

const bot = new Telegraf('1156156074:AAHetmxFVHdQWlsnU5CYyvABNgscpQLupBQ');

const axios = require('axios');
const fs = require('fs');

const helpMessage = `
    *Simple API Bot*
    /fortune - mendapatkan fortune cookie
    /cat - mendapatkan foto kucing secara acak
    /cat \`<text>\` - mendapatkan foto kucing dengan teks
    /dogbreeds - mendapatkan list dari jenis anjing
    /dogs \`<breed>\` - mendapatkan gambar dari jenis anjing
`;

bot.help(ctx => {
    // ctx.reply(helpMessage);
    bot.telegram.sendMessage(ctx.from.id, helpMessage, {
        parse_mode: "markdown"
    })
});

bot.command('fortune', (ctx) => {
    axios.get('http://yerkee.com/api/fortune')
    .then(res => {
        // console.log(res.data.fortune);
        ctx.reply(res.data.fortune);
    }).catch(e => {
        console.log(e);
    })
})

bot.command('cat', async (ctx) => {
    let input = ctx.message.text;
    let inputArray = input.split(" ");
    if(inputArray.length == 1){
        // let res = await axios.get('https://aws.random.cat/meow');
        // console.log(res.data.file);

        // ctx.replyWithPhoto(res.data.file);

        try{
            let res = await axios.get('https://aws.random.cat/meow');
            ctx.replyWithPhoto(res.data.file);
        }catch(e){
            console.log(e);
        }
    }else{
        inputArray.shift();
        input = inputArray.join(" ");
        ctx.replyWithPhoto(`https://cataas.com/cat/says/${input}`);
    }
})

bot.command('dogbreeds', (ctx) => {
    let rawdata = fs.readFileSync("./dogbreed.json", "utf8");
    let data = JSON.parse(rawdata);
    // console.log(data);
    let message = "Jenis Anjing: \n";
    data.forEach(item => {
        message += `- ${item}\n`
    });
    ctx.reply(message);
})

bot.command('dog', (ctx) => {
    let input = ctx.message.text.split(" ");
    if(input.length != 2){
        ctx.reply("Anda harus memberi jenis anjing pada argumen yang ke 2");
        return;
    }
    let breedInput = input[1];
    let rawData = fs.readFileSync("./dogbreed.json", "utf8");
    let data = JSON.parse(rawData);
    
    if(data.includes(breedInput)){
        axios.get(`https://dog.ceo/api/breed/${breedInput}/images/random`)
        .then(res => {
            // console.log(res.data);
            ctx.replyWithPhoto(res.data.message);
        }).catch(e =>{
            console.log(e);
        })
    }else{
        let suggestions = data.filter(item => {
            return item.startsWith(breedInput);
        })
        let message = `Apakah yang anda maksud adalah: \n`;
        suggestions.forEach(item => {
            message += `- ${item}\n`;
        })
        if(suggestions.length == 0){
            ctx.reply("Tidak dapat menemukan jenis");
        }else{
            ctx.reply(message);
        }
    }
})

bot.launch();