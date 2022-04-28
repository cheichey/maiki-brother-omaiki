import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { VcModule } from './vc/vc.module';
import { EmojiModule } from './emoji/emoji.module';
import { DiscordModule } from '@discord-nestjs/core';
@Module({
  imports: [VcModule, EmojiModule, DiscordModule.forFeature()],
  controllers: [BotController],
})
export class BotModule {}
