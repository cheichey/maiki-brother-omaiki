import { MessageButton, MessageButtonStyleResolvable } from 'discord.js';

export const generateButton = (
  label: string,
  customId: string,
  style: MessageButtonStyleResolvable,
): MessageButton => {
  return new MessageButton()
    .setLabel(label)
    .setCustomId(customId)
    .setStyle(style);
};
