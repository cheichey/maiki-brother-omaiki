import {
  MessageActionRow,
  MessageActionRowComponentResolvable,
} from 'discord.js';

export const generateRow = (
  ...elements:
    | MessageActionRowComponentResolvable[]
    | MessageActionRowComponentResolvable[][]
) => {
  return new MessageActionRow().addComponents(...elements);
};
