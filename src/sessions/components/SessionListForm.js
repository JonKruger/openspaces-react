import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

class SessionListForm extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  TableHeader = ({time_slots, show_past_sessions, current_time_slot}) => {
    if (!time_slots)
      return <thead />;

    return (
      <thead>
        <tr>
          <td className="meeting-space-header">Meeting Space</td>
          {time_slots.map((ts, i) => {
            if (show_past_sessions || !this.isTimeSlotInPast(ts)) {
              return (
                <td key={i} className={ts.id == current_time_slot.id ? 'current' : 'not-current'}>
                  <div>{this.formatTimeSlot(ts)}</div>
                </td>
              );
            }
          })}
        </tr>
      </thead>);
  }

  Session = ({session, ts, ms, current_time_slot}) => {
    return (
      <td className={(session ? 'taken' : 'available') + " " + (ts.id == current_time_slot.id ? 'current' : 'not-current')}>
        {session ? (
          <div>
            <div className="title">
              <this.TitleLink session={session} />
            </div>
            <div className="owner">
              <a href={session.twitterUrl} target="_blank">
                {session.owner}
              </a>
            </div>
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
  }

  TitleLink = ({session}) =>
    <Link to={`sessions/${session.id}`}>{session.title}</Link>

  isTimeSlotInPast = (timeSlot) => {
    // todo
    return false;
  }

  existingSession = (sessions, timeSlotId, meetingSpaceId) => {
    return sessions.find(s => s.timeSlotId === timeSlotId && s.meetingSpaceId === meetingSpaceId);
  }

  formatTimeSlot = (timeSlot) => {
    return this.formatTimeSlotDate(timeSlot.start_time) + '-' + this.formatTimeSlotDate(timeSlot.end_time);
  }

  formatTimeSlotDate = (date) => {
    if (!date)
      throw "Time slot date missing";
    return moment(date).format("ddd h:mma");
  }

  show_create_links = () => {
    return true;
  }

  render = () => {
    const {sessions, time_slots, meeting_spaces, current_time_slot} = this.props.sessions;
    if (!sessions)
      return "";

    const show_past_sessions = true;

    return (
      <div>
        <div className="page-header">CodeMash Open Spaces</div>
        <table>
          <this.TableHeader {...{ time_slots, show_past_sessions, current_time_slot }} />
          <tbody>
            {meeting_spaces.map((ms, i) =>
              <tr key={i}>
                <td className="header meeting-space-header">{ms.name}</td>

                {time_slots.map((ts, tsIndex) =>
                  <this.Session key={tsIndex} session={this.existingSession(sessions, ts.id, ms.id)} {...{ ms, ts, current_time_slot }} />
                )}
              </tr>
            )}
          </tbody>
        </table>
        <div className="mobile-notes">
          <br />
          <i>Turn your device sideways to view all sessions</i>
        </div>
        <br />
        <i>Questions?  Issues?  Contact <a href="http://twitter.com/jonkruger" target="_blank">@JonKruger</a></i>
      </div>
    );
  }
}

SessionListForm.propTypes = {
  sessions: PropTypes.object,
};

export default SessionListForm;
