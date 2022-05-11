import { Controller, Get } from '@nestjs/common';
import { InjectDiscordClient, On } from '@discord-nestjs/core';
import { Client } from 'discord.js';

@Controller('/bot')
export class BotController {
  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  @Get()
  getBot() {
    return 'GET /bot succeed';
  }

  @On('ready')
  setStatus() {
    this.client.user.setStatus('idle');
    this.client.user.setActivity({
      name: 'マイキーとコストコに行ってるお！まいきーです。',
    });
  }
}
