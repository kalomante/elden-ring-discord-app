const { default: axios, Axios } = require("axios");

module.exports = {
    data: {
        name: "search",
        description: "Recover information from The Lands Between"
    },
    run: async ({interaction}) => {
        await interaction.reply("Fetching item...");
        retrieveItem(interaction);
        //Helper Function
    }
}

const retrieveItem = async (interaction)=>{
    try{
        const items = (await axios.get(`https://eldenring.fanapis.com/api/items`)).data;
        let itemPos = Math.floor(Math.random() * 20);
        const item = items.data[itemPos];
        const itemImg= item.image;
        const itemName = item.name;
        const itemDesc = item.description;
        const itemType = item.type;
        const itemEffect = item.effect;
        const message = `${itemName} has been found:\n${itemImg}\nDescription:${itemDesc}\nType:${itemType}\n${itemEffect}`;
        await interaction.editReply(message);
    }catch(err){
        console.error("Error fetching data: ", err);
        await interaction.editReply('Failed to retrieve data')
    }
}