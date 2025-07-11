require('dotenv/config');

const {Client, IntentsBitField} = require('discord.js');

const {CommandHandler} = require('djs-commander');

const path = require('path');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

new CommandHandler({
    client,
    commandsPath: path.join(__dirname, 'commands'),
    eventsPath: path.join(__dirname, 'events')
})

client.once('ready', ()=>{
    console.log(`Logged in as: ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);