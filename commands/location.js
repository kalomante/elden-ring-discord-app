module.exports = {
    data: {
        name: "location",
        description: "gives info about a random location."
    },
    run: ({interaction}) => {
       interaction.reply('Fetching data...').then(()=> retrieveLocation(interaction)); 
    }
}

const retrieveLocation = (interaction) =>{
    fetch(`https://eldenring.fanapis.com/api/locations`)
        .then((response)=>{return response.json();})
        .catch((err)=>{console.error(`Error jsonifying response: `, err)})
        .then((locationsArr) => {
            const locationsLength = locationsArr.data.length;
            const randomNum = Math.floor(Math.random() * locationsLength);
            const location = locationsArr.data[randomNum];
            const message = `${location.image}\n**Name:** ${location.name}\n**Description:** ${location.description}\n**FP Cost:** ${location.fpCost}\n**Region:** ${location.region}`;
            return interaction.editReply(message);
        }).catch((err)=>{console.error(`Error processing data: `, err)});
}