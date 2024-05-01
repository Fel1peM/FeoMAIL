/*

 ======================= •AVISO• ======================= 
 | Se você ainda não sabe como codificar um bot do discord,|
 | por favor, não mexa neste arquivo! (exceto CONFIG.JSON  |
 | e EMOJIS.JSON).                                        |
 | Leia SETUP.MD para obter ajuda!                         |
 =========================================================

*/

// Pacotes necessários
const { Client } = require("discord.js");
const keepAlive = require('./server.js');
const client = new Client({
  disableEveryone: true
});

// Mantenha-se ativo e faça login no bot
keepAlive();
client.login(process.env.TOKEN);

// Requisitos
const discord = require("discord.js");
const { prefix, ServerID, EmbedColor, OpenEmbedColor, CloseEmbedColor, EmbedFooter, StatusText, StatusType, ModMailCategoryName, StatusURL, BotName, ModeratorRole, ServerName } = require("./config.json")
const {WarningEmoji, SuccessEmoji, WrongEmoji} = require("./emojis.json")
const config = require('./config.json');

// Bot pronto
client.on("ready", () => {
  // Mensagem de configuração do console
  console.log('\x1b[0m\x1b[32m%s\x1b[0m', '[SERVER] Server.js está pronto!');
  console.log('\x1b[32m%s\x1b[0m', '[CLIENTE] Bot está online!');
  // Status do bot  
})

// Status
client.on("ready", () => {
    client.user.setActivity(`${StatusText}`, { type: `${StatusType}`, url:`${StatusURL}`})
})
//

client.on("message", msg => {
  if(msg.content === `${prefix}ping`){
    msg.channel.send(`<@${msg.author.id}>,`, {embed: 
            {color: "VERDE",
            description: `Pong! **${client.ws.ping}**`
            }})

    }
  }
)

client.on("message", msg => {
  if(msg.content === `comandoSecreto69420TFA`){
    msg.channel.send(`Você poderia não fazer isso?`)

    }
  }
)

// Código
client.on("channelDelete", (channel) => {
    if (channel.parentID == channel.guild.channels.cache.find((x) => x.name == `${ModMailCategoryName}`).id) {
        const pessoa = channel.guild.members.cache.find((x) => x.id == channel.name)

        if (!pessoa) return;

        let yembed = new discord.MessageEmbed()
            .setAuthor("MAIL FECHADO!", client.user.displayAvatarURL())
            .setColor(`${CloseEmbedColor}`)
            .setDescription(`${WarningEmoji} Por favor, não responda a esta mensagem até que você precise de mais ajuda!`)

        return pessoa.send(yembed)

    }


})


