// brainDumpReducer.js

const initialState = {
  tasks: [],
};

const brainDumpReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BRAIN_DUMP':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'DELETE_BRAIN_DUMP':
      const updatedTasks = [...state.tasks];
      updatedTasks.splice(action.payload, 1);
      return {
        ...state,
        tasks: updatedTasks,
      };
    case 'SET_BRAIN_DUMP': // New action type for setting the tasks
      return {
        ...state,
        tasks: action.payload,
      };
    default:
      return state;
  }
};

export default brainDumpReducer;
