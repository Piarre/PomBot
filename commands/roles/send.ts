import { Client, EmojiIdentifierResolvable, TextChannel } from "discord.js";
import Command from "../../utils/commandHandler";
let cmd = new Command();

const sendRoleText = (client: Client) => {
  cmd.createCommand(client, {
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
          content: "You don't have the permission to do that.",
          ephemeral: true,
        });
      }

      const channel = interaction.options.getChannel("channel") as TextChannel;

      if (!channel || channel.type !== "GUILD_TEXT") {
        return interaction?.reply({
          ephemeral: true,
          content: "Please tag a channel",
        });
      }

      const text = interaction?.options.getString("text") as string;
      (await channel.send(text)).react("✅");

      if (interaction) {
        interaction.reply({
          ephemeral: true,
          content: "Message sent",
        });
      }
    }
  });
};

export default sendRoleText;
