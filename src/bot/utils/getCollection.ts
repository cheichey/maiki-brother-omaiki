import { DataManager, Snowflake } from 'discord.js';
import { collectionToArray } from '../custom/utils/collectionToArray';

export const getDataArray = <T, K>(
  dataManager: DataManager<Snowflake, T, K>,
  num?: number,
): T[] => {
  if (!num) return collectionToArray(dataManager.cache);
  const dataArray = new Array<T>();
  dataManager.cache.forEach((data) => {
    if (dataArray.length < num) dataArray.push(data);
  });
  return dataArray;
};
