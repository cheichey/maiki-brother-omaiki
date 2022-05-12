import { Command, DiscordCommand, UseGuards } from '@discord-nestjs/core';
import { options } from '../../options';
import { Injectable } from '@nestjs/common';
import { CustomService } from '../custom.service';
import { OnlyInGuildGuard } from '../../guards/only-in-guild.guard';
import { CommandInteraction } from 'discord.js';

@Injectable()
@Command(options.random)
@UseGuards(OnlyInGuildGuard)
export class RandomCommand implements DiscordCommand {
  constructor(private customService: CustomService) {}
  async handler(interaction: CommandInteraction): Promise<string> {
    return this.customService.chooseRandomMember(interaction);
  }
}
