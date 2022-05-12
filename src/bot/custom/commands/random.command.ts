import { Command, DiscordCommand, UseGuards } from '@discord-nestjs/core';
import { options } from '../../options';
import { Injectable } from '@nestjs/common';
import { CustomService } from '../custom.service';
import { GuildCommandGuard } from '../../guards/guild-command.guard';
import { CommandInteraction } from 'discord.js';

@Injectable()
@Command(options.random)
@UseGuards(GuildCommandGuard)
export class RandomCommand implements DiscordCommand {
  constructor(private customService: CustomService) {}
  async handler(interaction: CommandInteraction): Promise<string> {
    return this.customService.chooseRandomMember(interaction);
  }
}
