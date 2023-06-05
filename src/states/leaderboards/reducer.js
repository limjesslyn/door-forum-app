import { ActionType } from './action';

function leaderboardsReducer(list = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_LEADERBOARDS:
      return action.payload.list;
    default:
      return list;
  }
}

export default leaderboardsReducer;
