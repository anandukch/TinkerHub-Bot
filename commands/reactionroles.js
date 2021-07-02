module.exports = {
    name: 'reactionrole',
    description: 'Set up a reaction role on message',
    async execute(message, args, Discord, client) {
        const channel = process.env.CHANNEL_ID;
        const mlRole = message.guild.roles.cache.find(
            (role) => role.name === 'data-science-ml'
        );
        const webDevRole = message.guild.roles.cache.find(
            (role) => role.name === 'web-development'
        );
        const appDev = message.guild.roles.cache.find(
            (role) => role.name === 'app-development'
        );
        const designRole = message.guild.roles.cache.find(
            (role) => role.name === 'design-ui-ux'
        );
        const opensourceRole = message.guild.roles.cache.find(
            (role) => role.name === 'open-source'
        );
        const coderRole = message.guild.roles.cache.find(
            (role) => role.name === 'coding'
        );
        const backendRole = message.guild.roles.cache.find(
            (role) => role.name === 'backend-dev'
        );
        const iotRole = message.guild.roles.cache.find(
            (role) => role.name === 'hardware-iot'
        );

        const mlEmoji = '🤖';
        const webDevEmoji = '💻';
        const appDevEmoji = '📱';
        const uiEmoji = '🌈';
        const openSourceEmoji = '🛡️';
        const coding = '⌨';
        const iotEmoji='🛠️';
        const backendDevEmoji='🔧';

        let embed = new Discord.MessageEmbed()
            .setColor('#e42646')
            .setTitle('Choose your interested topics')
            .setDescription(
                'React to the corresponding emojis to get your roles.\n\n' +
                    `${mlEmoji } - data-science-ml \n` +
                    `${webDevEmoji } - web-development \n` +
                    `${appDevEmoji } - app-development \n` +
                    `${uiEmoji } - design-ui-ux \n` +
                    `${openSourceEmoji } - open-source \n` +
                    `${coding } - coding \n`+
                    `${backendDevEmoji } - backend-dev \n`+
                    `${iotEmoji } - hardware-iot \n`

            );

        let messageEmbed = await message.channel.send(embed);

        messageEmbed.react(mlEmoji);
        messageEmbed.react(webDevEmoji);
        messageEmbed.react(appDevEmoji);
        messageEmbed.react(uiEmoji);
        messageEmbed.react(openSourceEmoji);
        messageEmbed.react(coding);
        messageEmbed.react(backendDevEmoji);
        messageEmbed.react(iotEmoji);




        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id === channel) {
                if (reaction.emoji.name === mlEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.add(mlRole);
                }
                if (reaction.emoji.name === webDevEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.add(webDevRole);
                }
                if (reaction.emoji.name === appDevEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.add(appDev);
                }
                if (reaction.emoji.name === uiEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.add(designRole);
                }
                if (reaction.emoji.name === openSourceEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.add(opensourceRole);
                }
                if (reaction.emoji.name === coding) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.add(coderRole);
                }
                if (reaction.emoji.name === backendDevEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.add(backendRole);
                }
                 if (reaction.emoji.name === iotEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.add(iotRole);
                }  else {
                    return;
                }
            }
        });
        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id === channel) {
                if (reaction.emoji.name === mlEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(mlRole);
                }
                if (reaction.emoji.name === webDevEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(webDevRole);
                }
                if (reaction.emoji.name === appDevEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(appDev);
                }
                if (reaction.emoji.name === uiEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(designRole);
                }
                if (reaction.emoji.name === openSourceEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(opensourceRole);
                }
                if (reaction.emoji.name === coding) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(coderRole);
                }
                if (reaction.emoji.name === backendDevEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(backendRole);
                }
                 if (reaction.emoji.name === iotEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove(iotRole);
                }  else {
                    return;
                }
            }
        });
    },
};
