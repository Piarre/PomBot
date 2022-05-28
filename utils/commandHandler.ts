import { ApplicationCommandOptionData, Client } from "discord.js";

/**
 * @author Piarre
 * @class Command
 * @description Create fastly a slash command.
 */
class Command {
  constructor(commandName: string) {
    console.log(`"${commandName}" loaded.`);
  }

  /**
   * @param {Client} client Specify the client to use.
   * @param {ApplicationCommandOptionData} options
   * @param {string} options.name
   * @param {string} options.description
   * @param {string[]} options.options
   */
  async createCommand(
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

export default Command;
