'use strict';

const kayn = require('../utils/kayn.js');
const pageLength = 10;

// seperate participants into winners and losers and
// find which participant is the summoner
function parseParticipants(participants, teams, players, champId) {
  const result = {
    winners: [],
    losers: [],
    summonerParticipant: null,
    summonerOutcome: "Loss",
  }

  const playerNames = {};
  for (let player of players) {
    playerNames[player.participantId] = player.player.summonerName;
  }

  // determine the winning team
  let winner;
  for (let team of teams) {
    if (team.win === "Win") {
      winner = team.teamId;
    }
  }

  for (let participant of participants) {
    const participantInfo = {
      name: playerNames[participant.participantId],
      champId: participant.championId,
    }

    if (participant.teamId === winner) {
      result.winners.push(participantInfo);
    } else {
      result.losers.push(participantInfo);
    }

    if (participant.championId === champId) {
      result.summonerParticipant = participant;
      if (participant.teamId === winner) {
        result.summonerOutcome = "Win";
      }
    }
  }

  return result;
}

module.exports = async function (accountId, cursor) {
  try {
    const beginIndex = cursor || 0;
    let endIndex = beginIndex + pageLength;
    const query = {
      beginIndex: beginIndex,
      endIndex: endIndex,
    };
    const matchList = await kayn().MatchlistV4.by.accountID(accountId).query(query);

    // stop paginating if we're at the end of the list
    if (endIndex === matchList.totalGames || matchList.length === matchList.totalGames) {
      endIndex = 0;
    }

    // get details for each match int he list
    if (matchList.matches && matchList.matches.length) {
      const matches = [];
      let outcome = '';
      for (let match of matchList.matches) {
        const champId = match.champion;
        const matchInfo = await kayn().MatchV4.get(match.gameId);
        const participantInfo = parseParticipants(matchInfo.participants, matchInfo.teams, matchInfo.participantIdentities, champId);
        const participant = participantInfo.summonerParticipant;
        const items = [];
        for (let i = 0; i <= 6; i++) {
          items.push(participant.stats['item'+i]);
        }

        matches.push({
          outcome: participantInfo.summonerOutcome,
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
          items: items,
          winners: participantInfo.winners,
          losers: participantInfo.losers,
          kills: participant.stats.kills,
          assists: participant.stats.assists,
          deaths: participant.stats.deaths,
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
