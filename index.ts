import DiscordJS, {
  Intents,
  MessageEmbed,
  PresenceData,
  Role,
  TextChannel,
} from "discord.js";
import { ActivityTypes } from "discord.js/typings/enums";

import dotenv from "dotenv";

import EmbedBuilder from "./utils/EmbedBuilder";

import ping from "./commands/ping";
import clear from "./commands/clear";

import kick from "./commands/moderations/kick";
import ban from "./commands/moderations/ban";

import send from "./commands/roles/send";
import addRole from "./commands/roles/addRole";
import W2G from "./commands/utils/W2G";
import getStreams from "./commands/utils/getStreams";

dotenv.config();

const pomBot = {
  config: {
    presence: {
      activities: [
        {
          name: `for members`,
          type: ActivityTypes.WATCHING,
        },
      ],
      status: undefined,
    },
  },
  client: new DiscordJS.Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MEMBERS,
    ],
  }),
};

pomBot.client.on("ready", () => {
  pomBot.client.user?.setPresence(pomBot.config.presence as PresenceData);

  ping(pomBot.client);
  clear(pomBot.client);
  W2G(pomBot.client);
  getStreams(pomBot.client);

  kick(pomBot.client);
  ban(pomBot.client);

  send(pomBot.client);
  addRole(pomBot.client);

  console.log(`Logged as ${pomBot.client.user?.tag}`);
});

pomBot.client.on("guildMemberAdd", (guildMember) => {
  const role = guildMember.guild.roles.cache.find(
    (role) => role.id === process.env.onJoinRoleId
  );

  const hi = new EmbedBuilder(
    pomBot.client,
    "Welcome",
    `Welcome to the server, ||<@${guildMember.user.id}>|| !`,
    "YELLOW"
  );

  guildMember.roles.add(role as Role).catch(console.error);
  (
    guildMember.guild.channels.cache.get(
      process.env.onJoinChannelId as string
    ) as TextChannel
  ).send({ embeds: [hi] });
});

pomBot.client.on("guildMemberRemove", (guildMember) => {
  const bye = new EmbedBuilder(
    pomBot.client,
    "Goodbye",
    `||<@${guildMember.user.id}>|| has left the server.`,
    "RED"
  );

  (
    guildMember.guild.channels.cache.get(
      process.env.onJoinChannelId as string
    ) as TextChannel
  ).send({ embeds: [bye] });
});

pomBot.client.login(process.env.TOKEN as string);
