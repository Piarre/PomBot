import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
import ping from './commands/ping';
import Commands from './utils/commands';
dotenv.config()

let cmd = new Commands();

const config = {
   activity: {
      name: 'With ',
      type: 'WATCHING',
   }
}

const pomBot = new DiscordJS.Client({
   intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
   ]
})

pomBot.on('ready', () => {
   console.log(`Logged as ${pomBot.user?.tag}`)
   pomBot.user?.setActivity(config.activity.name, {
      type: 'WATCHING',
   })

   ping(pomBot);
})

pomBot.login(process.env.TOKEN as string) 