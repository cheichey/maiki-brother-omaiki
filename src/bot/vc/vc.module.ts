import { Module } from '@nestjs/common';
import { VcService } from './vc.service';
import { VcController } from './vc.controller';
import { DiscordModule } from '@discord-nestjs/core';
@Module({
  imports: [DiscordModule.forFeature()],
  controllers: [VcController],
  providers: [VcService],
})
export class VcModule {}
