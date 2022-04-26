import { Injectable } from '@nestjs/common';
import { Collection, GuildMember, Message, Snowflake } from 'discord.js';

@Injectable()
export class VcService {
  public async start(message: Message): Promise<Message> {
    const member = await message.member.fetch(true);
    const voiceState = member.voice;
    let voiceMembers: Collection<string, GuildMember>;
    try {
      voiceMembers = voiceState.channel.members;
    } catch (e) {
      return message.reply('ボイスチャンネルに人がいません');
    }

    const messages = await message.channel.messages.fetch({
      before: message.id,
      limit: 10,
    });

    let teamMessage: string;
    try {
      //チーム分けメッセージの抽出
      teamMessage = messages
        .filter(
          (message) => message.cleanContent.indexOf('Attacker Side') != -1,
        )
        .last().content;
    } catch (e) {
      return message.reply('チーム分けのメッセージが見つかりません。');
    }

    const ids = teamMessage
      .match(/@(\d{18})/g)
      .map((message) => message.slice(1, 18));

    const length = ids.length;
    if (length < 1) {
      return message.reply('人数が足りません');
    }

    const defender = ids.splice(0, length / 2);
    const attacker = ids;

    const channels = message.guild.channels.cache;
    const voiceChannels = channels.filter(
      (channel) => channel.type == 'GUILD_VOICE',
    );
    const attackerVoiceChannelId = voiceChannels.first().id;
    const defenderVoiceChannelId = voiceChannels.last().id;

    voiceMembers.forEach((member) => console.log(member.id));
    console.log(attacker, defender);

    voiceMembers.forEach((member) => {
      const id = member.id.slice(0, 17);
      if (attacker.indexOf(id) != -1) {
        console.log('attacker', member.id);
        member.voice.setChannel(attackerVoiceChannelId);
      }
      if (defender.indexOf(id) != -1) {
        console.log('defender', member.id);
        member.voice.setChannel(defenderVoiceChannelId);
      }
    });

    return message.reply('ボイスチャンネルを移動しました');
  }
  public async finish(message: Message) {
    const channels = message.guild.channels;
    const voiceChannels = channels.cache.filter(
      (channel) => channel.type == 'GUILD_VOICE',
    );
    const oneOfVoiceChannelId = voiceChannels.first().id;
    const connectingVoiceChannelMembers = voiceChannels.map((channel) => {
      return channel.members;
    });

    const members = new Array<GuildMember>();

    connectingVoiceChannelMembers.forEach(
      (collection: Collection<Snowflake, GuildMember>) => {
        collection.forEach((member) => {
          members.push(member);
        });
      },
    );

    members.forEach((member) => {
      member.voice.setChannel(oneOfVoiceChannelId);
    });

    return message.reply('もどりました');
  }
}
