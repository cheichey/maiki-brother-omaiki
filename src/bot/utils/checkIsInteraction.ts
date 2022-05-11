import { CommandInteraction, ContextMenuInteraction } from 'discord.js';

export const checkIsInteraction = (
  interaction: CommandInteraction | ContextMenuInteraction,
): interaction is CommandInteraction => {
  return interaction instanceof CommandInteraction;
};
