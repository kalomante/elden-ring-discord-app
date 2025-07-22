const { default: axios, Axios}= require('axios');

module.exports={
    data: {
        name: "class",
        description: "gives information about a random class",
    },
    run: async ({interaction})=>{
        await interaction.reply('Fetching data...');
        retrieveClass(interaction);
    }
}

const retrieveClass = async (interaction)=>{
    try{
        const classes = (await axios.get('https://eldenring.fanapis.com/api/classes')).data;
        let arrLength = classes.data.length;
        let randomPos = Math.floor(Math.random()*arrLength);
        let classEr = classes.data[randomPos];

        let stats = `**Stats:**\n  __Level:__ ${classEr.stats.level}\n  __Vigor:__ ${classEr.stats.vigor}\n  __Mind:__ ${classEr.stats.mind}\n  __Endurance:__ ${classEr.stats.endurance}\n  __Strength:__ ${classEr.stats.strength}\n  __Dexterity:__ ${classEr.stats.dexterity}\n  __Intelligence:__ ${classEr.stats.intelligence}\n  __Faith:__ ${classEr.stats.faith}\n  __Arcane:__ ${classEr.stats.arcane}`;
        
        const message = `${classEr.image}\n**Name:** ${classEr.name}\n**Description:** ${classEr.description}\n${stats}`;

        await interaction.editReply(message);
    }catch(error){
        console.error((error)=>{console.error('There was an error retrieving data: ', error)})
    }
}