import { Command, DiscordCommand, UseGuards } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { CustomService } from '../custom.service';
import { options } from '../../options';
import { CommandInteraction } from 'discord.js';
import { GuildCommandGuard } from '../../guards/guild-command.guard';

@Injectable()
@Command(options.start)
@UseGuards(GuildCommandGuard)
export class StartCommand implements DiscordCommand {
  constructor(private readonly vcService: CustomService) {}
  handler(interaction: CommandInteraction): Promise<string> {
    return this.vcService.start(interaction);
  }
}
