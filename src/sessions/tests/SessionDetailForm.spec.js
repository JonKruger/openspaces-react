import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';
import Session from '../models/Session';
import SessionDetailForm from '../components/SessionDetailForm';

describe('<SessionDetailForm />', () => {
  it('should render existing data', () => {
    let session = new Session();
    session.title = "the title";
    session.owner = "the owner";
    session.twitterHandle = "the twitter";
    
    const form = shallow(<SessionDetailForm session={session}/>);
    expect(form.find({name: "title"}).props().value).to.equal("the title");
    expect(form.find({name: "owner"}).props().value).to.equal("the owner");
    expect(form.find({name: "twitterHandle"}).props().value).to.equal("the twitter");
  });

  it ('should be invalid if title is blank', () => {
    let session = new Session();
    session.title = "";
    session.owner = "the owner";
    session.twitterHandle = "the twitter";
    
    const form = shallow(<SessionDetailForm session={session}/>);
    form.instance().validate(session);
    expect(form.instance().validFields).to.deep.equal({title: false, owner: true});
    expect(form.find({name: "save"}).props().disabled).to.equal("disabled");
  });

  it ('should be invalid if owner is blank', () => {
    let session = new Session();
    session.title = "the title";
    session.owner = "";
    session.twitterHandle = "the twitter";
    
    const form = shallow(<SessionDetailForm session={session}/>);
    form.instance().validate(session);
    expect(form.instance().validFields).to.deep.equal({title: true, owner: false});
    expect(form.find({name: "save"}).props().disabled).to.equal("disabled");
  });
});