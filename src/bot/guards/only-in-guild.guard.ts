import { CommandInteraction } from 'discord.js';
import { DiscordGuard } from '@discord-nestjs/core';

export class OnlyInGuildGuard implements DiscordGuard {
  canActive(
    event: 'interactionCreate',
    [interaction]: [CommandInteraction],
  ): boolean | Promise<boolean> {
    if (!interaction.inGuild()) {
      interaction.reply(
        `\`/${interaction.commandName}\` はサーバー内でしか使用できないよ！`,
      );
      return false;
    } else return true;
  }
}
