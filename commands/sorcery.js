module.exports={
    data: {
        name: "sorcery",
        description: "sorceries from the lands between"
    },
    run: ({interaction}) => {
        interaction.reply(`Fetching data...`).then(()=>{return retrieveSorcery(interaction)});
    }
}

const retrieveSorcery = (interaction) => {
    fetch(`https://eldenring.fanapis.com/api/sorceries`).then((response)=>{return response.json()}).catch((err)=>{console.error("Info couldnt be jsonified", err)}).then((sorceries)=>{
        const sorceriesSize = sorceries.data.length;
        const randomPos = Math.floor(Math.random()*sorceriesSize);
        const sorcery = sorceries.data[randomPos];
        let sorceryReq = `**Requires:**\n`;
        sorcery.requires.forEach((req)=>{
            sorceryReq += `  __${req.name}:__ ${req.amount}\n`;
        });
        const info = `${sorcery.image}\n**Name:** ${sorcery.name}\n**Description:** ${sorcery.description}\n**Cost:** ${sorcery.cost}\n**Slots:** ${sorcery.slots}\n**Effects:** ${sorcery.effects}\n${sorceryReq}`;

        return interaction.editReply(info);
    }).catch((err)=>{
        console.error(`Info couldnt be processed`, err);
    });
}