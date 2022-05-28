import { Client } from "discord.js";
import EmbedBuilder from "../utils/EmbedBuilder";
import CommandBuilder from "../utils/CommandBuilder"

const ping = (client: Client) => {
  new CommandBuilder(client, {
    name: "ping",
    description: "Pong !",
  })

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction?.commandName === "ping") {
      const ping = client.ws.ping;
      interaction.reply({
        embeds: [new EmbedBuilder(client, "Pong !", `**${ping}ms**`, "GREEN"),],
      });
    }
  });
}

export default ping;
