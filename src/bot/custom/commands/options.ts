import { CommandOptions } from '@discord-nestjs/core';

export const options: { [key: string]: CommandOptions } = {
  start: {
    name: 'start',
    description: 'カスタム開始',
  },
  finish: {
    name: 'finish',
    description: 'カスタム終了',
  },
  help: {
    name: 'help',
    description: 'おまいきーげーみんぐ所属です',
  },
};
