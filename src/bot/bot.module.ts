import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { VcModule } from './vc/vc.module';
@Module({
  imports: [VcModule],
  controllers: [BotController],
})
export class BotModule {}
