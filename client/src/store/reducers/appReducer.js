// appReducer.js
const initialState = {
  darkMode: localStorage.getItem("darkMode") === "true",
  paginatedUsers: {}, // { pageNumber: { users: [], meta: {} } }
  paginatedFinances: {},
  paginatedCategories: {},
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DARK_MODE":
      localStorage.setItem("darkMode", !state.darkMode);
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    case "SET_USER_PAGE_DATA":
      return {
        ...state,
        paginatedUsers: {
          ...state.paginatedUsers,
          [action.payload.page]: action.payload.data,
        },
      };
    case "SET_FINANCES_PAGE_DATA":
      return {
        ...state,
        paginatedFinances: {
          ...state.paginatedFinances,
          [action.payload.page]: action.payload.data,
        },
      };
    case "SET_CATEGORIES_PAGE_DATA":
      return {
        ...state,
        paginatedCategories: {
          ...state.paginatedCategories,
          [action.payload.page]: action.payload.data,
        },
      };

    default:
      return state;
  }
};

export default appReducer;
