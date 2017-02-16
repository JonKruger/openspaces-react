import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../SessionActions';
import SessionListForm from '../components/SessionListForm';

class SessionListPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.actions.loadSessionListData(this.props.last_load_time);
  }

  render() {
    return (
      <SessionListForm {...this.props} />
    );
  }

}

SessionListPage.propTypes = {
  sessions: PropTypes.object.isRequired,
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
