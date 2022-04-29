import { getVoiceChannelGuildMembers } from './getVoiceChannelGuildMembers';
import { CommandInteraction } from 'discord.js';

export const getNumberOfJoinedVoiceChannelPeople = async (
  interaction: CommandInteraction,
): Promise<number> => {
  const members = await getVoiceChannelGuildMembers(interaction);
  let size: number;
  try {
    size = members.size;
  } catch (e) {
    return null;
  }
  return size;
};
