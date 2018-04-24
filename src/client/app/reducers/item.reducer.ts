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

export const GET_ITEMS = 'GET_ITEMS';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';

export function getItems() {
  return {
    type: GET_ITEMS
  };
}

const initialState = {
  data: [],
  pending: false,
  error: null
};

export function itemReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ITEMS:
      return Object.assign({}, state, { pending: true, error: null });
    case GET_ITEMS_SUCCESS:
      return Object.assign({}, state, { data: payload, pending: false });
    case GET_ITEMS_ERROR:
      return Object.assign({}, state, { pending: false, error: 'Error' });
    default:
      return state;
  }
}
