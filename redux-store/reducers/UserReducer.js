import User from '../../models/User';
import { SAVE_USER, SIGNUP, LOGIN } from '../actions/UserActions';

const initialState = {
  // loggedInUser: null,
  loggedInUser: new User('70u0mxeQITdpnkDiQfsRZCtpzEt1', '', 'test@test.com', '', '', false),
  // idToken: null,
  idToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImNjM2Y0ZThiMmYxZDAyZjBlYTRiMWJkZGU1NWFkZDhiMDhiYzUzODYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2Jzc3R1ZGVudGFwcCIsImF1ZCI6ImNic3N0dWRlbnRhcHAiLCJhdXRoX3RpbWUiOjE2MjAxMTg0MjMsInVzZXJfaWQiOiI3MHUwbXhlUUlUZHBua0RpUWZzUlpDdHB6RXQxIiwic3ViIjoiNzB1MG14ZVFJVGRwbmtEaVFmc1JaQ3RwekV0MSIsImlhdCI6MTYyMDExODQyMywiZXhwIjoxNjIwMTIyMDIzLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEB0ZXN0LmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.aCIF9dQ6SuEyIoEQlxXx5CA5ZmCzWfVa4VtxDlwLYpbV-1E6P68QqHBcKI4dzNNhxGZG1hA-nS3_pcOr49EXkuepcJdn8Tm74XpNzFZvdWVXT5BFf83C4D-paDT38vKuFjIwFRaRvlFsu7oy0V6qBAWXuVhND1QzMsXNILYzYOvkQbXDXoB14plrlemqpauAA5lCelsY86bMDjHhrynT4L8OP3XegxPmjZjwepDkCoXkHizLB__WM9tLqM0j81YMtkHqTu1m_oH2dNUJY-1Iq5OK0G5559-n_OA75pyQlouFW1KzfMKd_sxQlL7i5p89XhfBy4NyPDViYrMutCVTDQ'
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
