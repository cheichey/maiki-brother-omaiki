import { CommandInteraction } from 'discord.js';

export const getChannels = (interaction: CommandInteraction) => {
  return interaction.guild.channels.cache;
};
