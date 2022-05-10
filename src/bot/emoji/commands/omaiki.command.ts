import {
  Command,
  DiscordTransformedCommand,
  Payload,
  TransformedCommandExecutionContext,
} from '@discord-nestjs/core';
import { CommandInteraction } from 'discord.js';
import { EmojiService } from '../emoji.service';
import { Injectable } from '@nestjs/common';
import { options } from '../../options';

@Injectable()
@Command(options.omaiki)
export class OmaikiCommand implements DiscordTransformedCommand<any> {
  constructor(private readonly emojiService: EmojiService) {}
  handler(
    @Payload() dto: any,
    { interaction }: TransformedCommandExecutionContext,
  ): Promise<void> {
    if (!(interaction instanceof CommandInteraction)) return;
    this.emojiService.addEmoji(interaction);
  }
}
