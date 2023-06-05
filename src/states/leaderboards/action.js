import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

function receiveLeaderboardsActionCreator(list) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      list,
    },
  };
}

function asyncFillLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const list = await api.getLeaderboards();

      dispatch(receiveLeaderboardsActionCreator(list));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export { ActionType, receiveLeaderboardsActionCreator, asyncFillLeaderboards };
