import { Client, GuildMember, TextChannel } from "discord.js";
import Command from "../../utils/commandHandler";

let cmd = new Command();

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

      if (!target) interaction?.reply({ content: "Please tag a member." });
      if (!target.bannable) {
        interaction?.reply({
          content: "You can' ban this user.",
          ephemeral: true,
        });
        return;
      }

      if (target == interaction?.member) {
        interaction?.reply({
          content: "You can' ban yourself.",
          ephemeral: true,
        });
        return;
      }

      target
        .ban({
          reason,
          days: days ?? 7,
        })
        .then(() => {
          interaction?.reply({
            content: ` ${interaction?.member} banned <@${target.id}>  ${days ?? 7} day(s) for ${reason}.`,
          });
        });
    }
  });
};

export default ban;
