/*
 * Copyright (c) 2018 Company Name.
 * All rights reserved.
 *
 * Company Name and the Company Name logo are trademarks
 * or registered trademarks of Company Name
 * or its affiliates in the U.S. and other countries.
 * Other names may be trademarks of their respective owners.
 *
 * WATERMARK
 */

export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_ERROR = 'GET_USERS_ERROR';

export function getUsers() {
  return {
    type: GET_USERS
  };
}

const initialState = {
  data: [],
  pending: false,
  error: null
};

export function usersReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_USERS:
      return Object.assign({}, state, { pending: true, error: null });
    case GET_USERS_SUCCESS:
      return Object.assign({}, state, { data: payload, pending: false });
    case GET_USERS_ERROR:
      return Object.assign({}, state, { pending: false, error: 'Error' });
    default:
      return state;
  }
}
