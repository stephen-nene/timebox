// Rootreducer.jsx

import { combineReducers } from 'redux';
import dateReducer from './dateReducer';
import frameReducer from './frameReducer';
import brainDumpReducer from './brainDumpReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  currentDate: dateReducer,
  timeFrames: frameReducer,
  brainDump: brainDumpReducer,
  user: userReducer
});

export default rootReducer;
