import { combineReducers } from 'redux';
import SessionReducer from './SessionReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  sessions: SessionReducer,
  routing: routerReducer
});

export default rootReducer;
