'use strict';

import championData from '../../media/data/en_US/champion.json';

const championMap = {};
const champions = championData.data;
const championKeys = Object.keys(champions);

// create a map of champion ids to names
for (let championName of championKeys) {
  championMap[champions[championName].key] = championName;
}

export function getItemImg(id) {
  return `media/img/item/${id}.png`;
}

export function getChampionName(id) {
  return championMap[id];
}

export function getChampionImg(name) {
  return `media/img/champion/${name}.png`;
}
