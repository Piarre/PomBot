import { Client, MessageEmbed } from "discord.js";
import CommandBuilder from "../../utils/CommandBuilder";
import EmbedBuilder from "../../utils/EmbedBuilder";

const getStreams = (client: Client) => {
  new CommandBuilder(client, {
    name: "streamers",
    description: "Get a list of our streamers",
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction?.commandName === "streamers") {
      return interaction?.reply({
        embeds: [
          new EmbedBuilder(
            client,
            "Our streamders",
            "qsdqdsq",
            "PURPLE",
            [
              {
                name: "**CringeAlex**",
                value: "https://www.twitch.tv/cringealex",

              },
              {
                name: "**CringeRoro**",
                value: "https://www.twitch.tv/pompotescompote",
              },
              {
                name: "**CringePiarre**",
                value: "https://www.twitch.tv/piarre_",
              },
            ]
          ),
        ],
      });
    }
  });
};

export default getStreams;
