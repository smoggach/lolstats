import axios from 'axios';
import querystring from 'querystring';

export const REQUEST_SUMMONER = 'REQUEST_SUMMONER';
export const RECEIVE_SUMMONER = 'RECEIVE_SUMMONER';
export const REQUEST_MATCHES = 'REQUEST_MATCHES';
export const RECEIVE_MATCHES = 'RECEIVE_MATCHES';

const apiKey = "RGAPI-f793fd88-15da-4aeb-95eb-4642105cc085";

function requestSummoner() {
  return {
    type: REQUEST_SUMMONER
  }
}

function receiveSummoner(summoner) {
  return {
    type: RECEIVE_SUMMONER,
    summoner: summoner
  }
}

function requestMatches() {
  return {
    type: REQUEST_MATCHES
  }
}

function receiveMatches(matches) {
  return {
    type: RECEIVE_MATCHES,
    matches: matches
  }
}

export function fetchSummoner(summonerName) {
  return dispatch => {
    dispatch(requestSummoner())

    const query = querystring.stringify({
      api_key: apiKey,
    });

    const opts = {
      data: query,
    }

    return axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, opts)
      .then(function(response) {
        console.log(response);
        dispatch(receiveSummoner(response))
      })
      .catch(function(err) {
        console.log(err);
      })
  }
}
