import React, {PropTypes} from 'react';

class SessionListForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.createSession = this.createSession.bind(this);
    this.editSession = this.editSession.bind(this);
  }

  renderTableHeader(time_slots, prev_time_slots, next_time_slots, show_past_sessions, current_time_slot) {
    if (!time_slots)
      return "";

    let result = time_slots.map((ts, i) => {
      if (show_past_sessions || !this.isTimeSlotInPast(ts))
      {
        return (
          <td key={i} className={ts.id == current_time_slot.id ? 'current' : 'not-current'}>
            <div>{ts.start_time} {ts.end_time}</div>
            <div className="prev-next-links">
              {prev_time_slots[ts.id] && 
                <a href={"/sessions/?time_slot_id=" + prev_time_slots[ts.id]}>Prev</a>
              }
              {next_time_slots[ts.id] &&
                <a href={"/sessions/?time_slot_id=" + next_time_slots[ts.id]}>Next</a>
              }
            </div>
          </td>        
        );
      }
    });
    return result;
  }

  isTimeSlotInPast(timeSlot)
  {
    // never in the past
    return timeSlot != 809234890234; // todo
  }

  existingSession(sessions, timeSlotId, meetingSpaceId) {
    return sessions.find(s => s.timeSlotId === timeSlotId && s.meetingSpaceId === meetingSpaceId);
  }

  show_create_links() {
    return true;
  }

  existingSessionTitleLink(sessions, timeSlotId, meetingSpaceId) {
    const session = this.existingSession(sessions, timeSlotId, meetingSpaceId);
    return (<a href="#" onClick={this.editSession(session.id)}>{session.title}</a>);
  }

  createSession(timeSlotId, meetingSpaceId) {
    return (e) => {
      e.preventDefault();
      this.props.createSession(timeSlotId, meetingSpaceId);
    };
  }

  editSession(sessionId) {
    return (e) => {
      e.preventDefault();
      this.props.editSession(sessionId);
    };
  }

  render() {
    const {sessions, time_slots, meeting_spaces, prev_time_slots, next_time_slots, current_time_slot} = this.props.sessions;
    if (!sessions)
      return "";

    const show_past_sessions = true;

    return (
<div>
<div className="page-header">CodeMash Open Spaces</div>

<table>
  <thead>
    <tr>
      <td className="meeting-space-header">Meeting Space</td>
      {this.renderTableHeader(time_slots, prev_time_slots, next_time_slots, show_past_sessions, current_time_slot)}
    </tr>
  </thead>  
  <tbody>
    {meeting_spaces.map((ms, i) => {
      return (
        <tr key={i}>  
          <td key="-1" className="header meeting-space-header">{ms.name}</td>

          {time_slots.map((ts, tsIndex) => {
            return (
              <td key={tsIndex} className={(this.existingSession(sessions,ts.id,ms.id) ? 'taken' : 'available') + " " + (ts.id == current_time_slot.id ? 'current' : 'not-current')}>
                {this.existingSession(sessions,ts.id,ms.id) ? (
                  <div>
                    <div className="title">{this.existingSessionTitleLink(sessions,ts.id,ms.id)}</div>
                    <div className="owner">{this.existingSession(sessions,ts.id,ms.id).owner}</div>
                    <div className="inline-meeting-space">Meeting space {ms.name}</div>
                  </div>
                ) : (
                  <div>
                    {this.show_create_links() && 
                      <div className="create-link"><a href="#" onClick={this.createSession(ts.id, ms.id)}>Create</a></div>
                    }
                    <div className="inline-meeting-space">Meeting space {ms.name}</div>
                  </div>
                )}
              </td>
            );
          })}

        </tr>
      );
    })}
  </tbody>
</table>
<div className="mobile-notes">
  <br/>
  <i>Turn your device sideways to view all sessions</i>
</div>
<br/>
<i>Questions?  Issues?  Contact <a href="http://twitter.com/jonkruger" target="_blank">@JonKruger</a></i>
</div>

    );
  }
}

SessionListForm.propTypes = {
  sessions: PropTypes.object,
  createSession: PropTypes.func.isRequired,
  editSession: PropTypes.func.isRequired
};

export default SessionListForm;
