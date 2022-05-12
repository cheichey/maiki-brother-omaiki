import { Command, DiscordCommand, UseGuards } from '@discord-nestjs/core';
import { CommandInteraction } from 'discord.js';
import { EmojiService } from '../emoji.service';
import { Injectable } from '@nestjs/common';
import { options } from '../../options';
import { OnlyInGuildGuard } from '../../guards/only-in-guild.guard';

@Injectable()
@Command(options.omaiki)
@UseGuards(OnlyInGuildGuard)
export class OmaikiCommand implements DiscordCommand {
  constructor(private readonly emojiService: EmojiService) {}
  async handler(interaction: CommandInteraction): Promise<string> {
    return await this.emojiService.addEmoji(interaction);
  }
}
