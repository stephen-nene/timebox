//dateReducer.js

const initialState = new Date();

const dateReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_DATE':
      return action.payload;
    default:
      return state;
  }
};

export default dateReducer;
