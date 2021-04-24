import User from '../../models/User';
import { SAVE_USER, SIGNUP, LOGIN } from '../actions/UserActions';

const initialState = {
  loggedInUser: null,
  idToken: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP: {
      return { ...state };
    }

    case SAVE_USER: {
      return {
        ...state,
        // loggedInUser: action.payload,
      };
    }

    case LOGIN: {
      const user = new User(action.payload.localId, '', action.payload.email, '', '', false);
      const token = action.payload.idToken;
      return {
        ...state,
        loggedInUser: user,
        idToken: token,
      };
    }

    default:
      return state;
  }
};

export default UserReducer;
