module.exports = {
    data: {
        name: "boss",
        description: `Retrieve a random boss`,
    },
    run: ({interaction})=> {
        interaction.reply('Fetching data...').then(()=> {return retrieveBoss(interaction)}).catch((error)=>{console.log("An error ocurred: ", error)});
    }

}

const retrieveBoss = (interaction) => {
     fetch(`https://eldenring.fanapis.com/api/bosses`).then( (response) => {return response.json()}).catch((error)=> console.log(`Ocurrió un error: `, error)).then((bosses)=>{
        const bossArray = bosses.data.length;
         const bossPos = Math.floor(Math.random()*bossArray);
         const boss = bosses.data[bossPos]; 
         const bossName = boss.name;
         const bossImg = (boss.image == null) ? `Image not available` : boss.image;
         const bossRegion = boss.region;
         const bossDesc = boss.description;
         const bossLocation = boss.location;
         const healthPoints = boss.healthPoints;
         let bossDrops = `**Drops:**\n`
         boss.drops.forEach((drop)=>{
                bossDrops += `${drop}\n`;
            });
            const message = `${bossImg}\n**Name:** ${bossName}\n**Region:** ${bossRegion}\n**Description:** ${bossDesc}\n**Location:** ${bossLocation}\n** HealthPoints:** ${healthPoints}\n${bossDrops}`;
            
            return interaction.editReply(message);
        });

}