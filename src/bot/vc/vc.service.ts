import { Injectable } from '@nestjs/common';
import { Collection, GuildMember, Message } from 'discord.js';

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
      limit: 4,
    });

    //チーム分けメッセージの抽出
    const teamMessage = messages
      .filter((message) => message.cleanContent.indexOf('Attacker Side') != -1)
      .last().content;

    const ids = teamMessage
      .match(/@(\d{18})/g)
      .map((message) => message.slice(1, 18));

    const length = ids.length;
    if (length < 1) {
      return message.reply('人数が足りません');
    }

    const attacker = ids.splice(0, length / 2);
    const defender = ids;

    const channels = message.guild.channels.cache;

    const voiceChannelId = new Array<string>();
    channels.forEach((channel) => {
      if (channel.type == 'GUILD_VOICE') {
        voiceChannelId.push(channel.id);
      }
    });

    voiceMembers.forEach((member) => console.log(member.id));
    console.log(attacker, defender);

    voiceMembers.forEach((member) => {
      const id = member.id.slice(0, 17);
      if (attacker.indexOf(id) != -1) {
        console.log('attacker', member.id);
        member.voice.setChannel(voiceChannelId.pop());
      }
      if (defender.indexOf(id) != -1) {
        console.log('defender', member.id);
        member.voice.setChannel(voiceChannelId.pop());
      }
    });

    return message.reply('ボイスチャンネルを移動しました');
  }
}
