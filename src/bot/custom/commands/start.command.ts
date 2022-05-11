import {
  Command,
  DiscordTransformedCommand,
  Payload,
  TransformedCommandExecutionContext,
} from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { CustomService } from '../custom.service';
import { options } from '../../options';
import { checkIsInteraction } from '../../utils/checkIsInteraction';

@Injectable()
@Command(options.start)
export class StartCommand implements DiscordTransformedCommand<any> {
  constructor(private readonly vcService: CustomService) {}
  handler(
    @Payload() dto: any,
    { interaction }: TransformedCommandExecutionContext,
  ): Promise<string> {
    if (!checkIsInteraction(interaction)) return;
    return this.vcService.start(interaction);
  }
}
