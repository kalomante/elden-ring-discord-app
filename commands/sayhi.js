module.exports = {
    data: {
        name: "sayhi",
        description: "The bot says hi to the tarnished"
    },
    run: ({interaction})=>{
        interaction.reply('Greetings, tarnished. Welcome to The Lands Between. Shall you become Elden Lord?');
    }
}