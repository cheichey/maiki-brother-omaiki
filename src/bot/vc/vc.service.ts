import { Injectable } from '@nestjs/common';
import { GuildMember, Message } from 'discord.js';
import { getVoiceChannelGuildMembers } from './utils/getVoiceChannelGuildMembers';
import { getMessagesByMessage } from './utils/getMessagesByMessage';
import { getTeamSplittingMessage } from './utils/getTeamSplittingMessage';
import { getNumberOfJoinedVoiceChannelPeople } from './utils/getNumberOfJoinedVoiceChannelPeople';
import { getIdFromTeamSplittingMessage } from './utils/getIdFromTeamSplittingMessage';
import { getChannels } from './utils/getChannels';
import { getVoiceChannels } from './utils/getVoiceChannels';
import { replyMessage } from './utils/replyMessage';
import { getConnectingVoiceChannelGuildMember } from './utils/getConnectingVoiceChannelGuildMember';

@Injectable()
export class VcService {
  public async start(message: Message): Promise<Message> {
    // ボイスチャットに十分な人数がいるか確認
    const voiceMembers = await getVoiceChannelGuildMembers(message);
    const numberOfPeople = await getNumberOfJoinedVoiceChannelPeople(message);
    if (numberOfPeople < 1)
      return replyMessage(
        message,
        'ボイスチャットに人がいないか、人数が足りないよ！',
      );
    // チーム分けメッセージの取得y
    const messages = await getMessagesByMessage(message, 10);
    const teamMessage = getTeamSplittingMessage(messages);
    if (!teamMessage)
      return replyMessage(message, 'チーム分けのメッセージが見つからないよ！');
    // チーム分けメッセージからidの取得
    const { attacker, defender } = getIdFromTeamSplittingMessage(
      teamMessage,
      numberOfPeople,
    );
    const channels = getChannels(message);
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

    return replyMessage(message, 'ボイスチャンネルを移動したよ！');
  }
  public async finish(message: Message): Promise<Message> {
    const channels = getChannels(message);
    const oneOfVoiceChannel = getVoiceChannels(channels, 1)[0];
    const connectingMembers: Array<GuildMember> =
      getConnectingVoiceChannelGuildMember(channels);

    connectingMembers.forEach((member) => {
      member.voice.setChannel(oneOfVoiceChannel.id);
    });

    return replyMessage(message, '結果はおまいきの負け！');
  }
}
