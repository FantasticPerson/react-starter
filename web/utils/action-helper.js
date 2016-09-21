import {createAction} from 'redux-actions';

export const PENDING = {};

export function isPending(value) {
  return value === PENDING;
}

export function isError(value) {//Error, ErrorEvent
  return value instanceof Error ||
    value instanceof ErrorEvent;
}

export function isNormal(value) {
  return !isPending(value) && !isError(value)
}

export function createPayloadAction(type, payload) {
  return {
    type,
    payload
  }
}

export function createPendingAction(type) {
  return {
    type,
    payload: PENDING
  }
}

export function createErrorAction(type, err) {
  return {
    type,
    payload: err
  }
}
