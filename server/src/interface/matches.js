'use strict';

const kayn = require('../utils/kayn.js');
const pageLength = 10;

function findParticipant(participants, champId) {
  for (let participant of participants) {
    if (participant.championId === champId) {
      return participant;
    }
  }
}

function findTeam(teams, teamId) {
  for (let team of teams) {
    if (team.teamId === teamId) {
      return team;
    }
  }
}

module.exports = async function (accountId, cursor) {
  try {
    const beginIndex = cursor || 0;
    const endIndex = beginIndex + pageLength;
    const query = {
      beginIndex: beginIndex,
      endIndex: endIndex,
    };
    const matchList = await kayn().MatchlistV4.by.accountID(accountId).query(query);

    if (matchList.matches && matchList.matches.length) {
      const matches = [];
      for (let match of matchList.matches) {
        const champId = match.champion;
        const matchInfo = await kayn().MatchV4.get(match.gameId);
        const participant = findParticipant(matchInfo.participants, champId);
        const team = findTeam(matchInfo.teams, participant.teamId);
        matches.push({
          outcome: team.win,
          duration: matchInfo.gameDuration,
          champName: champId,
          spells: [
            { id: participant.stats.spell1Id, name: "todo" },
            { id: participant.stats.spell2Id, name: "todo" },
          ],
          runes: participant.runes,
          kda: (participant.stats.kills + participant.stats.assists) / participant.stats.deaths,
          champLevel: participant.stats.champLevel,
          creepScore: "todo",
          creepScoreMinute: "todo",
        });
      }
      return {
        matches: matches,
        cursor: endIndex,
      }
    }

    return {
      matches: [],
    }
  } catch(err) {
    return err;
  }
}
