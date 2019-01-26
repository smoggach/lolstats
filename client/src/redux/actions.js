import axios from 'axios';
import querystring from 'querystring';

export const REQUEST_SUMMONER = 'REQUEST_SUMMONER';
export const RECEIVE_SUMMONER = 'RECEIVE_SUMMONER';
export const REQUEST_MATCHES = 'REQUEST_MATCHES';
export const RECEIVE_MATCHES = 'RECEIVE_MATCHES';

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

    let url = `${process.env.API_URL}/summoner/${summonerName}`

    return axios({
      method: 'get',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    .then(function(response) {
      dispatch(receiveSummoner(response.data))
    })
    .catch(function(err) {
      console.log(err);
    })
  }
}

export function fetchMatches(accountId, cursor) {
  return dispatch => {
    dispatch(requestMatches())

    let url = `${process.env.API_URL}/matches/${accountId}`

    if (cursor) {
      url += `?cursor=${cursor}`
    }

    return axios({
      method: 'get',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    .then(function(response) {
      dispatch(receiveMatches(response.data))
    })
    .catch(function(err) {
      console.log(err);
    })
  }
}
