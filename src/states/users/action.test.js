/**
 * test scenario
 *
 * - asyncRegisterUser thunk function
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import {
  afterEach, beforeEach, describe, it, expect, vi,
} from 'vitest';
import api from '../../utils/api';
import { asyncRegisterUser, receiveUsersActionCreator } from './action';

const dummyRegisterUserResponse = {
  id: 'user-123',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const dummyErrorResponse = new Error('Something went wrong');

describe('asyncRegisterUser', () => {
  beforeEach(() => {
    // backup original implementation
    api._register = api.register;
  });

  afterEach(() => {
    // restore original implementation
    api.register = api._register;

    delete api._register;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    const name = 'John Doe';
    const email = 'john@example.com';
    const password = '123456';

    // stub
    api.register = () => Promise.resolve(dummyRegisterUserResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncRegisterUser(name, email, password)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      receiveUsersActionCreator(dummyRegisterUserResponse),
    );
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    const name = 'John Doe';
    const email = 'john@example.com';
    const password = '123456';

    // stub
    api.register = () => Promise.reject(dummyErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // mock alert
    window.alert = vi.fn();

    // action
    await asyncRegisterUser(name, email, password)(dispatch);

    // assert
    expect(window.alert).toHaveBeenCalledWith(dummyErrorResponse.message);
  });
});
