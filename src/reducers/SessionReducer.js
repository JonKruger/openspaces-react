import * as types from '../constants/ActionTypes';
import objectAssign from 'object-assign';
import initialState from './InitialState';
import Session from '../models/Session';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function SessionReducer(state = initialState.sessions, action) {
  let newState;
  switch (action.type) {

    case types.CREATE_SESSION:
    {
      let sessionBeingEdited = new Session();
      sessionBeingEdited.timeSlotId = action.timeSlotId;
      sessionBeingEdited.meetingSpaceId = action.meetingSpaceId;
      newState = objectAssign({}, state, {sessionBeingEdited});
      return newState;
    }

    case types.EDIT_SESSION:
    {
      let sessionBeingEdited = state.sessions.find(s => s.id == action.sessionId);
      newState = objectAssign({}, state, {sessionBeingEdited});
      return newState;
    }

    case types.EDIT_SESSION_DATA_CHANGED:
    {
      let sessionBeingEdited = objectAssign({}, state.sessionBeingEdited);
      sessionBeingEdited[action.fieldName] = action.value;
      newState = objectAssign({}, state, {sessionBeingEdited});
      return newState;
    }

    case types.LOAD_SESSIONS:
      newState = objectAssign({}, state, action.data);
      return newState;

    case types.SAVE_SESSION:
    {
      let sessions = state.sessions.filter(s => s.id !== state.sessionBeingEdited.id);
      sessions.push(state.sessionBeingEdited);
      newState = objectAssign({}, state, {sessions: sessions, sessionBeingEdited: null})
      return newState;
    }
    
    case types.VIEW_SESSION_LIST:
      return state;

    // case SAVE_FUEL_SAVINGS:
    //   // For this example, just simulating a save by changing date modified.
    //   // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
    //   return objectAssign({}, state, {dateModified: action.dateModified});

    // case CALCULATE_FUEL_SAVINGS:
    //   newState = objectAssign({}, state);
    //   newState[action.fieldName] = action.value;
    //   newState.necessaryDataIsProvidedToCalculateSavings = calculator().necessaryDataIsProvidedToCalculateSavings(newState);
    //   newState.dateModified = action.dateModified;

    //   if (newState.necessaryDataIsProvidedToCalculateSavings) {
    //     newState.savings = calculator().calculateSavings(newState);
    //   }

    //   return newState;

    default:
      return state;
  }
}
