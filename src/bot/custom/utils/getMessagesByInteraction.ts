import { CommandInteraction } from 'discord.js';

export const getMessagesByInteraction = async (
  interaction: CommandInteraction,
  limit: number,
) => {
  return await interaction.channel.messages.fetch({
    before: interaction.id,
    limit,
  });
};
