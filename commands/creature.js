const { default: axios, Axios}= require('axios');

module.exports={
    data: {
        name: "creature",
        description: "gives information about a random creature",
    },
    run: async ({interaction})=>{
        await interaction.reply('Fetching data...');
        retrieveCreature(interaction);
    }
}

const retrieveCreature = async (interaction)=>{
    try{
        const creatures = (await axios.get('https://eldenring.fanapis.com/api/creatures')).data;
        let arrLength = creatures.data.length;
        let randomPos = Math.floor(Math.random()*arrLength);
        let creature = creatures.data[randomPos];

        let drops = `**Drops:**\n`;

        creature.drops.forEach((drop)=>{
            drops += `  ${drop}\n`;
        })
        
        const message = `${creature.image}\n**Name:** ${creature.name}\n**Description:** ${creature.description}\n${drops}`;

        await interaction.editReply(message);
    }catch(error){
        console.error((error)=>{console.error('There was an error retrieving data: ', error)})
    }
}