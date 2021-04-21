const initialState = {
  loggedInUser: '',
  idToken: '',
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    // case SIGNUP: {
    //   return { ...state };
    // }

    // case SAVE_USER: {
    //   return tassign(state, { loggedInUser: action.payload });
    // }

    // case LOGIN: {
    //   return tassign(state, { loggedInUser: action.payload, idToken: action.payload.idToken });
    // }

    default:
      return state;
  }
};

export default UserReducer;
