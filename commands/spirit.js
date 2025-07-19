module.exports = {
    data: {
        name: "spirit",
        description: "gives info about a random spirit."
    },
    run: ({interaction}) => {
       interaction.reply('Fetching data...').then(()=> retrieveSpirit(interaction)); 
    }
}

const retrieveSpirit = (interaction) =>{
    fetch(`https://eldenring.fanapis.com/api/spirits`)
        .then((response)=>{return response.json();})
        .catch((err)=>{console.error(`Error jsonifying response: `, err)})
        .then((spiritsArr) => {
            const spiritsLength = spiritsArr.data.length;
            const randomNum = Math.floor(Math.random() * spiritsLength);
            const spirit = spiritsArr.data[randomNum];
            const message = `${spirit.image}\n**Name:** ${spirit.name}\n**Description:** ${spirit.description}\n**FP Cost:** ${spirit.fpCost}\n**HP Cost:** ${spirit.hpCost}\n**Effect:** ${spirit.effect}`;
            return interaction.editReply(message);
        }).catch((err)=>{console.error(`Error processing data: `, err)});
}