import {
  Command,
  DiscordTransformedCommand,
  Payload,
  TransformedCommandExecutionContext,
} from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { CustomService } from '../custom.service';
import { options } from '../../options';

@Injectable()
@Command(options.now)
export class NowCommand implements DiscordTransformedCommand<any> {
  constructor(private readonly customService: CustomService) {}
  handler(
    @Payload() dto: any,
    { interaction }: TransformedCommandExecutionContext,
  ): string {
    return this.customService.getNow();
  }
}
