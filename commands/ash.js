module.exports = {
    data: {
        name: "ash",
        description: "gives info about a random ash"
    },
    run: ({interaction}) => {
        interaction.reply(`Fetching data...`)
            .then(()=> retrieveash(interaction))
            .catch((err)=> {console.error(`An error ocurred: `, err)});
    }
    }

const retrieveash = (interaction) => {
     fetch(`https://eldenring.fanapis.com/api/ashes`)
    .then((response)=>{return response.json()})
        .catch((err)=>{console.error(`Response couldnt be jsonified: `, err)})
    .then((ashesArray)=>{
        const ashesArrayLength = ashesArray.data.length;
        const randomPos = Math.floor(Math.random() * ashesArrayLength);
        const ash = ashesArray.data[randomPos];

        const ashImg = (ash.image == null) ? `NA` : ash.image;
        
        //The API has the 'Ash of War:' string for each element, so instead of repeating "Name: Ash of War:" I adapted the text so the result is "Ash of War: ..."
        let [name, title] = ash.name.split(":");
        
        const message = `${ashImg}\n**${name}:** ${title}\n**Description:** ${ash.description}\n**Affinity:** ${ash.affinity}\n**Skill:** ${ash.skill}`;

        interaction.editReply(message);
    })
        .catch((err)=>{console.error(`An error ocurred while processing data: `, err)})
}