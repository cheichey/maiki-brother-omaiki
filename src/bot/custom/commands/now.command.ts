import { Command, DiscordCommand } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { CustomService } from '../custom.service';
import { options } from '../../options';

@Injectable()
@Command(options.now)
export class NowCommand implements DiscordCommand {
  constructor(private readonly customService: CustomService) {}
  handler(): string {
    return this.customService.getNow();
  }
}
