'use strict';

const kayn = require('../utils/kayn.js');
const pageLength = 10;

module.exports = async function (accountId, cursor) {
  try {
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
    return err;
  }
}
