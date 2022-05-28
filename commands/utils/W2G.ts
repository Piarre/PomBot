import { Client } from "discord.js";
import axios from "axios";

import CommandBuilder from "../../utils/CommandBuilder";
import EmbedBuilder from "../../utils/EmbedBuilder";

const W2G = async (client: Client) => {
  new CommandBuilder(client, {
    name: "room",
    description: "Create a W2G room.",
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction?.commandName === "room") {
      axios
        .post("https://w2g.tv/rooms/create.json", {
          w2g_api_key:
            "nzwu20938ycqqq7akb1ap6pnra3076u5d4gxr98jenp5hxli78ynpn1i3wze5k2b",
          bg_color: "#000000",
          bg_opacity: "50",
        })
        .then((res) => {
          const response = `https://w2g.tv/rooms/${res.data.streamkey}?lang=fr`;
          interaction?.reply({
            embeds: [
              new EmbedBuilder(
                client,
                "W2G Room",
                `Your room has been created and here is the link \n${response}`,
                "GREEN"
              ),
            ],
          });
        })
        .catch((error) => {
          interaction?.reply({
            embeds: [
              new EmbedBuilder(
                client,
                "Error",
                `An error occured while creating your room \n${error}`,
                "RED"
              ),
            ],
          });
        });
    }
  });
};

export default W2G;
