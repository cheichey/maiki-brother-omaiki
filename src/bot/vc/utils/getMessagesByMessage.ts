import { Message } from 'discord.js';

export const getMessagesByMessage = async (message: Message, limit: number) => {
  return await message.channel.messages.fetch({
    before: message.id,
    limit,
  });
};
