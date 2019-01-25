'use strict';
const { Kayn, REGIONS } = require('kayn')
const kayn = Kayn("RGAPI-f793fd88-15da-4aeb-95eb-4642105cc085");
const pageLength = 10;

module.exports = async function summoner(name, cursor) {
  let summonerInfo;

  try {
    summonerInfo = await kayn().SummonerV4.by.name(name);
  } catch (err) {
    return err;
  }

  try {
    const accountId = summonerInfo.accountId;
    const beginIndex = cursor || 0;
    const endIndex = beginIndex + pageLength;
    const query = {
      beginIndex: beginIndex,
      endIndex: endIndex,
    };
    const matchList = await kayn().MatchlistV4.by.accountID(accountId).query(query);

    return {
      matches: matchList.matches,
      cursor: endIndex,
    }
  } catch(err) {
    return {
      statusCode: 500,
      message: 'Server was unable to retrieve matches',
    }
  }
};
