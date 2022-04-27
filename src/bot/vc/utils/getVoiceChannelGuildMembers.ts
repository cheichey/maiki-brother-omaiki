import { Collection, GuildMember, Message } from 'discord.js';

export const getVoiceChannelGuildMembers = async (
  message: Message,
): Promise<Collection<string, GuildMember>> | null => {
  const member = await message.member.fetch(true);
  let vcMembers;
  try {
    vcMembers = member.voice.channel.members;
  } catch (e) {
    return null;
  }
  return vcMembers;
};
