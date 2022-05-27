import { Client } from "discord.js";
import Command from "../utils/commandHandler";

let cmd = new Command();

const ping = (client: Client) => {
   cmd.createCommand(client, {
      name: 'ping',
      description: 'Pong !',
   });

   client.on('interactionCreate', async interaction => {
      if (!interaction.isCommand()) return;

      if (interaction?.commandName === 'ping') {
         interaction.reply({
            content: 'Pong !',
         })
      }
   });
}

export default ping;