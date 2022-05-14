import { Injectable } from '@nestjs/common';
import { Client } from 'discord.js';

@Injectable()
export class BotService {
  setStatus(client: Client) {
    client.user.setStatus('idle');
    client.user.setActivity({
      name: 'マイキーとコストコに行ってるお！まいきーです。',
    });
  }
}
