import {
  Command,
  DiscordTransformedCommand,
  Payload,
  TransformedCommandExecutionContext,
} from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { VcService } from '../vc.service';
import { CommandInteraction } from 'discord.js';

@Injectable()
@Command({
  name: 'start',
  description: 'カスタム開始',
})
export class StartCommand implements DiscordTransformedCommand<any> {
  constructor(private readonly vcService: VcService) {}
  handler(
    @Payload() dto: any,
    { interaction }: TransformedCommandExecutionContext,
  ): Promise<string> {
    if (!(interaction instanceof CommandInteraction)) return;
    return this.vcService.start(interaction);
  }
}
