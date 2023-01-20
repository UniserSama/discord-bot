///////////////// Copyright Velopce /////////////////////////
const Discord = require("discord.js");
const mysql = require("mysql");
const { SlashCommandBuilder } = require("@discordjs/builders");
const prefix = "!";
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
    partials: [
        "MESSAGE", 
        "CHANNEL", 
        "REACTION"
    ]
});
const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("renvoie pong")
    .addUserOption(option => option
        .setName("utilisateur")
        .setDescription("utilisateur de votre choix")
        .setRequired(false));
//Définition de la slash commande "Ping"
const dataAide = new SlashCommandBuilder()  
    .setName("aide")
    .setDescription("Vous fournis les commandes utilisables et leurs fonctionnements");
// Définition de la slash commande "Aide"

Client.on("ready", async () => { 
    Client.application.commands.create(data);
    Client.application.commands.create(dataAide);
    Client.guilds.cache.get("929355712369405993").commands.create(data);
    Client.guilds.cache.get("929355712369405993").commands.create(dataAide);
    
    
    console.log(Client.application.commands.cache);
    await Client.application.commands.fetch();
    console.log(Client.application.commands.cache);

    Client.application.commands.cache.map(command => {
       command.delete();
    })
    console.log("bot opérationnel");
});

Client.on("guildMemberAdd", member => {
    //Tentative de DM
    member.createDM().then(channel => {
        const embed = new Discord.MessageEmbed()
        .setColor("00099ff")
        .setTitle('Bienvenue dans le dojo des plumes ' + member.displayName)
        .setDescription("Pour votre propre bien, voici quelques conseils VITAUX : \n"
        + "Tout d'abord... Allez lire et valider le réglement (autrement, Aurevoir !) \n" 
        + "Une fois, votre validation terminé, je reviendrai vers vous pour vous aidez à complêter directement votre profil depuis le serveur. \n"
        + "Vos données seront conservés sur une base sécurisée et modifiable à tout moment depuis cette conversation. \n"
        + "Si vous quittez le serveur, vos données seront supprimer... \n"
        + "D'un point de vue juridique toute récupération des données d'autres membre sans autorisation vous expose au yeux de la loi ! \n"
        + "(Rassurez-vous, les données dont nous avons besoin n'ont rien de dangereux) \n")
        .setImage("https://pa1.narvii.com/7122/2172d7eeb02c51de1648109b783663a1e5a7bb37r1-250-140_hq.gif")
        .setTimestamp()
        .setFooter({text: "A bientôt !"});
        return channel.send({ embeds: [embed] })
        //return channel.send('Bienvenue sur mon serveur ' + member.displayName)
      }).catch(console.error)

    console.log("un membre est arrivé !");
    //<@>
    Client.channels.cache.get("1003315343743254528").send("<@" + member.id + "> est arrivé ! Bienvenue !");
    member.roles.add("1065694026453504020");
});

Client.on("guildMemberRemove", member =>{
    console.log("un membre a quitté le serveur !");
    Client.channels.cache.get("1003315343743254528").send(member.displayName + " nous a quitté ! ...");
});

Client.on("interactionCreate", interaction => {
   if(interaction.isCommand()){
       if (interaction.commandName === "ping"){
           let user = interaction.options.getUser("utilisateur");
           if (user != undefined){
               interaction.reply("pong <@" + user.id + ">");
           }
           else {
               interaction.reply("pong");
           }
           
       }
   }
});


Client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.message.id === '1066044766971760681' && reaction.emoji.name === '✅') {
        const role = reaction.message.guild.roles.cache.get('1065691095503224944');
        const member = reaction.message.guild.members.cache.get(user.id);
        if(role && member) {
            member.roles.add(role);
        }
    }
});

Client.on("interactionCreate", interaction => {
    if(interaction.isCommand()){
        if (interaction.commandName === "aide"){  
            interaction.reply("Bonjour, les commandes utilisables sont /ping et /aide !");
            }    
        }
    }
 );

Client.login(process.env.TOKEN);
