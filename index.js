const Discord = require("discord.js");
const mysql = require("mysql");
const { SlashCommandBuilder } = require("@discordjs/builders");
const prefix = "!";


const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
    ]
});

const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("renvoie pong")
    .addUserOption(option => option
        .setName("utilisateur")
        .setDescription("utilisateur de votre choix")
        .setRequired(false));

Client.on("ready", async () => { 
    Client.application.commands.create(data);
    Client.guilds.cache.get("929355712369405993").commands.create(data);
    
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
    Client.channels.cache.get("929469674431873024").send("<@" + member.id + "> est arrivé ! Bienvenue !");
    member.roles.add("929472551896367106");
});

Client.on("guildMemberRemove", member =>{
    console.log("un membre a quitté le serveur !");
    Client.channels.cache.get("929469674431873024").send(member.displayName + " nous a quitté ! ...");
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

Client.on("messageCreate", message => {
   if (message.author.bot) return;
if (message.content === prefix + "help"){
   const embed = new Discord.MessageEmbed()
       .setColor("00099ff")
       .setTitle("HUM HUM ! (Il s'agit de la liste des commandes)")
       .setURL("https://discord.js.org/")
       .setAuthor({ name: "Auteur du bot",iconURL: "https://demonslayer.fr/wp-content/uploads/2021/09/Nezuko-3.jpg",url: "https://discord.js.org/"})
       .setDescription("Une petite description")
       .setThumbnail("https://64.media.tumblr.com/0125643c0e5818ba16a689ea84a37d2e/tumblr_prpvfkPdVA1v6bs4yo4_r1_250.gif")
       .addField("!help","affiche la liste des commandes")
       .addField("!profil","votre profil")
       .addField("!collection", "votre collection de jeu")
       .setImage("https://64.media.tumblr.com/0125643c0e5818ba16a689ea84a37d2e/tumblr_prpvfkPdVA1v6bs4yo4_r1_250.gif")
       .setTimestamp()
       .setFooter({text: "A bientôt !", iconURL: "https://www.icegif.com/wp-content/uploads/nezuko-icegif.gif"});

   message.channel.send({ embeds: [embed] })
}



    message.channel.send("Humm Humm !");
    ping
    if (message.content === prefix + "ping"){
       message.reply("pong");
    }
    else if (message.content === prefix + "help"){
       message.channel.send("Humm Humm !");
    }
});

Client.login(process.env.TOKEN);
