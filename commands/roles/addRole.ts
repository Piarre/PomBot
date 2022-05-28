import {
  Client,
  GuildMember,
  MessageActionRow,
  MessageEmbed,
  MessageSelectMenu,
  MessageSelectOptionData,
  Role,
  TextChannel,
} from "discord.js";
import EmbedBuilder from "../../utils/EmbedBuilder";
import CommandBuilder from "../../utils/CommandBuilder";

const addRole = (client: Client) => {

  new CommandBuilder(client, {
    name: "addrole",
    description: "Add role to auto role message.",
    options: [
      {
        name: "channel",
        description: "Channel to add the role to auto role message.",
        type: "CHANNEL",
        required: true,
      },
      {
        name: "messageid",
        description: "The message to add the role to auto role message.",
        type: "STRING",
        required: true,
      },
      {
        name: "role",
        description: "The role to add the role to auto role message.",
        type: "ROLE",
        required: true,
      },
    ],
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction?.commandName === "addrole") {
      if (
        !interaction?.memberPermissions?.has("ADMINISTRATOR") ||
        !interaction?.memberPermissions?.has("MANAGE_ROLES")
      ) {
        return interaction?.reply({
          embeds: [
            new EmbedBuilder(
              client,
              "Error",
              "You need the `ADMINISTRATOR` or `MANAGE_ROLES` permission to use this command.",
              "RED"
            ),
          ],
        });
      }

      const channel = interaction?.options.getChannel("channel") as TextChannel;
      const messageId = interaction?.options.getString("messageid") as string;
      const role = interaction?.options.getRole("role") as Role;

      if (!role) {
        return interaction?.reply({
          embeds: [
            new EmbedBuilder(
              client,
              "Error",
              "You need to specify a role to add to the auto role message.",
              "RED"
            ),
          ],
        });
      }

      const targetMessage = await channel.messages.fetch(messageId, {
        cache: true,
        force: true,
      });

      if (!targetMessage) {
        return interaction?.reply({
          embeds: [
            new EmbedBuilder(
              client,
              "Error",
              "Please provide a valid message ID.",
              "RED"
            ),
          ],
        });
      }

      if (targetMessage.author.id !== interaction?.client.user?.id) {
        return interaction?.reply({
          embeds: [
            new EmbedBuilder(
              client,
              "Error",
              `Please provide a message that was send by <@${interaction?.client.user?.id}>.`,
              "RED"
            ),
          ],
        });
      }

      let row = targetMessage.components[0] as MessageActionRow;
      if (!row) row = new MessageActionRow();

      const options: MessageSelectOptionData[] = [
        {
          label: role.name,
          value: role.id,
        },
      ];

      let menu = row.components[0] as MessageSelectMenu;
      if (menu) {
        for (const i of menu.options) {
          if (i.value === options[0].value) {
            return interaction?.reply({
              ephemeral: true,
              embeds: [
                new EmbedBuilder(
                  client,
                  "Error",
                  "The role is already added.",
                  "RED"
                ),
              ],
              allowedMentions: { roles: [] },
            });
          }
        }

        menu.addOptions(options);
        menu.setMaxValues(menu.options.length);
      } else {
        row.addComponents(
          new MessageSelectMenu()
            .setCustomId("auto_roles")
            .setMinValues(0)
            .setMaxValues(1)
            .setPlaceholder("Select your roles...")
            .addOptions(options)
        );
      }

      targetMessage.edit({
        components: [row],
      });

      return interaction?.reply({
        embeds: [
          new EmbedBuilder(client, "Error", `<@&${role.id}> added to auto role message.`, "GREEN"),
        ],
        allowedMentions: { roles: [] },
        ephemeral: true,
      });
    }
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isSelectMenu()) return;

    if (
      interaction?.customId === "auto_roles" &&
      interaction?.member instanceof GuildMember
    ) {
      const component = interaction?.component as MessageSelectMenu;
      const removed = component?.options.filter((option) => {
        return !interaction?.values.includes(option.value);
      });

      for (const id of removed) {
        interaction?.member.roles.remove(id.value);
      }

      for (const id of interaction?.values) {
        interaction?.member.roles.add(id);
      }

      interaction?.reply({
        embeds: [
          new EmbedBuilder(
            client,
            "Role uptated",
            `<@&${interaction?.values[0]}> added to auto role message.`,
            "GREEN"
          ),
        ],
        ephemeral: true,
      });
    }
  });
};

export default addRole;
