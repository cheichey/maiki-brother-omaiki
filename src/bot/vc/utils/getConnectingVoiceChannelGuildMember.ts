import { Collection, GuildBasedChannel, GuildMember } from 'discord.js';
import { getVoiceChannels } from './getVoiceChannels';
import { collectionToArray } from './collectionToArray';

export const getConnectingVoiceChannelGuildMember = (
  channels: Collection<string, GuildBasedChannel>,
): GuildMember[] => {
  const voiceChannels = getVoiceChannels(channels);

  let members = new Collection<string, GuildMember>();
  voiceChannels.map((channel) => {
    if (!(channel.members instanceof Collection)) return;
    members = members.concat(channel.members);
  });

  return collectionToArray(members);
};
