import * as types from './SessionActionTypes';
import objectAssign from 'object-assign';
import Session from './models/Session';

const INITIAL_STATE = {
    viewSessionList: {
      sessions: [],
      time_slots: [],
      meeting_spaces: [],
      current_time_slot: {},
      last_load_time: null
    },
		editSession:
		{
			session: null
		}
	};

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function SessionReducer(state = INITIAL_STATE, action) {
  let newState;
  switch (action.type) {

    case types.CREATE_SESSION:
    {
      let sessionBeingEdited = new Session();
      sessionBeingEdited.timeSlotId = action.timeSlotId;
      sessionBeingEdited.meetingSpaceId = action.meetingSpaceId;
      newState = objectAssign({}, state, {editSession: {session: sessionBeingEdited}});
      return newState;
    }

    case types.EDIT_SESSION:
    {
      let sessionBeingEdited = state.viewSessionList.sessions.find(s => s.id == action.sessionId);
      newState = objectAssign({}, state, 
      {
        editSession: 
        {
          session: sessionBeingEdited
        }
      });

      return newState;
    }

    case types.EDIT_SESSION_DATA_CHANGED:
    {
      let sessionBeingEdited = objectAssign({}, state.editSession.session);
      sessionBeingEdited[action.fieldName] = action.value;
      newState = objectAssign({}, state, {editSession: {session: sessionBeingEdited}});
      return newState;
    }

    case types.LOAD_SESSIONS:
      newState = objectAssign({}, state, {
        viewSessionList: {
          sessions: mergeById(state.viewSessionList.sessions, action.data.sessions),
          time_slots: mergeById(state.viewSessionList.time_slots, action.data.time_slots),
          meeting_spaces: mergeById(state.viewSessionList.meeting_spaces, action.data.meeting_spaces),
          current_time_slot: state.viewSessionList.current_time_slot ||  action.data.current_time_slot,
          last_load_time: action.data.last_load_time
        }});
      return newState;

    case types.SAVE_SESSION:
    {
      let sessions = state.viewSessionList.sessions.filter(s => s.id !== state.editSession.session.id);
      sessions.push(state.editSession.session);
      newState = objectAssign({}, state, {sessions: sessions});
      return newState;
    }
    
    case types.VIEW_SESSION_LIST:
      newState = objectAssign({}, state, {editSession: { session: null }});
      return newState;


    default:
      return state;
  }
}

function mergeById(existingItems, newItems) {
  newItems = newItems || [];
  let newItemIds = newItems.map(i => i.id);
  return existingItems.filter(i => !newItemIds.find(id => id === i.id)).concat(newItems);
}