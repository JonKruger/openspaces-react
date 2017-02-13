import * as types from './SessionActionTypes';
import * as sessionService from './SessionService';
import { browserHistory } from 'react-router';

export function viewSessionList() {
  return (dispatch) => {
    dispatch({ type: types.VIEW_SESSION_LIST });
  };
}

export function loadSessionListData() {
  return (dispatch) => {
    sessionService.loadSessionListData()
      .then(data => {
        dispatch(
          {
            type: types.LOAD_SESSIONS,
            data
          }
        );
      });
  };
}

export function createSession(timeSlotId, meetingSpaceId) {
  return (dispatch) => {
    dispatch({ type: types.CREATE_SESSION, timeSlotId, meetingSpaceId });
  };
}

export function editSession(sessionId) {
  return (dispatch) => {
    dispatch({ type: types.EDIT_SESSION, sessionId });
  };
}

export function editSessionDataChanged(fieldName, value) {
  return (dispatch) => dispatch({ type: types.EDIT_SESSION_DATA_CHANGED, fieldName, value });
}

export function saveSession(session) {
  return (dispatch) => {
    sessionService.saveSession(session)
      .then(data => {
        dispatch({ type: types.SAVE_SESSION, data });
        browserHistory.push('/');
      });
  };
}
