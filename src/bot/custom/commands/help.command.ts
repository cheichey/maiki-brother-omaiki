import {
  Command,
  DiscordTransformedCommand,
  Payload,
  TransformedCommandExecutionContext,
} from '@discord-nestjs/core';
import { CommandInteraction } from 'discord.js';

@Command({
  name: 'help',
  description: 'おまいきーげーみんぐ所属です',
})
export class HelpCommand implements DiscordTransformedCommand<any> {
  handler(
    @Payload() dto: any,
    { interaction }: TransformedCommandExecutionContext,
  ): string {
    if (!(interaction instanceof CommandInteraction)) return;
    return 'おまいきーゲーミング所属 barce です。こんにちは。';
  }
}
