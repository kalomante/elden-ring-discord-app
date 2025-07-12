const { default: axios } = require("axios");

module.exports = {
    data: {
        name: "character",
        description: "Gives information about a random character"
    },
    run: async ({interaction}) =>{
        await interaction.reply("Fetching data...");

        //Helping function

        retrieveCharacter(interaction);
    }
}

const retrieveCharacter = async (interaction) => {
    try{

        const characters = await(axios.get(`https://eldenring.fanapis.com/api/npcs`));
        let characterPos = Math.floor(Math.random()*20);
        const character = characters.data.data[characterPos];
        const characterName = character.name;
        const characterImg = character.image;
        const characterQuote = (character.quote == null) ? `No quote` : character.quote ;
        const characterLocation = character.location;
        const characterRole = (characterName == `Melina`) ? `Waifu` : character.role;
        const message = `Name: ${characterName}\nImage: ${characterImg}\nQuote: ${characterQuote}\nLocation: ${characterLocation}\nRole: ${characterRole}`;
        await interaction.editReply(message);
    }catch(err){
        console.error("Data couldn't be fetched: ", err);
        interaction.editReply("Character couldn't be found");
    }

}