import SessionReducer from '../SessionReducer';
import { expect } from 'chai';

describe('CREATE_SESSION', () => {
  it('should edit a new session', () => {
    let newState = SessionReducer(undefined, { type: 'CREATE_SESSION', timeSlotId: 1, meetingSpaceId: 2 });
    expect(newState.editSession).to.deep.eq(
      {
        session: {
          id: null,
          timeSlotId: 1,
          meetingSpaceId: 2,
          title: '',
          owner: '',
          twitterHandle: ''
        }
      });
  })
});

describe('LOAD_SESSIONS', () => {
  it('should load all session data for the first time', () => {
    let newState = SessionReducer(undefined, {
      type: 'LOAD_SESSIONS',
      data: {
        sessions: [
          {
            "id": 158,
            "title": "t",
            "owner": "o",
            "twitter_handle": "twitter",
            "time_slot_id": 27,
            "meeting_space_id": 2,
            "twitter_url": "twitter url"
          }
        ],
        time_slots: [],
        meeting_spaces: [],
        current_time_slot: {},
        last_load_time: null
      }
    });
  });
});
