'use strict';

const kayn = require('../utils/kayn.js');

module.exports = async function summoner(name, cursor) {
  try {
    return await kayn().SummonerV4.by.name(name);
  } catch (err) {
    return err;
  }
};
