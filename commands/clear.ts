
import { Client } from 'discord.js';

import Commands from "../utils/commands";
let cmd = new Commands();


const clear = async (client: Client) => {
   cmd.createCommand(client, {
      name: 'clear',
      description: 'Clear the current channel',
      options: [
         {
            name: 'Messages to clear',
            description: 'Give the number of messages that you want to delete.',
            type: 'NUMBER',
            required: false,
            minValue: 1, maxValue: 100
         }
      ]
   })

   client.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) return;

      const { commandName, options, channel, member } = interaction;
      
      if (commandName === 'clear') {
         interaction.reply({
            content: 'Pong !',
         })
      }
   });
}

export default clear;