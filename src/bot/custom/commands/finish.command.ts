import {
  Command,
  DiscordTransformedCommand,
  InjectDiscordClient,
  Payload,
  TransformedCommandExecutionContext,
  UseCollectors,
} from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { CustomService } from '../custom.service';
import { options } from '../../options';
import { checkIsInteraction } from '../../utils/checkIsInteraction';
import { Client, InteractionReplyOptions } from 'discord.js';
import { generateButton } from '../../utils/generateButton';
import { MessageButtonStyles } from 'discord.js/typings/enums';
import { generateRow } from '../../utils/generateRow';
import { WhichTeamWonInteractionCorrector } from '../interaction-collectors/which-team-won.interaction-corrector';

@Injectable()
@Command(options.finish)
@UseCollectors(WhichTeamWonInteractionCorrector)
export class FinishCommand implements DiscordTransformedCommand<any> {
  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
    private readonly vcService: CustomService,
  ) {}
  async handler(
    @Payload() dto: any,
    { interaction }: TransformedCommandExecutionContext,
  ): Promise<InteractionReplyOptions> {
    if (!checkIsInteraction(interaction)) return;
    await this.vcService.finish(interaction);
    const button1 = generateButton(
      'アタッカーの勝利',
      'attacker',
      MessageButtonStyles.SUCCESS,
    );
    const button2 = generateButton(
      'ディフェンダーの勝利',
      'defender',
      MessageButtonStyles.DANGER,
    );
    const row = generateRow(button1, button2);

    return {
      content: '勝ったチームを選択してね！',
      components: [row],
    };
  }
}
