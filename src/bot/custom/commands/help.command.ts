import {
  Command,
  CommandOptions,
  DiscordTransformedCommand,
  Payload,
  TransformedCommandExecutionContext,
} from '@discord-nestjs/core';
import { options } from '../../options';
import { checkIsInteraction } from '../../utils/checkIsInteraction';

@Command(options.help)
export class HelpCommand implements DiscordTransformedCommand<any> {
  handler(
    @Payload() dto: any,
    { interaction }: TransformedCommandExecutionContext,
  ): string {
    if (!checkIsInteraction(interaction)) return;
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
