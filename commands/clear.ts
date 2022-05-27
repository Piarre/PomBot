import { Client, TextChannel } from "discord.js";
import Command from "../utils/commandHandler";

let cmd = new Command();

const clear = async (client: Client) => {
  cmd.createCommand(client, {
    name: "clear",
    description: "Clear the current channel",
    options: [
      {
        name: "messages",
        description: "Give the number of messages that you want to delete.",
        type: "NUMBER",
        required: true,
        minValue: 1,
        maxValue: 100,
      },
    ],
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction?.commandName === "clear") {
      if (!interaction?.memberPermissions?.has("ADMINISTRATOR") || !interaction?.memberPermissions?.has("MANAGE_MESSAGES")) {
        return interaction?.reply({
          content: "You don't have the permission to do that.",
          ephemeral: true,
        });
      }

      const amount = interaction?.options.getNumber("messages") as number;
      const channel: TextChannel = interaction.channel as TextChannel;

      const messages = await channel.messages.fetch({ limit: amount });
      const { size } = messages;

      messages.forEach((msg) => msg.delete());

      interaction.reply({
        content: `${size} messages are being delete.`,
      });
    }
  });
};

export default clear;
