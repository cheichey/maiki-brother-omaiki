import { Collection, CommandInteraction, GuildMember } from 'discord.js';

export const getVoiceChannelGuildMembers = async (
  interaction: CommandInteraction,
): Promise<Collection<string, GuildMember>> | null => {
  const member = interaction.member as GuildMember;
  let vcMembers;
  try {
    vcMembers = member.voice.channel.members;
  } catch (e) {
    return null;
  }
  return vcMembers;
};
