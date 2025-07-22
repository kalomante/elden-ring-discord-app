module.exports = {
    data: {
        name: "shield",
        description: "gives info about a random shield."
    },
    run: ({interaction}) => {
       interaction.reply('Fetching data...').then(()=> retrieveshield(interaction)); 
    }
}

const retrieveshield = (interaction) =>{
    fetch(`https://eldenring.fanapis.com/api/shields`)
        .then((response)=>{return response.json();})
        .catch((err)=>{console.error(`Error jsonifying response: `, err)})
        .then((shieldsArr) => {
            const shieldsLength = shieldsArr.data.length;
            const randomNum = Math.floor(Math.random() * shieldsLength);
            const shield = shieldsArr.data[randomNum];

            let shieldAttack = `**Attack:**\n`
        shield.attack.forEach((shield)=>{
            shieldAttack+= `  __${shield.name}:__ ${shield.amount}\n`;
        });
        let shieldDefence = `**Defence:**\n`
        shield.defence.forEach((shield)=>{
            shieldDefence+= `  __${shield.name}:__ ${shield.amount}\n`;
        });
        let shieldScaling = `**Scales with:**\n`
        shield.scalesWith.forEach((shield)=>{
            shieldScaling+= (typeof(shield.scaling) != 'undefined') ? `  __${shield.name}:__ ${shield.scaling}\n` : `NA`;
        });
        let shieldRA = `**Required Attributes:**\n`
        shield.requiredAttributes.forEach((shield)=>{
            shieldRA+= `  __${shield.name}:__ ${shield.amount}\n`;
        });


            const message = `${shield.image}\n**Name:** ${shield.name}\n**Description:** ${shield.description}\n${shieldAttack}${shieldDefence}${shieldRA}**Category:** ${shield.category}\n**Weight:** ${shield.weight}`;
            return interaction.editReply(message);
        }).catch((err)=>{console.error(`Error processing data: `, err)});
}