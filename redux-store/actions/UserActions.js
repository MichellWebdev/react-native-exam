import { State } from 'react-native-gesture-handler';

export const SAVE_USER = 'SAVE_USER';

export const SIGNUP = 'SIGNUP';

export const LOGIN = 'LOGIN';

export const saveUser = user => {
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
      console.log('There was a problem');
    } else {
      dispatch({ type: SIGNUP, payload: data });
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
      dispatch({ type: LOGIN, payload: data });
    }
  };
};
