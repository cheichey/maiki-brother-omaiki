import { Module } from '@nestjs/common';
import { VcModule } from './bot/vc/vc.module';
import { DiscordModule } from '@discord-nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Intents } from 'discord.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        token: configService.get('TOKEN'),
        discordClientOptions: {
          intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_VOICE_STATES,
          ],
        },
        prefix: configService.get('PREFIX'),
      }),
      inject: [ConfigService],
    }),
    VcModule,
  ],
})
export class AppModule {}
