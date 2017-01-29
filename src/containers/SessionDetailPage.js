import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SessionDetailForm from '../components/SessionDetailForm';
import * as actions from '../actions/SessionActions';

class SessionDetailPage extends React.Component
{
  constructor(props, context) {
    super(props, context);
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
    session: state.sessions.sessionBeingEdited
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
