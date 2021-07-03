module.exports = {
  name: "reactionrole",
  description: "Set up a reaction role on message",
  async execute(message, args, Discord, client) {
    const channel = process.env.CHANNEL_ID;

    function setRoleHandler(data) {
      return message.guild.roles.cache.find((role) => role.name === data);
    }
    const setRole = {
      mlRole: setRoleHandler("data-science-ml"),
      webDevRole: setRoleHandler("web-development"),
      appDev: setRoleHandler("app-development"),
      designRole: setRoleHandler("design-ui-ux"),
      opensourceRole: setRoleHandler("open-source"),
      coderRole: setRoleHandler("coding"),
      backendRole: setRoleHandler("backend-dev"),
      iotRole: setRoleHandler("hardware-iot"),
    };

    const emojis = {
      mlEmoji: ["🤖", setRole.mlRole],
      webDevEmoji: ["💻", setRole.webDevRole],
      appDevEmoji: ["📱", setRole.appDev],
      uiEmoji: ["🌈", setRole.designRole],
      openSourceEmoji: ["🛡️", setRole.opensourceRole],
      coding: ["⌨", setRole.coderRole],
      backendDevEmoji: ["🔧", setRole.backendRole],
      iotEmoji: ["🛠️", setRole.iotRole],
    };

    let embed = new Discord.MessageEmbed()
      .setColor("#e42646")
      .setTitle("Choose your stacks")
      .setDescription(
        "React to the corresponding emojis to get your roles.\n\n" +
          `${emojis.mlEmoji[0]} - data-science-ml \n` +
          `${emojis.webDevEmoji[0]} - web-development \n` +
          `${emojis.appDevEmoji[0]} - app-development \n` +
          `${emojis.uiEmoji[0]} - design-ui-ux \n` +
          `${emojis.openSourceEmoji[0]} - open-source \n` +
          `${emojis.coding[0]} - coding \n` +
          `${emojis.backendDevEmoji[0]} - backend-dev \n` +
          `${emojis.iotEmoji[0]} - hardware-iot \n`
      );

    let messageEmbed = await message.channel.send(embed);

    function getKeyByValue(object, value) {
      return Object.keys(object).find((key) => object[key][0] === value);
    }

    for (const key in emojis) {
      if (emojis.hasOwnProperty(key)) {
        messageEmbed.react(emojis[key][0]);
      }
    }

    async function addReaction(role, reaction, user) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add(emojis[role][1]);
    }
    async function removeReaction(role, reaction, user) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove(emojis[role][1]);
    }
    const reactionController = {
      add: addReaction,
      remove: removeReaction,
    };

    client.on("messageReactionAdd", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id === channel) {
        if (reaction.emoji.name) {
          await reactionController["add"](
            getKeyByValue(emojis, reaction.emoji.name),
            reaction,
            user
          );
        } else {
          return;
        }
      }
    });
    client.on("messageReactionRemove", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id === channel) {
        if (reaction.emoji.name) {
          await reactionController["remove"](
            getKeyByValue(emojis, reaction.emoji.name),
            reaction,
            user
          );
        } else {
          return;
        }
      }
    });
  },
};
