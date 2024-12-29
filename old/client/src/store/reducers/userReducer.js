const initialState = {
  loggedIn: false,
  userData: {
    addresses: null,
    email: "stevekid705@gmail.com",
    first_name: "steve",
    id: 4,
    last_name: "nene",
    middle_name: "nene",
    phonenumber: "0792729282",
    profile_pic: "https://placehold.co/600x400",
    role: "user",
    salary: 300000,
    status: "active",
    username: "stevonene",
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        loggedIn: true,
        userData: action.payload,
      };
    case "LOGOUT":
      return {
        loggedIn: false,
        userData: null,
      };
    default:
      return state;
  }
};

export default userReducer;
