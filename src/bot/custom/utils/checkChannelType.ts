import { Channel } from 'discord.js';

export const checkChannelType = (channel: Channel, type: Channel['type']) => {
  return channel.type === type;
};
