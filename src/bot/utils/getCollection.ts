import { DataManager, Snowflake } from 'discord.js';

export const getDataArray = <T, K>(
  dataManager: DataManager<Snowflake, T, K>,
  num: number,
): T[] => {
  const dataArray = new Array<T>();
  dataManager.cache.forEach((data) => {
    if (dataArray.length < num) dataArray.push(data);
  });
  return dataArray;
};
