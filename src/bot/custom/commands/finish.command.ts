import {
  Command,
  DiscordCommand,
  InjectDiscordClient,
  UseCollectors,
  UseGuards,
} from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { CustomService } from '../custom.service';
import { options } from '../../options';
import {
  Client,
  CommandInteraction,
  InteractionReplyOptions,
} from 'discord.js';
import { generateButton } from '../../utils/generateButton';
import { MessageButtonStyles } from 'discord.js/typings/enums';
import { generateRow } from '../../utils/generateRow';
import { WhichTeamWonInteractionCorrector } from '../interaction-collectors/which-team-won.interaction-corrector';
import { OnlyInGuildGuard } from '../../guards/only-in-guild.guard';

@Injectable()
@Command(options.finish)
@UseCollectors(WhichTeamWonInteractionCorrector)
@UseGuards(OnlyInGuildGuard)
export class FinishCommand implements DiscordCommand {
  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
    private readonly vcService: CustomService,
  ) {}
  async handler(
    interaction: CommandInteraction,
  ): Promise<InteractionReplyOptions> {
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
