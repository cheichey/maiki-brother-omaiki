import { Injectable } from '@nestjs/common';
import { CommandInteraction } from 'discord.js';
import { getMessagesByInteraction } from '../vc/utils/getMessagesByInteraction';
import { getDataArray } from '../utils/getCollection';
import { chooseRandomElement } from '../utils/chooseRandomElement';

@Injectable()
export class EmojiService {
  public async addEmoji(interaction: CommandInteraction) {
    const messages = await getMessagesByInteraction(interaction, 1);
    const message = messages.first();
    const emojis = getDataArray(interaction.guild.emojis);
    const randomEmojis = chooseRandomElement(emojis, 10);
    for (const emoji of randomEmojis) {
      message.react(emoji);
    }
    return 'おまいき';
  }
}
