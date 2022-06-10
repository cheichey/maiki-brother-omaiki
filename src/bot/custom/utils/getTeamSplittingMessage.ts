import { Collection, Message } from 'discord.js';

export const getTeamSplittingMessage = (
  messages: Collection<string, Message>,
): string | null => {
  let teamSplittingMessage;
  try {
    teamSplittingMessage = messages
      .filter((message) => message.cleanContent.indexOf('Attacker Side') != -1)
      .first().content;
  } catch (e) {
    return null;
  }

  return teamSplittingMessage;
};
