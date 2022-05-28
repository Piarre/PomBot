import { Client, GuildMember } from "discord.js";
import EmbedBuilder from "../../utils/EmbedBuilder";
import Command from "../../utils/commandHandler";

let cmd = new Command("Ban");

const ban = async (client: Client) => {
  cmd.createCommand(client, {
    name: "ban",
    description: "Ban a member",
    options: [
      {
        name: "member",
        description: "Give the member that you want to ban.",
        type: "MENTIONABLE",
        required: true,
      },
      {
        name: "reason",
        description: "Give the reason of the ban.",
        type: "STRING",
        required: true,
      },
      {
        name: "days",
        description: "Give the number of days of the ban.",
        type: "NUMBER",
        required: false,
      },
    ],
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction?.commandName === "ban") {
      const target = interaction?.options.getMentionable(
        "member"
      ) as GuildMember;
      const reason = interaction?.options.getString("reason") as string;
      const days = interaction?.options.getNumber("days") as number;

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
      if (!target.bannable) {
        interaction?.reply({
          embeds: [
            new EmbedBuilder(
              client,
              "Error",
              "You need to have the `BAN_MEMBERS` permission to ban this member.",
              "RED"
            ),
          ],
        });
        return;
      }

      if (target == interaction?.member) {
        return interaction?.reply({
          embeds: [
            new EmbedBuilder(client, "Error", "You can't ban yourself.", "RED"),
          ],
        });
      }

      target
        .ban({
          reason,
          days: days ?? 7,
        })
        .then(() => {
          interaction?.reply({
            embeds: [
              new EmbedBuilder(
                client,
                "Success",
                ` ${interaction?.member} banned <@${target.id}>  ${
                  days ?? 7
                } day(s) for ${reason}.`,
                "GREEN"
              ),
            ],
          });
        });
    }
  });
};

export default ban;
