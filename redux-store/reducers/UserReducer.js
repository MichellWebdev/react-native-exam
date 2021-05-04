import User from '../../models/User';
import { SAVE_USER, SIGNUP, LOGIN } from '../actions/UserActions';

const initialState = {
  loggedInUser: null,
  // loggedInUser: new User('123123', '', 'a@a.com', '', '', false),
  idToken: null,
  // idToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImNjM2Y0ZThiMmYxZDAyZjBlYTRiMWJkZGU1NWFkZDhiMDhiYzUzODYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2Jzc3R1ZGVudGFwcCIsImF1ZCI6ImNic3N0dWRlbnRhcHAiLCJhdXRoX3RpbWUiOjE2MjAwODU4NjUsInVzZXJfaWQiOiJXTm9UZ3F0VUF4aDlDdmdoM2drQVRGZkN1S2YyIiwic3ViIjoiV05vVGdxdFVBeGg5Q3ZnaDNna0FURmZDdUtmMiIsImlhdCI6MTYyMDA4NTg2NSwiZXhwIjoxNjIwMDg5NDY1LCJlbWFpbCI6ImFAYS5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYUBhLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.LKir3qApmlAS7shfs7I2tQ4t7P4Kv6vhrsJOWaB4jKEeRidze0qumFIbCh7qqsjOV98RWUoxV2dBfaxEKg8t6is5tsS0yN6U8rsWmi2yLHj8Q5yU_JQFv-f7LhKpA2NXt75GhJVcdZbOyo8NgG-1EWqaWccmBCGgPX9LFdJ0KnL7lBESLSO2-grHXlHsbyT-CN46HIkTf1gLbSOfoRI3pi2dBaAe_jAofLE_jKPYyH9da-gvYjFUIPwrcuc0SIa-EFJIGRLZ3bW9ycQzruSJcBI6Xuylbx5e0cV0J_ghXTLh94UKvamZJenIX6ZJUpjurgFONyc5qDjdDuRcbBIpgA'
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

    default:
      return state;
  }
};

export default UserReducer;
