import { Injectable } from '@nestjs/common';
import { CommandInteraction } from 'discord.js';
import { getMessagesByInteraction } from '../vc/utils/getMessagesByInteraction';
import { getDataArray } from '../utils/getCollection';

@Injectable()
export class EmojiService {
  public async addEmoji(interaction: CommandInteraction) {
    const messages = await getMessagesByInteraction(interaction, 1);
    const message = messages.first();
    const emojis = getDataArray(interaction.guild.emojis, 10);
    for (const emoji of emojis) {
      message.react(emoji);
    }
    return 'おまいき';
  }
}
