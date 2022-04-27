import { Collection, GuildBasedChannel } from 'discord.js';
import { checkChannelType } from './checkChannelType';
import { collectionToArray } from './collectionToArray';

export const getVoiceChannels = (
  channels: Collection<string, GuildBasedChannel>,
  num?: number,
): GuildBasedChannel[] => {
  const voiceChannels = channels.filter((channel) =>
    checkChannelType(channel, 'GUILD_VOICE'),
  );
  return collectionToArray(voiceChannels).slice(0, num);
};
