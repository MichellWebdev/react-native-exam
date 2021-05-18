import User from '../../models/User';
import { SAVE_USER, SIGNUP, LOGIN, SEARH_USERS, RESET_USER_RESEARCH } from '../actions/UserActions';

const initialState = {
  // Original Code
  // loggedInUser: null,
  // idToken: null,

  // Debugging Code
  loggedInUser: new User('70u0mxeQITdpnkDiQfsRZCtpzEt1', '', 'test@test.com', '', '', false),
  idToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjUzNmRhZWFiZjhkZDY1ZDRkZTIxZTgyNGI4OTlhMWYzZGEyZjg5NTgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2Jzc3R1ZGVudGFwcCIsImF1ZCI6ImNic3N0dWRlbnRhcHAiLCJhdXRoX3RpbWUiOjE2MjEzMzY3NjQsInVzZXJfaWQiOiI3MHUwbXhlUUlUZHBua0RpUWZzUlpDdHB6RXQxIiwic3ViIjoiNzB1MG14ZVFJVGRwbmtEaVFmc1JaQ3RwekV0MSIsImlhdCI6MTYyMTMzNjc2NCwiZXhwIjoxNjIxMzQwMzY0LCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEB0ZXN0LmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.YqbUjYloeV1RaeNUnTedt8sE8Xvl7l1qZP3qV1GQyblIiLJsNRwWhILIUyCsiTPmmvi4x1TGlCQS3BoiT0Sefmwi7BTVd6q7TgJGk4YWQRaebqYnhqPyN0oW_LOQS9HnwKrB6iQCdclGPV778HpRH12s2XWy8Z09Ew_r-rH-QFcRFLqNV7WC68PuRX59aiFtl7KhfVFmwKMuvt6M_sk09rutLGjkxjhvZ5OdZdU7HyaA0m5misQyAx_EHHJpFDeLS5N2QbXIZQgxCBS6R1RRzEY3K3LhOrt32GEDS5TLhOMjGsdaat9XAIWcVQxqMrt42eCbnSJmsDNkyY-9C80AzQ',

  searchUsers: null
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP: {
      return { ...state };
    }

    case SAVE_USER: {
      return {
        ...state,
        loggedInUser: action.payload,
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

    case SEARH_USERS:

      let users = [];

      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
      for (const [key, value] of Object.entries(action.payload.data)) {
        // console.log(key);
        // console.log(value.userId);
        // console.log(Object.keys(value))

        if (value.email.startsWith(action.payload.email)) {
          let oneUser = new User(value.userId, '', value.email, '', '', false);
          users.push(oneUser)
        }
      }

      return {
        ...state,
        searchUsers: users
      };

    case RESET_USER_RESEARCH:
      return {
        ...state,
        searchUsers: null
      };

    default:
      return state;
  }
};

export default UserReducer;
