import { REQUEST_SUMMONER, RECEIVE_SUMMONER, REQUEST_MATCHES, RECEIVE_MATCHES } from './actions'

function matches( state = {isFetching: false, matches: []}, action) {
  switch (action.type) {
    case REQUEST_SUMMONER:
      return Object.assign({}, state, {
        isFetchingSummoner: true,
      });
    case RECEIVE_SUMMONER:
      return Object.assign({}, state, {
        isFetchingSummoner: false,
        summoner: action.summoner
      });
    case REQUEST_MATCHES:
      return Object.assign({}, state, {
        isFetchingMatches: true,
      });
    case RECEIVE_MATCHES:
      return Object.assign({}, state, {
        isFetchingMatches: false,
        matches: action.matches.matches,
        cursor: action.matches.cursor
      });
    default:
      return state
  }
}

export default matches
