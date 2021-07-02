module.exports = {
  name: "reactionrole",
  description: "Set up a reaction role on message",
  async execute(message, args, Discord, client) {
    console.log('aa');



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

    const emoj = {
      mlEmoji: ["🤖", setRole.mlRole],
      webDevEmoji: ["💻", setRole.webDevRole],
      appDevEmoji: ["📱", setRole.appDev],
      uiEmoji: ["🌈", setRole.designRole],
      openSourceEmoji: ["🛡️", setRole.opensourceRole],
      coding: ["⌨", setRole.coderRole],
      iotEmoji: ["🛠️", setRole.iotRole],
      backendDevEmoji: ["🔧", setRole.backendRole],
    };

    let embed = new Discord.MessageEmbed()
      .setColor("#e42646")
      .setTitle("Choose your stacks")
      .setDescription(
        "React to the corresponding emojis to get your roles.\n\n" +
          `${emoj.mlEmoji[0]} - data-science-ml \n` +
          `${emoj.webDevEmoji[0]} - web-development \n` +
          `${emoj.appDevEmoji[0]} - app-development \n` +
          `${emoj.uiEmoji[0]} - design-ui-ux \n` +
          `${emoj.openSourceEmoji[0]} - open-source \n` +
          `${emoj.coding[0]} - coding \n` +
          `${emoj.backendDevEmoji[0]} - backend-dev \n` +
          `${emoj.iotEmoji[0]} - hardware-iot \n`
      );

    let messageEmbed = await message.channel.send(embed);

    function getKeyByValue(object, value) {
      return Object.keys(object).find((key) => object[key][0] === value);
    }

    messageEmbed.react(emoj.mlEmoji[0]);
    messageEmbed.react(emoj.webDevEmoji[0]);
    messageEmbed.react(emoj.appDevEmoji[0]);
    messageEmbed.react(emoj.uiEmoji[0]);
    messageEmbed.react(emoj.openSourceEmoji[0]);
    messageEmbed.react(emoj.coding[0]);
    messageEmbed.react(emoj.backendDevEmoji[0]);
    messageEmbed.react(emoj.iotEmoji[0]);

    async function addrct(role, reaction, user) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add(emoj[role][1]);
    }
    async function rmvrct(role, reaction, user) {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove(emoj[role][1]);
    }
    const addReaction = {
      add: addrct,
      remove: rmvrct,
    };

    client.on("messageReactionAdd", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id === channel) {
        if (reaction.emoji.name) {
          await addReaction["add"](
            getKeyByValue(emoj, reaction.emoji.name),
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
          await addReaction["remove"](
            getKeyByValue(emoj, reaction.emoji.name),
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
