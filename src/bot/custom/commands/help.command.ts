import { Command, CommandOptions, DiscordCommand } from '@discord-nestjs/core';
import { options } from '../../options';

@Command(options.help)
export class HelpCommand implements DiscordCommand {
  handler(): string {
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
