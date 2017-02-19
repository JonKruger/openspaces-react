import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../SessionActions';
import SessionListForm from '../components/SessionListForm';

class SessionListPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  mounted = false;

  componentWillMount() {
    console.log("mount");
    this.mounted = true;
    this.loadSessions();
    let autoRefreshSeconds = +this.props.location.query["auto-refresh"];
    if (autoRefreshSeconds)
      this.periodicallyLoadSessions(autoRefreshSeconds * 1000);
  }

  componentWillUnmount() {
    this.mounted = false;
    console.log("unmount");
  }

  periodicallyLoadSessions(waitTimeInMilliseconds)  {
    setTimeout(() => {
      if (!this.mounted)
        return;
        
      this.loadSessions();
      this.periodicallyLoadSessions(waitTimeInMilliseconds);
    }, waitTimeInMilliseconds);
  }

  loadSessions() {
    this.props.actions.loadSessionListData(this.props.last_load_time);
  }

  render() {
    return (
      <SessionListForm {...this.props} />
    );
  }

}

SessionListPage.propTypes = {
  sessions: PropTypes.array.isRequired,
  time_slots: PropTypes.array.isRequired,
  meeting_spaces: PropTypes.array.isRequired,
  current_time_slot: PropTypes.object.isRequired,
  last_load_time: PropTypes.object,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {...state.sessions.viewSessionList};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionListPage);
