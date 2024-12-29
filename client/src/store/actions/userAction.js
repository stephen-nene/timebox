// UserAction.js

export const loginAction = (userData) => {
    return {
      type: 'LOGIN',
      payload: userData
    };
  };
  
  export const signupAction = (userData) => {
    return {
      type: 'SIGNUP',
      payload: userData
    };
  };
  
  
  export const logoutAction = () => {
    return {
      type: 'LOGOUT'
    };
  };
  
  
  
  
  