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



