import {
  Command,
  DiscordTransformedCommand,
  Payload,
  TransformedCommandExecutionContext,
} from '@discord-nestjs/core';
import { getNumberOfJoinedVoiceChannelPeople } from '../utils/getNumberOfJoinedVoiceChannelPeople';
import { options } from '../../options';
import { checkIsInteraction } from '../../utils/checkIsInteraction';

@Command(options.random)
export class RandomCommand implements DiscordTransformedCommand<any> {
  async handler(
    @Payload() dto: any,
    { interaction }: TransformedCommandExecutionContext,
  ): Promise<string> {
    if (!checkIsInteraction(interaction)) return;
    const numberOfMember = await getNumberOfJoinedVoiceChannelPeople(
      interaction,
    );
    return (Math.random() % numberOfMember).toString();
  }
}
