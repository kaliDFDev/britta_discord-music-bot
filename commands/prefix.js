module.exports = {
  name: "prefix",
  description: "Sets a new, custom prefix for the bot",
  category: "info",
  execute(message, args) {
    console.log(message.member.user);
    var currentPrefix = message.client.prefix.get(message.guild.id);
    // message.channel.send({
    //   embed: {
    //     color: message.client.messageEmbedData.color,
    //     author: {
    //       name: "🛠️ This feature is still in progress",
    //       icon_url: message.client.user.avatarURL(),
    //     },
    //     timestamp: new Date(),
    //     footer: {
    //       text: "© Britta",
    //     },
    //   },
    // });
    if (args.length >= 2) {
      if (
        message.member.hasPermission("MOVE_MEMBERS") ||
        message.client.admins.filter(
          (admin) => admin.id == message.member.user.id
        ).length == 1
      ) {
        var newPrefix = args[1].trim();
        message.client.prefix.set(message.guild.id, newPrefix);
        if (
          message.client.admins.filter(
            (admin) => admin.id == message.member.user.id
          ).length == 1
        ) {
          message.channel.send({
            embed: {
              color: message.client.messageEmbedData.color,
              author: {
                name:
                  "✔️ Prefix set to: " +
                  newPrefix +
                  " by " +
                  message.member.user.username +
                  " (" +
                  message.client.NAME +
                  " Developer)",
              },
              timestamp: new Date(),
              footer: {
                text: "© Britta",
              },
            },
          });
        } else {
          message.channel.send({
            embed: {
              color: message.client.messageEmbedData.color,
              author: {
                name: "✔️ Prefix set to: `" + newPrefix + "`",
              },
              timestamp: new Date(),
              footer: {
                text: "© Britta",
              },
            },
          });
        }
      } else {
        message.channel.send({
          embed: {
            color: message.client.messageEmbedData.color,
            author: {
              name: "❗ You don't have permissions to set a new prefix",
              icon_url: message.author.avatarURL(),
            },
            timestamp: new Date(),
            footer: {
              text: "© Britta",
            },
          },
        });
      }
    } else {
      if (!currentPrefix) {
        currentPrefix = message.client.PREFIX;
      }
      message.channel.send({
        embed: {
          color: message.client.messageEmbedData.color,
          author: {
            name: "💬 The current prefix is:",
          },
          description: "`" + currentPrefix + "`",
          timestamp: new Date(),
          footer: {
            text: "© Britta",
          },
        },
      });
    }
  },
};
