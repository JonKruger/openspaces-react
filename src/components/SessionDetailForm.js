import React, { PropTypes } from 'react';
import {Link} from 'react-router';

class SessionDetailForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onFieldChange = this.onFieldChange.bind(this);
    this.save = this.save.bind(this);
  }

  onFieldChange(e) {
    this.props.editSessionDataChanged(e.target.name, e.target.value);
  }

  save() {
    this.props.saveSession(this.props.session);
  }

  render() {
    const session = this.props.session;
    if (!session)
      return <div />;

    return (
    <div>
      <h1>Edit Session</h1>

      <div className="field">
        <label htmlFor="session_title">Title</label><br/>
          <input required="required" maxLength="75" size="20" type="text" value={session.title} name="title" id="session_title" onChange={this.onFieldChange} />
      </div>
      <div className="field">
        <label htmlFor="session_owner">Your Name</label><br/>
          <input required="required" maxLength="25" size="20" type="text" value={session.owner} name="owner" id="session_owner" onChange={this.onFieldChange} />
      </div>
      <div className="field">
        <label htmlFor="session_twitterHandle">Twitter handle</label><br/>
          <input size="20" type="text" value={session.twitterHandle} name="twitterHandle" id="session_twitterHandle" onChange={this.onFieldChange} />
      </div>

      <div className="actions">
        <input type="submit" name="commit" value="Save" onClick={this.save} />
      </div>
      <a data-confirm="Are you sure?" rel="nofollow" data-method="delete" href="/sessions/221">Delete This Session</a> |
      <Link to={"/"}>Back</Link>
    </div>);
  }
}

SessionDetailForm.propTypes = {
  session: PropTypes.object,
  saveSession: PropTypes.func.isRequired,
  editSessionDataChanged: PropTypes.func.isRequired,
  viewSessionList: PropTypes.func.isRequired
};

export default SessionDetailForm;
