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

  validateRequired(value) {
    return value ? true : false;
  }

  validate(session) {
    if (session) {
      this.validFields = {
        title: this.validateRequired(session.title),
        owner: this.validateRequired(session.owner)
      };
    }
    else
      this.validFields = {};
  }

  isFormValid() {
    let isValid = true;
    for (let [key, value] of Object.entries(this.validFields)) {
      if (!value)
        isValid = false;
    }
    return isValid;
  }

  save(e) {
    e.preventDefault();
    this.props.saveSession(this.props.session);
  }

  render() {
    let session = this.props.session;
    if (!session)
      return <div />;

    this.validate(session);

    return (
    <form onSubmit={this.save}>
      <h1>Edit Session</h1>

      <div className="field">
        <label htmlFor="session_title">Title</label><br/>
          <input 
            required="required" 
            maxLength="75" 
            size="20" 
            type="text" 
            value={session.title} 
            name="title" 
            id="session_title" 
            onChange={this.onFieldChange} 
            className={this.validFields.title ? "" : "invalid"}/>
      </div>
      <div className="field">
        <label htmlFor="session_owner">Your Name</label><br/>
          <input 
            required="required" 
            maxLength="25" 
            size="20" 
            type="text" 
            value={session.owner} 
            name="owner" 
            id="session_owner" 
            onChange={this.onFieldChange}
            className={this.validFields.owner ? "" : "invalid"}/>
      </div>
      <div className="field">
        <label htmlFor="session_twitterHandle">Twitter handle</label><br/>
          <input size="20" type="text" value={session.twitterHandle} name="twitterHandle" id="session_twitterHandle" onChange={this.onFieldChange} />
      </div>
      <br />
      <div className="actions">
        <input type="submit" name="commit" value="Save" disabled={this.isFormValid(session) ? "" : "disabled"} />
      </div>
      <a data-confirm="Are you sure?" rel="nofollow" data-method="delete" href="/sessions/221">Delete This Session</a> |
      <Link to={"/"}>Back</Link>
    </form>);
  }
}

SessionDetailForm.propTypes = {
  session: PropTypes.object,
  saveSession: PropTypes.func.isRequired,
  editSessionDataChanged: PropTypes.func.isRequired,
  viewSessionList: PropTypes.func.isRequired
};

export default SessionDetailForm;
