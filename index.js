const fs = require("fs");
const bdd = require("./bdd.json");
require("dotenv").config();


//Ajout des fonction nécessaire
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  disableMentions: "everyone",
});
//Setup du prefix
const prefix = ".";
client.on("error", console.error);

client.on("ready", () => {
  console.log("Bot opérationnel");
});




//Quand un message sera écrit le bot le lira

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  console.log(message);
  //Si la commande .devoirs est entré il envoie en message l'array du fichier BDD convertit en String 
  if (message.content === prefix + "devoirs") {
    if (message.author.bot) return;
    message.delete();
    if (bdd["devoirs"].length != 0) {
      message.channel.send(
        //Création de l'embed pour afficher les devoirs
        {"embeds": [
          {
            "type": "rich",
            "title": `Devoirs`,
            "description": `Voici les devoirs à faire pour la semaine !`,
            "color": 0xffc400,
            "fields": [
              {
                "name": `Devoirs :`,
                "value": bdd["devoirs"].join("\n"),
                "inline": true
              }
            ],
            "thumbnail": {
              "url": `https://i.imgur.com/ZCI0rim.png`,
              "height": 0,
              "width": 0
            },
            "author": {
              "name": `Devoirs`,
              "icon_url": `https://i.imgur.com/ZCI0rim.png`
            },
            "footer": {
              "text": `.del-devoirs pour en supprimer.`,
              "icon_url": `https://i.imgur.com/ZCI0rim.png`
            }
          }
        ]
      }
      );
    } else {
      //Si l'array est vide alors le bot renvoie un message d'erreur
      message.channel.send(
        //Création de l'embed qui s'affiche si il y a des devoirs ou pas
        
        {"embeds": [
          {
            "type": "rich",
            "title": `Devoirs`,
            "description": `Il n'y a pas de devoirs`,
            "color": 0xffc400,
            "thumbnail": {
              "url": `https://i.imgur.com/ZCI0rim.png`,
              "height": 0,
              "width": 0
            },
            "author": {
              "name": `Devoirs`,
              "icon_url": `https://i.imgur.com/ZCI0rim.png`
            },
            "footer": {
              "text": `.add-devoirs pour ajouter des devoirs`,
              "icon_url": `https://i.imgur.com/ZCI0rim.png`
            }
          }
        ]
      }
      );
    }
  }
//Si la commande .help est entré le bot envoie toutes les commande qui lui sont associés
  if (message.content === prefix + "help") {
    message.delete();
    message.channel.send(
      //Création de l'embed qui affiche les commandes du bot
      {"embeds": [
      {
        "type": "rich",
        "title": `Devoirs`,
        "description": `Les commandes du bot sont : \n :closed_book: **.add-devoirs** nom_devoir_matière (Ajoute un devoirs préciser la matière ) \n :x: **.del-devoirs** Supprime le dernier devoir enregistré \n :desktop: **.devoirs** Affiche les devoirs`,
        "color": 0xffc400,
        "thumbnail": {
          "url": `https://i.imgur.com/ZCI0rim.png`,
          "height": 0,
          "width": 0
        },
        "author": {
          "name": `Devoirs`,
          "icon_url": `https://i.imgur.com/ZCI0rim.png`
        },
        "footer": {
          
          "icon_url": `https://i.imgur.com/ZCI0rim.png`
        }
      }
    ]
  }
 
    );
  }
  
//Si la commande .add-devoirs est entré alors il ajouteras a l'array dans le fichier BDD la saisie après le .add-devoirs
  if (message.content.startsWith(".add-devoirs")) {
    message.delete();

    if (message.content.length > 13) {
      let ajout_devoirs = message.content.slice(13);
      console.log(ajout_devoirs);
      message.channel.send(
        //Création de l'Embed qui ajoute les devoirs et affiche le devoir ajouté
        {"embeds": [
        {
          "type": "rich",
          "title": `Devoirs`,
          "description": `Ajout du devoir : ` + ajout_devoirs,
          "color": 0xffc400,
          "thumbnail": {
            "url": `https://i.imgur.com/ZCI0rim.png`,
            "height": 0,
            "width": 0
          },
          "author": {
            "name": `Devoirs`,
            "icon_url": `https://i.imgur.com/ZCI0rim.png`
          },
          "footer": {
            "text": `.del-devoirs pour en supprimer`,
            "icon_url": `https://i.imgur.com/ZCI0rim.png`
          }
        }
      ]
    })
      bdd["devoirs"].push(ajout_devoirs);
      Savebdd();
    }
  }
//Si la commande .del-devoirs est entré alors il supprimera la dernière entré du tableau
  if (message.content.startsWith(".del-devoirs")) {
    message.delete();
    if (message.content.length < 13) {
      if (bdd["devoirs"].length != 0) {
        let del_devoirs = bdd["devoirs"].pop();
        message.channel.send(
          //Création de l'Embed qui affiche le dernier devoir supprimé
          {"embeds": [
          {
            "type": "rich",
            "title": `Devoirs`,
            "description": `Dernier devoir supprimé : ` + del_devoirs,
            "color": 0xffc400,
            "thumbnail": {
              "url": `https://i.imgur.com/ZCI0rim.png`,
              "height": 0,
              "width": 0
            },
            "author": {
              "name": `Devoirs`,
              "icon_url": `https://i.imgur.com/ZCI0rim.png`
            },
            "footer": {
              "text": `.add-devoirs pour ajouter des devoirs`,
              "icon_url": `https://i.imgur.com/ZCI0rim.png`
            }
          }
        ]
      })
        Savebdd();
      } else {
        //Si l'array est vide alors le bot renvoie un message d'erreur
        message.channel.send(
          //Création de l'Embed qui s'affiche si il n'y a pas de devoir
          {"embeds": [
          {
            "type": "rich",
            "title": `Devoirs`,
            "description": `Il n'y a pas de devoirs.`,
            "color": 0xffc400,
            "thumbnail": {
              "url": `https://i.imgur.com/ZCI0rim.png`,
              "height": 0,
              "width": 0
            },
            "author": {
              "name": `Devoirs`,
              "icon_url": `https://i.imgur.com/ZCI0rim.png`
            },
            "footer": {
              "text": `.add-devoirs pour ajouter des devoirs`,
              "icon_url": `https://i.imgur.com/ZCI0rim.png`
            }
          }
        ]
      });
      }
    }
  }
});
//Fonction pour sauvegarder la l'array dans l'autre fichier
function Savebdd() {
  fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
    if (err) message.channel.send("Une erreur est survenue.");
  });
}

//Token pour la connexion du bot et du code
client.login(process.env.BOT_TOKEN);
