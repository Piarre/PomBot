import {
  Client,
  TextChannel,
} from "discord.js";
import EmbedBuilder from "../../utils/EmbedBuilder";
import CommandBuilder from "../../utils/CommandBuilder";

const sendRoleText = (client: Client) => {
  new CommandBuilder(client, {
    name: "sendroletext",
    description: "Send the dropdown roles selection.",
    options: [
      {
        name: "channel",
        description: "The channel to send the message to.",
        type: "CHANNEL",
        required: true,
      },
      {
        name: "text",
        description: "The message to send.",
        type: "STRING",
        required: true,
      },
    ],
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction?.commandName === "sendroletext") {
      if (
        !interaction?.memberPermissions?.has("ADMINISTRATOR") ||
        !interaction?.memberPermissions?.has("MANAGE_ROLES") ||
        !interaction?.memberPermissions?.has("MANAGE_MESSAGES")
      ) {
        return interaction?.reply({
          embeds: [
            new EmbedBuilder(
              client,
              "You do not have the permissions to use this command.",
              "You need the `ADMINISTRATOR`, `MANAGE_ROLES` or `MANAGE_MESSAGES` permissions to use this command.",
              "RED"
            ),
          ],
        });
      }

      const channel = interaction.options.getChannel("channel") as TextChannel;

      if (!channel || channel.type !== "GUILD_TEXT") {
        return interaction?.reply({
          embeds: [
            new EmbedBuilder(
              client,
              "Error",
              "The channel you provided is not a text channel.",
              "RED"
            ),
          ],
        });
      }

      const text = interaction?.options.getString("text") as string;
      (await channel.send(text)).react("✅");

      if (interaction) {
        interaction?.reply({
          embeds: [
            new EmbedBuilder(
              client,
              "Success",
              "The message has been sent.",
              "GREEN"
            ),
          ],
        });
      }
    }
  });
};

export default sendRoleText;
