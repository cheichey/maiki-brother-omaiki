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
  name: 'finish',
  description: 'カスタム終了',
})
export class FinishCommand implements DiscordTransformedCommand<any> {
  constructor(private readonly vcService: VcService) {}
  handler(
    @Payload() dto: any,
    { interaction }: TransformedCommandExecutionContext,
  ): Promise<string> {
    if (!(interaction instanceof CommandInteraction)) return;
    return this.vcService.finish(interaction);
  }
}
