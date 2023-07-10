// Rootreducer.jsx

import { combineReducers } from 'redux';
import dateReducer from './dateReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  currentDate: dateReducer,
  user: userReducer
});

export default rootReducer;
