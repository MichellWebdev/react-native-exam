import User from '../../models/User';
import { SAVE_USER, SIGNUP, LOGIN, SEARH_USERS, RESET_USER_RESEARCH, COMPLETE_SIGNUP, LOGOUT } from '../actions/UserActions';

const initialState = {
  loggedInUser: null,
  idToken: null,
  searchUsers: null,
  signupFirstStage: null,
  loggedInUserProfile: null,
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
      }
    }

    case SIGNUP: {
      return {
        ...state,
        signupFirstStage: [action.payload.email, action.payload.password],
      };
    }

    case COMPLETE_SIGNUP: {
      // const user = new User(action.payload.id, actiona.payload.name, state.signupFirstStage[0], action.payload.profile, '', false, action.payload.key);
      // const token = action.payload.idToken;

      return {
        ...state,
        signupFirstStage: null,
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
      // console.log(me);

      return {
        ...state,
        loggedInUser: me,
        idToken: action.payload.idToken,
        loggedInUserProfile: [me.name, me.image, me.documentKey],
      };
    }

    case SEARH_USERS:
      let users = [];

      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
      for (const [key, value] of Object.entries(action.payload.data)) {
        // console.log(key);
        // console.log(value.id);
        // console.log(Object.keys(value))

        if (value.email.startsWith(action.payload.email)) {
          let oneUser = new User(value.id, value.name, value.email, value.profile, '', value.notification, key);
          users.push(oneUser);
        }
      }

      // console.log(users)

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
