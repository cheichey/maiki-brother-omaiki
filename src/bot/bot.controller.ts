import { Controller, Get } from '@nestjs/common';
import { InjectDiscordClient, On } from '@discord-nestjs/core';
import { Client } from 'discord.js';
import { BotService } from './bot.service';

@Controller('/bot')
export class BotController {
  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
    private readonly botService: BotService,
  ) {}

  @Get()
  getBot() {
    return 'GET /bot succeed';
  }

  @On('ready')
  setStatus() {
    this.botService.setStatus(this.client);
  }
}
