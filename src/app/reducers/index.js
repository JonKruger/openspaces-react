import { combineReducers } from 'redux';
import SessionReducer from '../../sessions/SessionReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  sessions: SessionReducer,
  routing: routerReducer
});

export default rootReducer;
