import { Client } from "discord.js";
import Commands from "../utils/commands";

let cmd = new Commands();

const ping = (client: Client) => {
   cmd.createCommand(client, {
      name: 'ping',
      description: 'Pong !',
   });

   client.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) return;

      const { commandName, options, channel, member } = interaction;
      
      if (commandName === 'ping') {
         interaction.reply({
            content: 'Pong !',
         })
      }
   });
}

export default ping;