import { REQUEST_SUMMONER, RECEIVE_SUMMONER, REQUEST_MATCHES, RECEIVE_MATCHES } from './actions'

function matches( state = {isFetching: false, matches: []}, action) {
  switch (action.type) {
    case REQUEST_SUMMONER:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_SUMMONER:
      return Object.assign({}, state, {
        isFetching: false,
        summoner: action.summoner
      });
    case REQUEST_MATCHES:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_MATCHES:
      return Object.assign({}, state, {
        isFetching: false,
        matches: action.matches
      });
    default:
      return state
  }
}

export default matches
