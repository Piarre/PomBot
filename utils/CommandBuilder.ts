import { ApplicationCommandOptionData, Client } from "discord.js";

/**
 * @author Piarre
 * @class CommandBuilder
 * @description Create fastly a slash command.
 * @param {Client} client Specify the client to use.
 * @param {ApplicationCommandOptionData} options
 * @param {string} options.name
 * @param {string} options.description
 * @param {string[]} options.options
 */
class CommandBuilder {
  client: Client;
  options: {
    name: string;
    description: string;
    options?: ApplicationCommandOptionData[];
  };

  constructor(
    client: Client,
    options: {
      name: string;
      description: string;
      options?: ApplicationCommandOptionData[];
    }
  ) {
    this.client = client;
    this.options = options;

    const guildID = process.env.guildID as string;
    const guild = client.guilds.cache.get(guildID);

    let commands;

    guild
      ? (commands = guild.commands)
      : (commands = client.application?.commands);

    commands?.create(options);

    console.log(`"${options.name}" loaded.`);
  }
}

export default CommandBuilder;
