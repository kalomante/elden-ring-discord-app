const { default: axios, Axios}= require('axios');

module.exports={
    data: {
        name: "incantation",
        description: "gives information about a random incantation",
    },
    run: async ({interaction})=>{
        await interaction.reply('Fetching data...');
        retrieveClass(interaction);
    }
}

const retrieveClass = async (interaction)=>{
    try{
        const incantations = (await axios.get('https://eldenring.fanapis.com/api/incantations')).data;
        let arrLength = incantations.data.length;
        let randomPos = Math.floor(Math.random()*arrLength);
        let incantation = incantations.data[randomPos];
        

        let incantationRA = `**Required Attributes:**\n`
        incantation.requires.forEach((req)=>{
            incantationRA+= `  __${req.name}:__ ${req.amount}\n`;
        });


        const message = `${incantation.image}\n**Name:** ${incantation.name}\n**Description:** ${incantation.description}\n**Type:** ${incantation.type}\n**Cost:** ${incantation.cost}\n**Slots:** ${incantation.slots}\n**Effects:** ${incantation.effects}\n${incantationRA}`;

        await interaction.editReply(message);
    }catch(error){
        console.error((error)=>{console.error('There was an error retrieving data: ', error)})
    }
}