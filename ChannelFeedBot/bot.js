// const Telegraf = require('telegraf');

// const bot = new Telegraf('1107301735:AAGnS8jpyCIQLrlJRS95XOmc0B8WdwH7tJw');

// bot.use(ctx => {
//     console.log(ctx.chat);
// })

// bot.launch();

const fetch = require('node-fetch');

let token = "1107301735:AAGnS8jpyCIQLrlJRS95XOmc0B8WdwH7tJw";
let data = {
  chat_id: "-1001392248099",
  text: "test"
};

(async() => {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`,
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
})();