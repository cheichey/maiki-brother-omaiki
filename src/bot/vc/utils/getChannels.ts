import { Message } from 'discord.js';

export const getChannels = (message: Message) => {
  return message.guild.channels.cache;
};
