import { Client, TextChannel } from "discord.js";
import EmbedBuilder from "../utils/EmbedBuilder";
import Command from "../utils/commandHandler";

let cmd = new Command("Clear");

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
      if (
        !interaction?.memberPermissions?.has("ADMINISTRATOR") ||
        !interaction?.memberPermissions?.has("MANAGE_MESSAGES")
      ) {
        return interaction?.reply({
          embeds: [
            new EmbedBuilder(
              client,
              "Error",
              `You don't have the permission to use this command.`,
              "RED"
            ),
          ],
          ephemeral: true,
        });
      }

      const amount = interaction?.options.getNumber("messages") as number;
      const channel: TextChannel = interaction.channel as TextChannel;

      const messages = await channel.messages.fetch({ limit: amount });
      const { size } = messages;

      messages.forEach((msg) => msg.delete());

      interaction?.reply({
        embeds: [
          new EmbedBuilder(
            client,
            "Success",
            "**${size}** are being deleted.",
            "GREEN"
          ),
        ],
      });
    }
  });
};

export default clear;
