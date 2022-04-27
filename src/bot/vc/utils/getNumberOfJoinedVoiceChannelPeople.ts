import { getVoiceChannelGuildMembers } from './getVoiceChannelGuildMembers';
import { Message } from 'discord.js';

export const getNumberOfJoinedVoiceChannelPeople = async (
  message: Message,
): Promise<number> => {
  const members = await getVoiceChannelGuildMembers(message);
  let size: number;
  try {
    size = members.size;
  } catch (e) {
    return null;
  }
  return size;
};
