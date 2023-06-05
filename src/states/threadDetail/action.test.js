/**
 * test scenario
 *
 * - asyncReceiveThreadDetail thunk function
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import {
  afterEach, beforeEach, describe, it, expect, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncReceiveThreadDetail, receiveThreadDetailActionCreator } from './action';

const dummyThreadDetailResponse = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

const dummyErrorResponse = new Error('Something went wrong');

describe('asyncReceiveThreadDetail thunk function', () => {
  beforeEach(() => {
    // backup original implementation
    api._getDetailThread = api.getDetailThread;
  });

  afterEach(() => {
    // restore original implementation
    api.getDetailThread = api._getDetailThread;

    delete api._getDetailThread;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    const id = 'comment-1';

    // stub
    api.getDetailThread = () => Promise.resolve(dummyThreadDetailResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncReceiveThreadDetail(id)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadDetailActionCreator(dummyThreadDetailResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    const id = 'comment-1';

    // stub
    api.getDetailThread = () => Promise.reject(dummyErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // mock alert
    window.alert = vi.fn();

    // action
    await asyncReceiveThreadDetail(id)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(dummyErrorResponse.message);
  });
});
