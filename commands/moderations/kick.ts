import { Client, GuildMember } from "discord.js";
import EmbedBuilder from "../../utils/EmbedBuilder";
import Command from "../../utils/commandHandler";

let cmd = new Command("Kick");

const kick = async (client: Client) => {
  cmd.createCommand(client, {
    name: "kick",
    description: "Kick à member",
    options: [
      {
        name: "member",
        description: "Give the member that you want to kick.",
        type: "MENTIONABLE",
        required: true,
      },
      {
        name: "reason",
        description: "Give the reason of the kick.",
        type: "STRING",
        required: true,
      },
    ],
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction?.commandName === "kick") {
      const target = interaction?.options.getMentionable(
        "member"
      ) as GuildMember;
      const reason = interaction?.options.getString("reason") as string;

      if (!target) {
        return interaction?.reply({
          embeds: [
            new EmbedBuilder(
              client,
              "Error",
              "You need to mention a member.",
              "RED"
            ),
          ],
        });
      }
      if (!target.kickable) {
        interaction?.reply({
          embeds: [
            new EmbedBuilder(
              client,
              "Error",
              "You need to have the `KICK_MEMBERS` permission to kick this member.",
              "RED"
            ),
          ],
        });
        return;
      }

      if (target == interaction?.member) {
        return interaction?.reply({
          embeds: [
            new EmbedBuilder(
              client,
              "Error",
              "You can't kick yourself.",
              "RED"
            ),
          ],
        });
      }

      target.kick(reason).then(() => {
        interaction?.reply({
          embeds: [
            new EmbedBuilder(
              client,
              "Error",
              `${target.id} has been kicked by ${interaction?.member} for ${reason}`,
              "GREEN"
            ),
          ],
        });
      });
    }
  });
};

export default kick;
