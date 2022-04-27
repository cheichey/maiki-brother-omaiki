import { Controller } from '@nestjs/common';
import { Client, Message } from 'discord.js';
import { VcService } from './vc.service';
import { InjectDiscordClient, Once, PrefixCommand } from '@discord-nestjs/core';
import { commands } from './commands';
import { replyMessage } from './utils/replyMessage';
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
    Promise.all([
      this.client.application.commands.set(commands),
      this.client.user.setActivity({
        name: '探さないでください。おまいきーといっしょにコストコに行ってますngo',
      }),
    ]);
  }
  @PrefixCommand('help')
  async onHelp(message: Message) {
    replyMessage(message, 'おまいきーです！');
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
