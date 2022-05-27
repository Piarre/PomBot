import { Client, GuildMember, TextChannel } from "discord.js";
import Command from "../../utils/commandHandler";

let cmd = new Command();

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

      if (!target) interaction?.reply({ content: "Please tag a member." });
      if (!target.kickable) {
        interaction?.reply({
          content: "You can' kick this user.",
          ephemeral: true,
        });
        return;
      }

      if (target == interaction?.member) {
        interaction?.reply({
          content: "You can' kick yourself.",
          ephemeral: true,
        });
        return;
      }

      target.kick(reason).then(() => {
        interaction?.reply({
          content: `<@${target.id}> has been kicked by ${interaction?.member} for : ${reason}.`,
        });
      });
    }
  });
};

export default kick;
