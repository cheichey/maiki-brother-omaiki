import { Injectable } from '@nestjs/common';
import { CommandInteraction, GuildMember } from 'discord.js';
import { getVoiceChannelGuildMembers } from './utils/getVoiceChannelGuildMembers';
import { getMessagesByInteraction } from './utils/getMessagesByInteraction';
import { getTeamSplittingMessage } from './utils/getTeamSplittingMessage';
import { getNumberOfJoinedVoiceChannelPeople } from './utils/getNumberOfJoinedVoiceChannelPeople';
import { getIdFromTeamSplittingMessage } from './utils/getIdFromTeamSplittingMessage';
import { getChannels } from './utils/getChannels';
import { getVoiceChannels } from './utils/getVoiceChannels';
import { getConnectingVoiceChannelGuildMember } from './utils/getConnectingVoiceChannelGuildMember';

@Injectable()
export class VcService {
  public async start(interaction: CommandInteraction): Promise<string> {
    // ボイスチャットに十分な人数がいるか確認
    const voiceMembers = await getVoiceChannelGuildMembers(interaction);
    const numberOfPeople = await getNumberOfJoinedVoiceChannelPeople(
      interaction,
    );
    if (numberOfPeople < 1)
      return 'ボイスチャットに人がいないか、人数が足りないよ！';
    // チーム分けメッセージの取得
    const messages = await getMessagesByInteraction(interaction, 10);
    const teamMessage = getTeamSplittingMessage(messages);
    if (!teamMessage) return 'チーム分けのメッセージが見つからないよ！';
    // チーム分けメッセージからidの取得
    const { attacker, defender } = getIdFromTeamSplittingMessage(
      teamMessage,
      numberOfPeople,
    );
    console.log(teamMessage, numberOfPeople);
    const channels = getChannels(interaction);
    const [attackerVoiceChannel, defenderVoiceChannel] = getVoiceChannels(
      channels,
      2,
    );
    voiceMembers.forEach((member) => {
      const id = member.id.slice(0, 17);
      if (attacker.indexOf(id) != -1) {
        member.voice.setChannel(attackerVoiceChannel.id);
      }
      if (defender.indexOf(id) != -1) {
        member.voice.setChannel(defenderVoiceChannel.id);
      }
    });

    return 'ボイスチャンネルを移動したよ！';
  }
  public async finish(interaction: CommandInteraction): Promise<string> {
    const channels = getChannels(interaction);
    const oneOfVoiceChannel = getVoiceChannels(channels, 1)[0];
    const connectingMembers: Array<GuildMember> =
      getConnectingVoiceChannelGuildMember(channels);

    connectingMembers.forEach((member) => {
      member.voice.setChannel(oneOfVoiceChannel.id);
    });

    return '結果はおまいきの負け！';
  }
}
