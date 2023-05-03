require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const { Configuration, OpenAIApi } = require('openai');

// Get the API keys from the .env file
const config = {
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};

const bot = new Telegraf(config.TELEGRAM_TOKEN);

const configuration = new Configuration({
  apiKey: config.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

bot.start((ctx) => {
    ctx.reply("Welcome! I'm a GPT-4 Assistant Bot use @YourBotName followed by your question for a response otherwise use /help for more commands.");
  });

// Add commands to the bot
bot.help((ctx) => {
    ctx.reply("Available commands:\n\n" +
    "/start - Welcome Message & Bot Info 👋\n" +
    "/socials - Social Media Links 📱\n" +
    "/resources - List of resources to get started 🧑‍💻\n" +
    "/help - Displays Command List ⚙️");
});

//Command to store safe social links or linktree
bot.command('socials', (ctx) => {
    ctx.reply("Follow the official Crypto Mindset social media accounts & avoid scams:\n\n" +
    "Your_Linktree_Name Linktree: https://linktr.ee/<YourUsername> \n" +
    "Your_Instagram_Name Instagram: https://instagram.com/<YourUsername>\n" +
    "Your_Twitter_Name Twitter: https://twitter.com/<YourHandle>\n" +
    "Your_Youtube_Name YouTube: https://www.youtube.com/channel/<YourChannel> \n" +
    "Your_Website_Name Website: https://TestWebsite.com/ \n");
});

//Command to store resources for getting started
bot.command('resources', (ctx) => {
    ctx.reply(
        "Here are some links for getting started in crypto:\n\n" +
        "1. Crypto Lingo: https://coinmarketcap.com/alexandria/glossary \n\n" +
        "2. Coinbase: https://www.coinbase.com/ \n\n" +
        "3. Gemini: https://www.gemini.com/ \n\n" +
        "4. Kraken: https://www.kraken.com/ \n\n" +
        "5. Crypto.Com: https://crypto.com/ \n\n"
    );
});

// Command to respond to @YourBotName
bot.on('text', async (ctx) => {
    if (ctx.chat.type === 'private') {
        const question = ctx.message.text;
        const message = await ctx.reply('Thinking please wait...', { reply_to_message_id: ctx.message.message_id });
        const response = await generateAnswer(question);
        ctx.telegram.editMessageText(ctx.chat.id, message.message_id, null, response);
    } else if (ctx.message.entities) {
        const mentionedBot = ctx.message.entities.some((entity) => {
            return (
                entity.type === 'mention' &&
                ctx.message.text.substring(entity.offset, entity.offset + entity.length) ===
                    '@YourBotName'
            );
        });

        if (mentionedBot) {
            const question = ctx.message.text.replace('@YourBotName', '').trim();
            const message = await ctx.reply('Thinking please wait...', { reply_to_message_id: ctx.message.message_id });
            const response = await generateAnswer(question);
            ctx.telegram.editMessageText(ctx.chat.id, message.message_id, null, response);
        }
    }
});

// Command to generate a response from OpenAI (Change the content to your use case)
async function generateAnswer(question) {
    try {
        const completion = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: "You are the Assistant Bot, specialized in helping new people learn about programming and web development."},
                { role: 'user', content: "I'm new and need help to get started. What are key key concepts to learn and resources for me to read and grow from?" },
                { role: 'assistant', content: "To get started, you can focus on learning the basics of programming, web development, and version control systems. Some popular resources for beginners include freeCodeCamp, MDN Web Docs, W3Schools, and the GitHub Guides. You can also find many tutorials on YouTube to help you learn at your own pace." },
                { role: 'user', content: question }
            ],
            max_tokens: 500, // Max tokens to generate comes out to max $0.06 per request if using GPT-4
            temperature: 0.7,
        });
      
        const answer = completion.data.choices[0].message.content;

        // Get the token usage for the completion
        // const tokenUsage = completion.data.usage;
        // console.log(`Token usage: ${tokenUsage}`);

        return answer;
    } catch (error) {
        console.error('Error generating answer:', error);
        return 'Sorry, an error occurred while processing your request.';
    }
}

// Start the bot
bot.launch();
