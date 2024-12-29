const initialState = {
  loggedIn: false,
  userData: loadUserData(),
};

function loadUserData() {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  if (storedData) {
    return storedData.data;
  }
  return null;
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
    case "SIGNUP":
      saveUserData(action.payload);
      return {
        loggedIn: true,
        userData: action.payload,
      };

    case "LOGOUT":
      clearUserData();
      return {
        loggedIn: false,
        userData: null,
      };

    default:
      return state;
  }
};

function saveUserData(data) {
  const userData = {
    data: data,
  };
  localStorage.setItem("userData", JSON.stringify(userData));
}

function clearUserData() {
  localStorage.removeItem("userData");
}

export default userReducer;
