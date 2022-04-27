import { Collection } from 'discord.js';

export const collectionToArray = <T>(
  collection: Collection<string, T>,
): T[] => {
  const array = new Array<T>();
  collection.forEach((element) => {
    array.push(element);
  });
  return array;
};
