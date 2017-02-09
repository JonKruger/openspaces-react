import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/SessionActions';
import SessionListForm from '../components/SessionListForm';

class SessionListPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.actions.loadSessionListData();
  }

  render() {
    return (
      <SessionListForm 
        sessions={this.props.sessions} />
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