client.on("message", async message => {
    if (message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();


    if (message.guild) {

        if (command == "setup") {
            if (!message.content.startsWith(prefix)) return;
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                return message.channel.send({embed: 
            {color: "VERMELHO",
            description: `Você não tem permissão para usar este comando!`
            }})
            }

            if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
                return message.channel.send({embed: 
            {color: "VERMELHO",
            description: `Preciso da permissão necessária! **[ADMINISTRADOR]**`
            }})
            }


            let role = message.guild.roles.cache.find((x) => x.name == `${ModeratorRole}`)
            let everyone = message.guild.roles.cache.find((x) => x.name == "@everyone")

            if (!role) {
                role = await message.guild.roles.create({
                    data: {
                        name: "ModMail",
                        color: "AMARELO"
                    },
                    reason: "<:errado:1128201032850227231> Função necessária para o Sistema de ModMail!"
                })
            }

            await message.guild.channels.create(`${ModMailCategoryName}`, {
                type: "category",
                topic: "Todo o correio estará aqui",
                permissionOverwrites: [
                    {
                        id: role.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                    },
                    {
                        id: everyone.id,
                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                    }
                ]
            })


            return message.channel.send({embed: 
            {color: "VERMELHO",
            description: `${SuccessEmoji} A configuração está completa!\n\nCriada nova Categoria: **${ModMailCategoryName}**`
            }})

        } else if (command == "close") {
            if (!message.content.startsWith(prefix)) return;
            if (!message.member.roles.cache.find((x) => x.name == `${ModeratorRole}`)) {
                return message.channel.send({embed: 
            {color: "VERMELHO",
            description: `${WrongEmoji} Você precisa da função **${ModeratorRole}** para usar este comando!`
            }})
            }
            if (message.channel.parentID == message.guild.channels.cache.find((x) => x.name == `${ModMailCategoryName}`).id) {

                const pessoa = message.guild.members.cache.get(message.channel.name)

                if (!pessoa) {
                    return message.channel.send({embed: 
                    {color: "VERMELHO",
                    description: `${WrongEmoji} Este canal foi editado e não posso fechá-lo mais!`
                    }})
                }

                await message.channel.delete()

                let yembed = new discord.MessageEmbed()
                    .setAuthor(`${BotName}`, client.user.displayAvatarURL())
                    .setColor(`${CloseEmbedColor}`)
                    .addField("Fechado por:", `${message.author.tag}`)
                    .addField("Servidor:", ServerName)
                    .addField("Motivo:", `\`${args[0] || "[Nenhum motivo fornecido]"}\``)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setFooter(`${EmbedFooter}`)

                return pessoa.send(yembed)

            }
        } else if (command == "open") {
            if (!message.content.startsWith(prefix)) return;
            const category = message.guild.channels.cache.find((x) => x.name == `${ModMailCategoryName}`)

            if (!category) {
                return message.channel.send({embed: 
                    {color: "VERMELHO",
                    description: `${WrongEmoji} O bot ModMail não está configurado ainda! Por favor, leia o arquivo \`SETUP.md\` em seu projeto para a configuração completa!`
                    }})
            }

            if (!message.member.roles.cache.find((x) => x.name == `${ModeratorRole}`)) {
                return message.channel.send({embed: 
                    {color: "VERMELHO",
                    description: `${WrongEmoji} Você precisa da função **${ModeratorRole}** para usar este comando!`
                    }})
            }

            if (isNaN(args[0]) || !args.length) {
                return message.channel.send({embed: 
                    {color: "VERMELHO",
                    description: `${WrongEmoji} Por favor, forneça o ID do usuário!`
                    }})
            }

            const alvo = message.guild.members.cache.find((x) => x.id === args[0])

            if (!alvo) {
                return message.channel.send({embed: 
                    {color: "VERMELHO",
                    description: `${WrongEmoji} Pessoa inválida.`
                    }})
            }


            const canal = await message.guild.channels.create(alvo.id, {
                type: "text",
                parent: category.id,
                topic: "Mail é aberto diretamente por **" + message.author.username + "** para entrar em contato com " + message.author.tag
            })

            let nembed = new discord.MessageEmbed()
                .setAuthor("DETALHES", alvo.user.displayAvatarURL({ dynamic: true }))
                .setColor("#ff0037")
                .setThumbnail(alvo.user.displayAvatarURL({ dynamic: true }))
                .addField("• **Nome de usuário:**", alvo.user.username)
                .addField("• **ID do usuário:**", alvo.user.id)
                //.addField("• **Mensagem:**", message.content)
                .addField("• **Data de criação da conta:**", alvo.user.createdAt)
                //.addField("Contato direto", "Sim (significa que este e-mail é aberto por um membro da equipe)");

            canal.send(nembed)

            let uembed = new discord.MessageEmbed()
                .setAuthor("Mail Direto Criado:")
                .setColor(`${OpenEmbedColor}`)
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(`Ei <@${alvo.user.id}>, Um **${ServerName}**'s Staff criou um novo Mail Direto com você! Você pode digitar uma mensagem abaixo para enviar ao Staff.`)
                .addField("Staff:", message.author.tag)
                .setFooter(EmbedFooter);


            alvo.send(uembed);

            let newEmbed = new discord.MessageEmbed()
                .setDescription(`${SuccessEmoji} Canal de Mail Direto criado com sucesso!`)
                .addField("Canal:", `${canal}`)
                .addField("ID do canal:", `${canal.id}`)
                .addField("Usuário:", alvo.user.tag)
                .setColor(`${OpenEmbedColor}`);

            return message.channel.send(newEmbed);
        } else if (command == "help") {
            if (!message.content.startsWith(prefix)) return;
            let embed = new discord.MessageEmbed()
                .setColor(`${EmbedColor}`)
                .setAuthor(`${BotName}`)
                .setDescription(`Olá! Eu sou o **${BotName}**, o Bot de ModMail do Discord do **Fe1ipe**!\n\n**-Prefixo:** \`${prefix}\`\n**-Link do Grupo:** [Fe1ipe](https://discord.gg/BefFfekX)\n**-ID do Servidor:** \`${ServerID}\`.`)
                .setThumbnail(client.user.displayAvatarURL())
                .setFooter(`Caso precise de ajuda, chame um Staff!`);


            return message.channel.send(embed)

        }
    }







    if (message.channel.parentID) {

        const category = message.guild.channels.cache.find((x) => x.name == `${ModMailCategoryName}`)

        if (message.channel.parentID == category.id) {
            let member = message.guild.members.cache.get(message.channel.name)

            if (!member) return message.channel.send({embed: 
                    {color: "VERMELHO",
                    description: `${WrongEmoji} Não é possível enviar a mensagem.`
                    }})

            message.react("<:certo:1128201041683415081>")

            let lembed = new discord.MessageEmbed()
                .setColor(`${OpenEmbedColor}`)
                .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(message.content)

            return member.send(lembed)

            let msgembed = new discord.MessageEmbed()
              .setColor(`${OpenEmbedColor}`)
              .setDescription(`${SuccessEmoji} Mail aberto com sucesso!`)
        }


    }

    if (!message.guild) {
        const guild = await client.guilds.cache.get(ServerID) || await client.guilds.fetch(ServerID).catch(m => { })
        if (!guild) return;
        const category = guild.channels.cache.find((x) => x.name == `${ModMailCategoryName}`)
        if (!category) return;
        const main = guild.channels.cache.find((x) => x.name == message.author.id)


        if (!main) {
            let mx = await guild.channels.create(message.author.id, {
                type: "text",
                parent: category.id,
                topic: "Este mail é criado para ajudar **" + message.author.tag + " **"
            })

            message.react("<:certo:1128201041683415081>")

            let sembed = new discord.MessageEmbed()
                .setAuthor("Mail de Suporte Criado:")
                .setColor(`${OpenEmbedColor}`)
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(`A conversa agora começou, você será contatado pelos Moderadores do **${ServerName}** em breve...`)
                .setFooter(`${EmbedFooter}`)

            message.author.send(sembed)


            let eembed = new discord.MessageEmbed()
                .setAuthor("NOVA CONVERSA DE MODMAIL ABERTA!", message.author.displayAvatarURL({ dynamic: true }))
                .setColor("ff0037")
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                //.setDescription(message.content)
                .addField("**• Nome de usuário:**", message.author.username)
                .addField("• **Mensagem:**", message.content)
                .addField("**• Data de criação da conta:**", message.author.createdAt)
                .addField("**• ID do usuário:**", message.author.id)
                .setFooter(`${EmbedFooter}`)


            return mx.send(eembed)
        }

        let xembed = new discord.MessageEmbed()
            .setColor(`${CloseEmbedColor}`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(message.content)


        main.send(xembed)

    }




})

// Certifique-se de fazer login no bot:
client.login(process.env.TOKEN)
