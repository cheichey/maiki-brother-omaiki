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
import { collectionToArray } from './utils/collectionToArray';
import { chooseRandomElement } from '../utils/chooseRandomElement';

@Injectable()
export class CustomService {
  public async start(interaction: CommandInteraction): Promise<string> {
    // ボイスチャットにいるメンバー
    const voiceMembers = await getVoiceChannelGuildMembers(interaction);
    // ボイスチャットにいるメンバーの数
    const numberOfPeople = await getNumberOfJoinedVoiceChannelPeople(
      interaction,
    );
    if (numberOfPeople < 1)
      return 'ボイスチャットに人がいないか、人数が足りないよ！';
    // チーム分けメッセージ
    const messages = await getMessagesByInteraction(interaction, 10);
    // チーム分けの部分のみ
    const teamMessage = getTeamSplittingMessage(messages);
    if (!teamMessage) return 'チーム分けのメッセージが見つからないよ！';
    // アタッカーとディフェンダーのid
    const { attacker, defender } = getIdFromTeamSplittingMessage(
      teamMessage,
      numberOfPeople,
    );
    const channels = getChannels(interaction);
    const voiceChannel = getVoiceChannels(channels, 3);
    voiceMembers.forEach((member) => {
      const id = member.id.slice(0, 17);
      console.log(attacker, defender, id);
      if (attacker.indexOf(id) != -1) {
        member.voice.setChannel(voiceChannel[0].id);
      } else if (defender.indexOf(id) != -1) {
        member.voice.setChannel(voiceChannel[1].id);
      } else {
        member.voice.setChannel(voiceChannel[2].id);
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
  public async chooseRandomMember(
    interaction: CommandInteraction,
  ): Promise<string> {
    const members = collectionToArray(
      await getVoiceChannelGuildMembers(interaction),
    );
    const one = chooseRandomElement(members, 1)[0];
    return one.user.username;
  }
}
