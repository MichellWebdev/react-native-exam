// Need to improve
// (1) signup - instead of second fetch (response2), using Admin SDK instead? 
//              https://firebase.google.com/docs/auth/admin/manage-users

import { State } from 'react-native-gesture-handler';

export const SAVE_USER = 'SAVE_USER';
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const SEARH_USERS = 'SEARH_USERS';
export const RESET_USER_RESEARCH = 'RESET_USER_RESEARCH';

export const saveUser = user => {
  // https://firebase.google.com/docs/reference/rest/auth#section-update-profile
  return {
    type: SAVE_USER,
    payload: user,
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZOK5_QuYUqtARpQyA3wS3qPPb7JXBZrM',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      console.log('There was a problem: signup');
    } else {
      console.log('User signed up')

      const token = data.idToken;
      const localId = data.localId;

      const response2 = await fetch(
        'https://cbsstudentapp-default-rtdb.firebaseio.com/users.json?auth=' + token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ //javascript to json
          userId: localId,
          email: email
        })
      });

      const data2 = await response2.json();
      // console.log(data2);

      if (!response2.ok) {
        console.log('There was a problem');
      } else {
        dispatch({ type: SIGNUP, payload: data });
      }
    }
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBZOK5_QuYUqtARpQyA3wS3qPPb7JXBZrM',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,

          returnSecureToken: true,
        }),
      }
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      console.log('problem');
    } else {
      console.log('User logged in')
      dispatch({ type: LOGIN, payload: data });
    }
  };
};

export const searchUsers = email => {
  return async (dispatch, getState) => {
    const token = getState().user.idToken;

    const response = await fetch(
      'https://cbsstudentapp-default-rtdb.firebaseio.com/users.json?auth=' + token, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const data = await response.json();
    // console.log(Object.keys(data));

    if (!response.ok) {
      console.log('User retrieval failed')
      console.log(data)
    } else {
      console.log('Users retrieved')
      dispatch({ type: SEARH_USERS, payload: { data: data, email: email } });
    }
  }
};

export const resetUserResearch = () => {
  return {
    type: RESET_USER_RESEARCH,
  };
};
