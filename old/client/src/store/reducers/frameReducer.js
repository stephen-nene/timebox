// frameReducer.js for the Time.jsx

const initialState = {
  events: [],
};

const frameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case 'DELETE_EVENT':
      return{
        ...state,
        events: state.events.filter((_, index) => index !== action.payload),
      };
    default:
      return state;
  }
};

export default frameReducer;

  