module.exports = {
    data: {
        name: "armor",
        description: "gives info about a random armor"
    },
    run: ({interaction}) => {
        interaction.reply(`Fetching data...`)
            .then(()=> retrieveArmor(interaction))
            .catch((err)=> {console.error(`An error ocurred: `, err)});
    }
    }

const retrieveArmor = (interaction) => {
     fetch(`https://eldenring.fanapis.com/api/armors`)
    .then((response)=>{return response.json()})
        .catch((err)=>{console.error(`Response couldnt be jsonified: `, err)})
    .then((armorsArray)=>{
        const armorsArrayLength = armorsArray.data.length;
        const randomPos = Math.floor(Math.random() * armorsArrayLength);
        const armor = armorsArray.data[randomPos];
        
        let dmgNegation = `\n**Damage Negation:**\n`;
        armor.dmgNegation.forEach((element)=>{
            dmgNegation += `  __${element.name}:__ ${element.amount}\n`
        });

        let resistance = `\n**Resistance:**\n`;
        armor.resistance.forEach((element)=>{
            resistance += `  __${element.name}:__ ${element.amount}\n`
        });

        const message = `${armor.image}\n**Name:** ${armor.name}\n**Description:** ${armor.description}\n**Category:** ${armor.category}\n${dmgNegation}${resistance}`;

        interaction.editReply(message);
    })
        .catch((err)=>{console.error(`An error ocurred while processing data: `, err)})
}