import {
  Command,
  DiscordTransformedCommand,
  Payload,
  TransformedCommandExecutionContext,
} from '@discord-nestjs/core';
import { getNumberOfJoinedVoiceChannelPeople } from '../utils/getNumberOfJoinedVoiceChannelPeople';
import { CommandInteraction } from 'discord.js';
import { options } from '../../options';

@Command(options.random)
export class RandomCommand implements DiscordTransformedCommand<any> {
  async handler(
    @Payload() dto: any,
    { interaction }: TransformedCommandExecutionContext,
  ): Promise<string> {
    if (!(interaction instanceof CommandInteraction)) return;
    const numberOfMember = await getNumberOfJoinedVoiceChannelPeople(
      interaction,
    );
    return (Math.random() % numberOfMember).toString();
  }
}
