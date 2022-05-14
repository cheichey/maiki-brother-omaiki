import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { CustomModule } from './custom/custom.module';
import { EmojiModule } from './emoji/emoji.module';
import { DiscordModule } from '@discord-nestjs/core';
import { BotService } from './bot.service';
@Module({
  imports: [CustomModule, EmojiModule, DiscordModule.forFeature()],
  controllers: [BotController],
  providers: [BotService],
})
export class BotModule {}
