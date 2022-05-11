import { InteractionEventCollector, On } from '@discord-nestjs/core';
import { ButtonInteraction } from 'discord.js';

@InteractionEventCollector({
  time: 15000,
})
export class WhichTeamWonInteractionCorrector {
  @On('collect')
  async onCollect(interaction: ButtonInteraction) {
    let message;
    switch (interaction.customId) {
      case 'attacker':
        message = '***アタッカーの勝利！***';
        break;
      case 'defender':
        message = '***おまいきーげーみんぐ・おまいきの負け！***　ぬーぶ！ｗｗ';
        break;
    }
    await interaction.update({ content: message, components: [] });
  }
}
