module.exports = {
    data: {
        name: "ammo",
        description: "gives info about a random kind of ammo"
    },
    run: ({interaction}) =>{
        interaction.reply(`Fetching data...`)
            .then(()=> retrieveAmmo(interaction))
            .catch((err)=> {console.error(`An error ocurred: `, err)});
    }
}

const retrieveAmmo = (interaction)=>{
    fetch(`https://eldenring.fanapis.com/api/ammos`)
    .then((response)=>{return response.json()})
        .catch((err)=>{console.error(`Response couldnt be jsonified: `, err)})
    .then((ammosArray)=>{
        const ammosArrayLength = ammosArray.data.length;
        const randomPos = Math.floor(Math.random() * ammosArrayLength);
        const ammo = ammosArray.data[randomPos];
        let attackPower = `**Attack Power:**\n`;
        ammo.attackPower.forEach((element)=>{
            attackPower += `  __${element.name}:__ ${element.amount}\n`;
        });

        const message = `${ammo.image}\n**Name:** ${ammo.name}\n**Description:** ${ammo.description}\n**Type:** ${ammo.type}\n${attackPower}\n**Passive:** ${ammo.passive}`;

        interaction.editReply(message);
    })
        .catch((err)=>{console.error(`An error ocurred while processing data: `, err)})
}