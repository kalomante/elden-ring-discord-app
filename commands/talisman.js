const { default: axios, Axios}= require('axios');

module.exports={
    data: {
        name: "talisman",
        description: "gives information about a random talisman",
    },
    run: async ({interaction})=>{
        await interaction.reply('Fetching data...');
        retrieveClass(interaction);
    }
}

const retrieveClass = async (interaction)=>{
    try{
        const talismans = (await axios.get('https://eldenring.fanapis.com/api/talismans')).data;
        let arrLength = talismans.data.length;
        let randomPos = Math.floor(Math.random()*arrLength);
        let talisman = talismans.data[randomPos];


        const message = `${talisman.image}\n**Name:** ${talisman.name}\n**Description:** ${talisman.description}\n**Effect:** ${talisman.effect}`;

        await interaction.editReply(message);
    }catch(error){
        console.error((error)=>{console.error('There was an error retrieving data: ', error)})
    }
}