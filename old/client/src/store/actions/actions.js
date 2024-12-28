// actions.js
export const login = (userData) => {
  return {
    type: 'LOGIN',
    payload: userData
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export const updateDate = (date) => {
  return {
    type: 'UPDATE_DATE',
    payload:  date ,
  };
};

export const addEvent = (event) => {
  return {
    type: 'ADD_EVENT',
    payload: event,
  };
};

export const deleteEvent = (index) => {
  return {
    type: 'DELETE_EVENT',
    payload: index,
  };
};

export const addBrainDump = (brainDump) => {
  return {
    type: 'ADD_BRAIN_DUMP',
    payload: brainDump,
  };
};

export const deleteBrainDump = (index) => {
  return {
    type: 'DELETE_BRAIN_DUMP',
    payload: index,
  };
};

