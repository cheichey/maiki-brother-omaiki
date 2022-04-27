import { Module } from '@nestjs/common';
import { VcService } from './vc.service';
import { DiscordModule } from '@discord-nestjs/core';
import { StartCommand } from './commands/start.command';
import { HelpCommand } from './commands/help.command';
import { FinishCommand } from './commands/finish.command';
@Module({
  imports: [DiscordModule.forFeature()],
  providers: [VcService, StartCommand, HelpCommand, FinishCommand],
})
export class VcModule {}
