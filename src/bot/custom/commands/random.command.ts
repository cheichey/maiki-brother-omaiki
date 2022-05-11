import {
  Command,
  DiscordTransformedCommand,
  Payload,
  TransformedCommandExecutionContext,
} from '@discord-nestjs/core';
import { options } from '../../options';
import { checkIsInteraction } from '../../utils/checkIsInteraction';
import { Injectable } from '@nestjs/common';
import { CustomService } from '../custom.service';

@Injectable()
@Command(options.random)
export class RandomCommand implements DiscordTransformedCommand<any> {
  constructor(private customService: CustomService) {}
  async handler(
    @Payload() dto: any,
    { interaction }: TransformedCommandExecutionContext,
  ): Promise<string> {
    if (!checkIsInteraction(interaction)) return;
    return this.customService.chooseRandomMember(interaction);
  }
}
