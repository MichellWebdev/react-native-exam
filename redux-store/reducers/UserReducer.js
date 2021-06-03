import User from '../../models/User';
import { SAVE_USER, SIGNUP, LOGIN, SEARH_USERS, RESET_USER_RESEARCH, COMPLETE_SIGNUP, LOGOUT, LOGIN_ERROR } from '../actions/UserActions';

const initialState = {
  loggedInUser: null,
  idToken: null,
  searchUsers: null,
  signupFirstStage: null,
  loggedInUserProfile: null,
  loggedOut: null,
  loginError: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT: {
      return {
        ...state,
        loggedInUser: null,
        idToken: null,
        searchUsers: null,
        signupFirstStage: null,
        loggedInUserProfile: null,
        loggedOut: true,
        loginError: null,
      };
    }

    case LOGIN_ERROR: {
      return {
        ...state,
        loggedInUser: null,
        idToken: null,
        searchUsers: null,
        signupFirstStage: null,
        loggedInUserProfile: null,
        loggedOut: null,
        loginError: true,
      }
    }

    case SIGNUP: {
      return {
        ...state,
        signupFirstStage: [action.payload.email, action.payload.password],
        loggedOut: null,
        loginError: null,
      };
    }

    case COMPLETE_SIGNUP: {
      return {
        ...state,
        signupFirstStage: null,
        loggedOut: null,
        loginError: null,
      };
    }

    case SAVE_USER: {
      return {
        ...state,
        loggedInUser: action.payload,
      };
    }

    case LOGIN: {
      let me;
      if (action.payload.data != null) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
        for (const [key, value] of Object.entries(action.payload.data)) {
          if (value.email == action.payload.myEmail) {
            me = new User(
              action.payload.localId,
              value.name,
              value.email,
              value.profile,
              value.studyProgramme,
              value.notification,
              key
            );
          }
        }
      }

      return {
        ...state,
        loggedInUser: me,
        idToken: action.payload.idToken,
        loggedInUserProfile: [me.name, me.image, me.documentKey],
        loggedOut: null,
        loginError: null,
      };
    }

    case SEARH_USERS:
      let users = [];

      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
      for (const [key, value] of Object.entries(action.payload.data)) {
        if (value.email.startsWith(action.payload.email)) {
          let oneUser = new User(value.id, value.name, value.email, value.profile, '', value.notification, key);
          users.push(oneUser);
        }
      }

      return {
        ...state,
        searchUsers: users,
      };

    case RESET_USER_RESEARCH:
      return {
        ...state,
        searchUsers: null,
      };

    default:
      return state;
  }
};

export default UserReducer;
