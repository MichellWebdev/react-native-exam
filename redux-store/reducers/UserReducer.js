import User from '../../models/User';
import { SAVE_USER, SIGNUP, LOGIN, SEARH_USERS, RESET_USER_RESEARCH } from '../actions/UserActions';

const initialState = {
  // Original Code
  // loggedInUser: null,
  // idToken: null,

  // Debugging Code (test@test.com)
  loggedInUser: new User('70u0mxeQITdpnkDiQfsRZCtpzEt1', '', 'test@test.com', '', '', false),
  idToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjUzNmRhZWFiZjhkZDY1ZDRkZTIxZTgyNGI4OTlhMWYzZGEyZjg5NTgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2Jzc3R1ZGVudGFwcCIsImF1ZCI6ImNic3N0dWRlbnRhcHAiLCJhdXRoX3RpbWUiOjE2MjEzNDc5NzMsInVzZXJfaWQiOiI3MHUwbXhlUUlUZHBua0RpUWZzUlpDdHB6RXQxIiwic3ViIjoiNzB1MG14ZVFJVGRwbmtEaVFmc1JaQ3RwekV0MSIsImlhdCI6MTYyMTM0Nzk3MywiZXhwIjoxNjIxMzUxNTczLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEB0ZXN0LmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.SRSrdLej4UdPIQnZ1n7HmHsX4CxtnSitHkyL09aRGIHQK0KlAVPLPxKOVbc_6wGHSXT7DGu7G3rSA3Oo97cacWZrSH8kOj4nE6ZFuaEJtRxRZQV4ZK59kTVWTjdTnaZo9hoRc8auoureAXNgivNYImAkwhKIY3Q2vKvbP5VCJLRP9k3a0nQXkpPd-S_hy2ImLdjaTELUxARmvB0aTM3q0USbHNRn5iN-2XsntrfJ0ILRy2AU-AX3K7Doxn-6tlt0IBBEKV6iim5wNSziol18LHwBXE-hMyfnnBEA-UueP87hfbEYzMpF9DECT5vfzuSJ_vayh1lING0R-mEPmfkhbg',

  // (a@a.com)
  // loggedInUser: new User('KqpbiwkGMqS2Cfwd0gx2HAQTdkh2', '', 'a@a.com', '', '', false),
  // idToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjUzNmRhZWFiZjhkZDY1ZDRkZTIxZTgyNGI4OTlhMWYzZGEyZjg5NTgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2Jzc3R1ZGVudGFwcCIsImF1ZCI6ImNic3N0dWRlbnRhcHAiLCJhdXRoX3RpbWUiOjE2MjEzNDI1MjEsInVzZXJfaWQiOiJLcXBiaXdrR01xUzJDZndkMGd4MkhBUVRka2gyIiwic3ViIjoiS3FwYml3a0dNcVMyQ2Z3ZDBneDJIQVFUZGtoMiIsImlhdCI6MTYyMTM0MjUyMSwiZXhwIjoxNjIxMzQ2MTIxLCJlbWFpbCI6ImFAYS5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYUBhLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.Cdq3KkojXbD9nssc8GDCjGanGiFdPTbpD5rPI9OPRsqlzMv2yPFYm7cBfIEwK2g6TQ7fuFeO74sRXEW4VpJrYPO6I63A0soNeeQwRaS3AWnhXwko18VkfxrxVK0mdWOIowi7tio6_6tiUevVJx_WF8dR5xqgE7ycu9ZwD0WCxuwVP89pj_GvAj66sqyYvAa1YogLs296AEjUpR2qtpcftSFe6gbvii0cZ75lYrt4nyDxkeTTvyTZ0MNrxWd3vzwFr4Tvg3Z3kLAtP2x3TmmkjH3orHrxtVOg8JLZ7WPYrRJhOf9eTdtSZ51URMHyG9lMvP7AdPMkoSgniM5ThaX3kg',

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
