import { Module } from '@nestjs/common';
import { CustomService } from './custom.service';
import { DiscordModule } from '@discord-nestjs/core';
import { StartCommand } from './commands/start.command';
import { HelpCommand } from './commands/help.command';
import { FinishCommand } from './commands/finish.command';
import { RandomCommand } from './commands/random.command';
@Module({
  imports: [DiscordModule.forFeature()],
  providers: [
    CustomService,
    StartCommand,
    HelpCommand,
    FinishCommand,
    RandomCommand,
  ],
})
export class CustomModule {}
