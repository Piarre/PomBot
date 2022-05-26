import { ApplicationCommandOptionData, Client } from "discord.js";

class Commands {
   createCommand(
      client: Client,
      options: {
         name: string;
         description: string;
         options?: ApplicationCommandOptionData[];
      }
   ) {
      const guildID = process.env.guildID as string;
      const guild = client.guilds.cache.get(guildID);

      let commands;

      guild
         ? (commands = guild.commands)
         : (commands = client.application?.commands);

      commands?.create(options);
   }
}

export default Commands;
