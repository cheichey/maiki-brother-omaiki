import { Controller } from '@nestjs/common';
import { Client, Message } from 'discord.js';
import { VcService } from './vc.service';
import { InjectDiscordClient, Once, PrefixCommand } from '@discord-nestjs/core';
@Controller()
export class VcController {
  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
    private vcService: VcService,
  ) {}

  @Once('ready')
  async ready() {
    console.log('ready');
    await this.client.application.commands.set();
  }
  @PrefixCommand('help')
  async onHelp(message: Message) {
    return message.reply('omaiki');
  }

  @PrefixCommand('start')
  async onStart(message: Message) {
    this.vcService.start(message);
  }
  @PrefixCommand('finish')
  async onFinish(message: Message) {
    this.vcService.finish(message);
  }
}
