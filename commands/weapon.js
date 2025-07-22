module.exports = {
    data: {
        name: "weapon",
        description: "Command that shows weapon info"
    },
    run: ({interaction})=>{
        interaction.reply(`Fetching Data...`).then(()=>{retrieveWeapon(interaction)}).catch((error)=> { console.error(`Could not retrieve weapon `, error)});
    }
}

const retrieveWeapon = (interaction) => {
    fetch(`https://eldenring.fanapis.com/api/weapons`).then((response)=>{return response.json()}).catch((error)=>console.error(`There was a problem processing json `, error)).then((weapon)=>{
        const dataLength = weapon.data.length;
        const randomNum = Math.floor(Math.random()* dataLength);
        weapon = weapon.data[randomNum];
        const weaponName = weapon.name;
        const weaponImage = weapon.image;
        const weaponDescription = weapon.description
        let weaponAttack = `**Attack:**\n`
        weapon.attack.forEach((weapon)=>{
            weaponAttack+= `  __${weapon.name}:__ ${weapon.amount}\n`;
        });
        let weaponDefence = `**Defence:**\n`
        weapon.defence.forEach((weapon)=>{
            weaponDefence+= `  __${weapon.name}:__ ${weapon.amount}\n`;
        });
        let weaponScaling = `**Scales with:**\n`
        weapon.scalesWith.forEach((weapon)=>{
            weaponScaling+= (typeof(weapon.scaling) != 'undefined') ? `  __${weapon.name}:__ ${weapon.scaling}\n` : `NA`;
        });
        let weaponRA = `**Required Attributes:**\n`
        weapon.requiredAttributes.forEach((weapon)=>{
            weaponRA+= `__${weapon.name}:__ ${weapon.amount}\n`;
        });
        const weaponCategory = weapon.category;
        const weaponWeight = weapon.weight;
        const message = `${weaponImage}\n**Name:** ${weaponName}\n**Description:** ${weaponDescription}\n${weaponAttack}\n${weaponDefence}\n${weaponScaling}\n${weaponRA}\n**Category:** ${weaponCategory}\n**Weight:** ${weaponWeight}`;

        return interaction.editReply(message);
    }).catch((error)=>{
        console.error(`There was a problem using data: `, error);
    })
}