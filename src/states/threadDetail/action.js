import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_DETAIL_THREAD: 'RECEIVE_DETAIL_THREAD',
  CLEAR_DETAIL_THREAD: 'CLEAR_DETAIL_THREAD',
};

function receiveThreadDetailActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_DETAIL_THREAD,
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const detailThread = await api.getDetailThread(threadId);
      dispatch(receiveThreadDetailActionCreator(detailThread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.upVoteThread(threadId);
      const updatedThread = await api.getDetailThread(threadId);
      dispatch(receiveThreadDetailActionCreator(updatedThread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.downVoteThread(threadId);
      const updatedThread = await api.getDetailThread(threadId);
      dispatch(receiveThreadDetailActionCreator(updatedThread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncAddComment({ id, content }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.createComment({ id, content });
      const updatedThreadDetail = await api.getDetailThread(id);
      dispatch(receiveThreadDetailActionCreator(updatedThreadDetail));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteComment(threadId, commentId) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.upVoteComment(threadId, commentId);
      const updatedDetailThread = await api.getDetailThread(threadId);
      dispatch(receiveThreadDetailActionCreator(updatedDetailThread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteComment(threadId, commentId) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.downVoteComment(threadId, commentId);
      const updatedDetailThread = await api.getDetailThread(threadId);
      dispatch(receiveThreadDetailActionCreator(updatedDetailThread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncAddComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
};
