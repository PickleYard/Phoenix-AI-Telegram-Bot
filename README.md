# Phoenix-AI GPT-4 Telegram Assistant Bot

A Telegram bot powered by GPT-4 that helps users get answers to their questions.

## Requirements

- Node.js
- NPM
- OpenAI
- Telegraf
- .env file

## Setup

1. Clone the repository:
    - git clone https://github.com/PickleYard/Phoenix-AI.git

2. Install the dependencies:
    - npm install

3. Create a .env file in the project root directory and add your API keys:
    - TELEGRAM_TOKEN=your_telegram_token
    - OPENAI_API_KEY=your_openai_api_key 
### You can use 'gpt-3.5-turbo' for faster results however GPT-4 gives better quality answers more consistently.*

4. Replace <@YourBotName> in the bot.js file with your bot's username.

5. Run the bot:
    - node bot.js

## Usage

    Start a private chat with the bot.
    Use /help to see available commands.
    Type a question or mention the bot with @YourBotName followed by your question in a group chat.

## Commands

/start - Welcome Message & Bot Info 👋

/socials - Social Media Links 📱

/resources - List of resources to get started 🧑‍💻

/help - Displays Command List ⚙️

## License 

This project is licensed under the MIT License.