import {
  Command,
  DiscordTransformedCommand,
  Payload,
  TransformedCommandExecutionContext,
} from '@discord-nestjs/core';
import { CommandInteraction } from 'discord.js';
import { EmojiService } from '../emoji.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@Command({
  name: 'omaiki',
  description: '絵文字をたくさんつけます',
})
export class OmaikiCommand implements DiscordTransformedCommand<any> {
  constructor(private readonly emojiService: EmojiService) {}
  handler(
    @Payload() dto: any,
    { interaction }: TransformedCommandExecutionContext,
  ): Promise<string> {
    if (!(interaction instanceof CommandInteraction)) return;
    return this.emojiService.addEmoji(interaction);
  }
}
