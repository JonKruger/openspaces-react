import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/SessionActions';
import SessionListForm from '../components/SessionListForm';

class SessionListPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    // this.save = this.save.bind(this);
  }

  render() {
    return (
      <SessionListForm 
        sessions={this.props.sessions}
        createSession={this.props.actions.createSession}
        editSession={this.props.actions.editSession}/>
    );
  }

}

SessionListPage.propTypes = {
  sessions: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    sessions: state.sessions
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
)(SessionListPage);
