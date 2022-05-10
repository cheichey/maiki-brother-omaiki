import {
  Command,
  CommandOptions,
  DiscordTransformedCommand,
  Payload,
  TransformedCommandExecutionContext,
} from '@discord-nestjs/core';
import { CommandInteraction } from 'discord.js';
import { options } from './options';

@Command(options.help)
export class HelpCommand implements DiscordTransformedCommand<any> {
  handler(
    @Payload() dto: any,
    { interaction }: TransformedCommandExecutionContext,
  ): string {
    if (!(interaction instanceof CommandInteraction)) return;
    const message = (option: { [k: string]: CommandOptions }): string => {
      return Object.keys(option)
        .map((value) => {
          return (
            '`/' +
            options?.[value].name +
            '`' +
            '\t**' +
            options?.[value].description +
            '**\n'
          );
        })
        .toString()
        .replaceAll(',', '');
    };
    return message(options);
  }
}
