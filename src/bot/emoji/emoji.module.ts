import { Module } from '@nestjs/common';
import { EmojiService } from './emoji.service';
import { OmaikiCommand } from './commands/omaiki.command';
@Module({
  providers: [EmojiService, OmaikiCommand],
})
export class EmojiModule {}
