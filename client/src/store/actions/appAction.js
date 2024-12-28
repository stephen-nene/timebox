// appActions.js

export const setDarkMode = () => {
  return {
    type: "SET_DARK_MODE",
  };
};

export const setUserPageData = (page, data) => {
  return {
    type: "SET_USER_PAGE_DATA",
    payload: { page, data },
  };
};

export const setCategoriesPageData = (page,data) => {
  return {
    type: "SET_CATEGORIES_PAGE_DATA",
    payload: { page, data },
  };
}

export const setFinancesPageData = (page,data) => {
  return {
    type: "SET_FINANCES_PAGE_DATA",
    payload: { page, data },
  };
}

export const getUserFinances=()=>{

}
