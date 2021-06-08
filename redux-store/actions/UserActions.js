export const SAVE_USER = 'SAVE_USER';
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const SEARH_USERS = 'SEARH_USERS';
export const RESET_USER_RESEARCH = 'RESET_USER_RESEARCH';
export const COMPLETE_SIGNUP = 'COMPLETE_SIGNUP';
export const LOGOUT = 'LOGOUT';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const EMAIL_IN_USE = 'EMAIL_IN_USE';
export const INVALID_EMAIL_LOGIN = 'INVALID_EMAIL_LOGIN';
export const INVALID_EMAIL_SIGNUP = 'INVALID_EMAIL_SIGNUP';
export const WEAK_PASSWORD = 'WEAK_PASSWORD';

export const logout = () => {
  console.log('User logout successful');
  return {
    type: LOGOUT,
    payload: '',
  };
};

export const saveUser = user => {
  return async (dispatch, getState) => {
    const token = getState().user.idToken;
    const loggedInUser = getState().user.loggedInUser;
    const documentKey = loggedInUser.documentKey;

    const response = await fetch('https://cbsstudentapp-default-rtdb.firebaseio.com/users/' + documentKey + '.json?auth=' + token, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        profile: user.image,
        name: user.name,
        studyProgramme: user.studyProgramme
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log('User information update failed');
    } else {
      console.log('Users information updated');
      dispatch({ type: SAVE_USER, payload: user });
    }
  };
};

export const changeNotification = status => {
  return async (dispatch, getState) => {
    const token = getState().user.idToken;
    const loggedInUser = getState().user.loggedInUser;
    const documentKey = loggedInUser.documentKey;

    const response = await fetch('https://cbsstudentapp-default-rtdb.firebaseio.com/users/' + documentKey + '.json?auth=' + token, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notification: status
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log('User notification update failed');
    } else {
      console.log('Users notification updated');
      // dispatch({ type: CHANGE_NOTIFICATION, payload: status });
    }
  };
}

export const signup = (email, password) => {
  return async (dispatch, getState) => {
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

    if (!response.ok) {
      console.log('Signup Failed');
      if (data.error.errors[0].message == 'EMAIL_EXISTS') {
        dispatch({ type: EMAIL_IN_USE, payload: true });
      } else if (data.error.errors[0].message == 'INVALID_EMAIL') {
        dispatch({ type: INVALID_EMAIL_SIGNUP, payload: true });
      } else if (data.error.errors[0].message.startsWith('WEAK_PASSWORD')) {
        dispatch({ type: WEAK_PASSWORD, payload: true });
      } else {
        dispatch({ type: SIGNUP_ERROR, payload: true });
      }
    } else {
      console.log('Signup Completed');
      dispatch({ type: SIGNUP, payload: data })
    }
  };
};

export const completeSignup = (displayName, photoUrl, studyProgramme) => {
  return async (dispatch, getState) => {
    // const token = data.idToken;
    // const localId = data.localId;

    const token = getState().user.idToken;

    const response = await fetch('https://cbsstudentapp-default-rtdb.firebaseio.com/users.json?auth=' + token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: localId,
        email: signupFirstStage[0],
        profile: photoUrl,
        name: displayName,
        studyProgramme: studyProgramme,
        notification: false,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log('Signup Stage 2 Failed');
    } else {
      console.log('Signup Stage 2 Completed');
      dispatch({
        type: SIGNUP,
        payload: { key: data.name, id: localId, profile: photoUrl, name: displayName, studyProgramme: studyProgramme },
      });
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
    console.log(data)

    if (!response.ok) {
      console.log('User login failed');

      if (data.error.errors[0].message == 'INVALID_EMAIL') {
        dispatch({ type: INVALID_EMAIL_LOGIN, payload: true });
      } else {
        dispatch({ type: LOGIN_ERROR, payload: true });
      }
    } else {
      console.log('User logged in');

      const response2 = await fetch('https://cbsstudentapp-default-rtdb.firebaseio.com/users.json?auth=' + data.idToken, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data2 = await response2.json();

      if (!response2.ok) {
        console.log('Users retrieval failed');
        dispatch({ type: LOGIN_ERROR, payload: true });
      } else {
        console.log('Users retrieved');
        dispatch({ type: LOGIN, payload: { data: data2, localId: data.localId, myEmail: email, idToken: data.idToken } });
      }
    }
  };
};

export const searchUsers = email => {
  return async (dispatch, getState) => {
    const token = getState().user.idToken;

    const response = await fetch('https://cbsstudentapp-default-rtdb.firebaseio.com/users.json?auth=' + token, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.log('User retrieval failed');
    } else {
      console.log('Users retrieved');
      dispatch({ type: SEARH_USERS, payload: { data: data, email: email } });
    }
  };
};

export const resetUserResearch = () => {
  return {
    type: RESET_USER_RESEARCH,
  };
};

