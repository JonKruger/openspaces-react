import Session from '../models/Session';

export function loadSessionListData() {
  return fetch("http://localhost:3000/api/sessions", {
    method: 'get'
  })
    .then(response => { return response.json(); })
    .then(rawData => {
      rawData.sessions = rawData.sessions.map(data => {
        let session = new Session();
        session.id = data.id;
        session.title = data.title;
        session.owner = data.owner;
        session.twitterHandle = data.twitter_handle;
        session.timeSlotId = data.time_slot_id;
        session.meetingSpaceId = data.meeting_space_id;
        return session;
      });
      return rawData;
    });
}

export function saveSession(session) {
  let sessionData = {
    id: session.id,
    title: session.title,
    owner: session.owner,
    twitter_handle: session.twitterHandle,
    time_slot_id: session.timeSlotId,
    meeting_space_id: session.meetingSpaceId
  };

  return fetch("http://localhost:3000/api/sessions/save", {
    method: 'post',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(sessionData)
  })
    .then(response => { return response.json(); });
}

