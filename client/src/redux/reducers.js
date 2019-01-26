import { REQUEST_SUMMONER, RECEIVE_SUMMONER } from './actions'
import { REQUEST_MATCHES, RECEIVE_MATCHES } from './actions'
import { REQUEST_MORE_MATCHES, RECEIVE_MORE_MATCHES } from './actions'

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
    case REQUEST_MORE_MATCHES:
      return Object.assign({}, state, {
        isFetchingMoreMatches: true,
      });
    case RECEIVE_MORE_MATCHES:
      state.matches.push(action.matches.matches);
      return Object.assign({}, state, {
        isFetchingMoreMatches: false,
        cursor: action.matches.cursor,
      });
    default:
      return state
  }
}

export default matches
