import User from '../../models/User';
import { SAVE_USER, SIGNUP, LOGIN, SEARH_USERS } from '../actions/UserActions';

const initialState = {
  // Original Code
  loggedInUser: null,
  idToken: null,

  // Debugging Code
  // loggedInUser: new User('70u0mxeQITdpnkDiQfsRZCtpzEt1', '', 'test@test.com', '', '', false),
  // idToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjUzNmRhZWFiZjhkZDY1ZDRkZTIxZTgyNGI4OTlhMWYzZGEyZjg5NTgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2Jzc3R1ZGVudGFwcCIsImF1ZCI6ImNic3N0dWRlbnRhcHAiLCJhdXRoX3RpbWUiOjE2MjEwMTMzODUsInVzZXJfaWQiOiI3MHUwbXhlUUlUZHBua0RpUWZzUlpDdHB6RXQxIiwic3ViIjoiNzB1MG14ZVFJVGRwbmtEaVFmc1JaQ3RwekV0MSIsImlhdCI6MTYyMTAxMzM4NSwiZXhwIjoxNjIxMDE2OTg1LCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEB0ZXN0LmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.FUqHsYANjtNc-Eq04G4_CVaF-3CcBbdBXWKZrd862Vfu2JoQ-dgncetbixw3Qoz2mlpE064z8fOUtQVgKUNzteVd_0EGZkq7IaE5lx1uRmDghGkk6vclV0RAlq2VAtabw1fVkAwr6O8ycfLwn2eAN2ydOmUW9tYaNR8cA8eFMhrGE-32OKI1I6mrZ1lsfU3HjESTuixz1gR3Wdd08tsmxNBNMBUFzwxLzlDo9DT3zRu272KhRz2rMFYeflcQovjNhDvrlwPtixxY4I0WG-s0xgfk5ac8MO5_NPwAwfNlyp5o1TcPd6pW5MlonmpviAW1yc0b0J0YkVkpy8DhLQXjCA',

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

    default:
      return state;
  }
};

export default UserReducer;
