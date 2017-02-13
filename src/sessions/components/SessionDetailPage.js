import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SessionDetailForm from '../components/SessionDetailForm';
import * as actions from '../SessionActions';

class SessionDetailPage extends React.Component
{
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    let sessionId = +this.props.routeParams["id"];
    if (sessionId)
      this.props.actions.editSession(sessionId);
    else {
      let timeSlotId = +this.props.location.query["time_slot_id"];
      let meetingSpaceId = +this.props.location.query["meeting_space_id"];
      this.props.actions.createSession(timeSlotId, meetingSpaceId);
    }
  }

  render() {
    return (
      <SessionDetailForm 
        session={this.props.session}
        saveSession={this.props.actions.saveSession}
        editSessionDataChanged={this.props.actions.editSessionDataChanged}
        viewSessionList={this.props.actions.viewSessionList} />
    );
  }
}
 
SessionDetailPage.propTypes = {
  session: PropTypes.object,
  actions: PropTypes.object
};
 
function mapStateToProps(state) {
  return {
    session: state.sessions.editSession.session
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
 
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionDetailPage);
