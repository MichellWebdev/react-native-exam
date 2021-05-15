import User from '../../models/User';
import { SAVE_USER, SIGNUP, LOGIN, SEARH_USERS, RESET_USER_RESEARCH } from '../actions/UserActions';

const initialState = {
  // Original Code
  // loggedInUser: null,
  // idToken: null,

  // Debugging Code
  loggedInUser: new User('70u0mxeQITdpnkDiQfsRZCtpzEt1', '', 'test@test.com', '', '', false),
  idToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjUzNmRhZWFiZjhkZDY1ZDRkZTIxZTgyNGI4OTlhMWYzZGEyZjg5NTgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2Jzc3R1ZGVudGFwcCIsImF1ZCI6ImNic3N0dWRlbnRhcHAiLCJhdXRoX3RpbWUiOjE2MjEwNzI3MTYsInVzZXJfaWQiOiI3MHUwbXhlUUlUZHBua0RpUWZzUlpDdHB6RXQxIiwic3ViIjoiNzB1MG14ZVFJVGRwbmtEaVFmc1JaQ3RwekV0MSIsImlhdCI6MTYyMTA3MjcxNiwiZXhwIjoxNjIxMDc2MzE2LCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEB0ZXN0LmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.NJqyJFDnir3p7-pP2H2t8axzT0P0hs9yNDl6D61Lf9g7GNLCPk3uKfEgCp4AsnnME_YsVexqAnOLjJ-ih0ouaBLOxFPPr-DhFrQpoITNoESuiHEC288B_R3tkH5Mj3OsJFA7J_82L7VM7o9dn3YCm7xiWFIPIBGEQYEz-bOiQ9aNr3ilfzDzkg-4Dz0oVDU1k_fnFzU3Z514yTI4yvg3wJUxhXCogAhXuMMkfAyqfoZoufrvEi-eGhTVOlqX9i-LgoQUZcMPD8noWgc8Sdo7dMxkHznSW-K_lAH43embeRramkwbKx3jDDJAj601EPIgDAS-CP67As11Z5Ihe9LJRA',

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
