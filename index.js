const fs = require("fs");
const bdd = require("./bdd.json");
require("dotenv").config();

const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  disableMentions: "everyone",
});

const prefix = ".";
client.on("error", console.error);

client.on("ready", () => {
  console.log("Bot opérationnel");
});

function sendEmbed() {
  return exampleEmbed;
}

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  console.log(message);

  if (message.content === prefix + "devoirs") {
    if (message.author.bot) return;
    message.delete();
    if (bdd["devoirs"].length != 0) {
      message.channel.send(
        bdd["devoirs"].join("\n") + "\n<@" + message.author.id + ">"
      );
    } else {
      message.channel.send(
        "Il y a pas de devoirs \n<@" + message.author.id + ">"
      );
    }
  }

  if (message.content === prefix + "help") {
    message.delete();
    message.channel.send(
      " Les commandes du bot sont : \n :closed_book: **.add-devoirs** `nom_devoir_matière (Ajoute un devoirs préciser la matière )` \n :x: **.del-devoirs** `Supprime le dernier devoir enregistré` \n :desktop: **.devoirs** `Affiche les devoirs` \n <@" +
        message.author.id +
        ">"
    );
  }

  if (message.content.startsWith(".add-devoirs")) {
    message.delete();

    if (message.content.length > 13) {
      let ajout_devoirs = message.content.slice(13);
      console.log(ajout_devoirs);

      bdd["devoirs"].push(ajout_devoirs);
      Savebdd();
    }
  }

  if (message.content.startsWith(".del-devoirs")) {
    message.delete();
    if (message.content.length < 13) {
      if (bdd["devoirs"].length != 0) {
        bdd["devoirs"].pop();
        Savebdd();
      } else {
        message.channel.send("Il y a pas de devoirs");
      }
    }
  }
});

function Savebdd() {
  fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
    if (err) message.channel.send("Une erreur est survenue.");
  });
}

client.login(process.env.BOT_TOKEN);
