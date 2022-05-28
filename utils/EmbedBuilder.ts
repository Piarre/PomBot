import {
  Client,
  ColorResolvable,
  EmbedFieldData,
  MessageEmbed,
} from "discord.js";

/**
 * @author Piarre
 * @class EmbedBuilder
 * @description Builds an embed with ease.
 * @param {Client} client Specify the client to get : Username and Avatar.
 * @param {ColorResolvable} color Color the embed as you want.
 * @param {string} title Specify the title of the embed.
 * @param {string} description Give it a description.
 * @param {EmbedFieldData} fileds You can add multiple fields to the embed.
 */
class EmbedBuilder {
  constructor(
    client: Client,
    title: string,
    description: string,
    color: ColorResolvable,
    fields?: EmbedFieldData[]
  ) {
    const returnEmbed = new MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .setColor(color)
      .addFields(fields ?? [])
      .setTimestamp()
      .setFooter(
        client?.user?.username as string,
        client?.user?.avatarURL() as string
      );
    return returnEmbed;
  }
}

export default EmbedBuilder;
