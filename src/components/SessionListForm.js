import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import moment from 'moment';

class SessionListForm extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  renderTableHeader(time_slots, prev_time_slots, next_time_slots, show_past_sessions, current_time_slot) {
    if (!time_slots)
      return "";

    let result = time_slots.map((ts, i) => {
      if (show_past_sessions || !this.isTimeSlotInPast(ts))
      {
        return (
          <td key={i} className={ts.id == current_time_slot.id ? 'current' : 'not-current'}>
            <div>{this.formatTimeSlot(ts)}</div>
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

  formatTimeSlot(timeSlot) {
    return this.formatTimeSlotDate(timeSlot.start_time) + '-' + this.formatTimeSlotDate(timeSlot.end_time);
  }

  formatTimeSlotDate(date) {
    if (!date)
      throw "Time slot date missing";
    return moment(date).format("ddd h:mma");
  }

  show_create_links() {
    return true;
  }

  existingSessionTitleLink(sessions, timeSlotId, meetingSpaceId) {
    const session = this.existingSession(sessions, timeSlotId, meetingSpaceId);
    return <Link to={`sessions/${session.id}`}>{session.title}</Link>;
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
                      <div className="create-link"><Link to={`sessions/new?time_slot_id=${ts.id}&meeting_space_id=${ms.id}`}>Create</Link></div>
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
};

export default SessionListForm;
