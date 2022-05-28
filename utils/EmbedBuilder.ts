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
  client: Client;
  title: string;
  description: string;
  color: ColorResolvable;
  fields?: EmbedFieldData[];

  constructor(
    client: Client,
    title: string,
    description: string,
    color: ColorResolvable,
    fields?: EmbedFieldData[]
  ) {
    this.client = client;
    this.title = title;
    this.description = description;
    this.color = color;
    this.fields = fields;
    new MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .setColor(color)
      .setTimestamp()
      .addFields(fields ?? [])
      .setFooter(
        client?.user?.username as string,
        client?.user?.avatarURL() as string
      );
  }
}

export default EmbedBuilder;
