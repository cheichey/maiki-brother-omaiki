import {
  Command,
  DiscordTransformedCommand,
  Payload,
  TransformedCommandExecutionContext,
} from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { CustomService } from '../custom.service';
import { CommandInteraction } from 'discord.js';
import { options } from '../../options';

@Injectable()
@Command(options.finish)
export class FinishCommand implements DiscordTransformedCommand<any> {
  constructor(private readonly vcService: CustomService) {}
  handler(
    @Payload() dto: any,
    { interaction }: TransformedCommandExecutionContext,
  ): Promise<string> {
    if (!(interaction instanceof CommandInteraction)) return;
    return this.vcService.finish(interaction);
  }
}
