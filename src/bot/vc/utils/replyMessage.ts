import { Message } from 'discord.js';

export const replyMessage = async (
  message: Message,
  text,
): Promise<Message> => {
  return await message.reply(text);
};
