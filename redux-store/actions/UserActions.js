export const SAVE_USER = 'SAVE_USER';
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const SEARH_USERS = 'SEARH_USERS';
export const RESET_USER_RESEARCH = 'RESET_USER_RESEARCH';
export const COMPLETE_SIGNUP = 'COMPLETE_SIGNUP';
export const LOGOUT = 'LOGOUT';

export const logout = () => {
  console.log('User logout successful');
  return {
    type: LOGOUT,
    payload: '',
  };
};

export const saveUser = user => {
  return {
    type: SAVE_USER,
    payload: user,
  };
};

export const signup = (email, password) => {
  return {
    type: SIGNUP,
    payload: { email: email, password: password },
  };
};

export const completeSignup = (displayName, photoUrl, studyProgramme) => {
  return async (dispatch, getState) => {
    const signupFirstStage = getState().user.signupFirstStage;

    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZOK5_QuYUqtARpQyA3wS3qPPb7JXBZrM',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: signupFirstStage[0],
          password: signupFirstStage[1],
          returnSecureToken: true,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log('Signup Failed');
    } else {
      console.log('Signup Completed');

      const token = data.idToken;
      const localId = data.localId;

      const response2 = await fetch('https://cbsstudentapp-default-rtdb.firebaseio.com/users.json?auth=' + token, {
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
          notification: true,
        }),
      });

      const data2 = await response2.json();

      if (!response2.ok) {
        console.log('Signup Stage 2 Failed');
      } else {
        console.log('Signup Stage 2 Completed');
        dispatch({
          type: SIGNUP,
          payload: { key: data2.name, id: localId, profile: photoUrl, name: displayName, studyProgramme: studyProgramme },
        });
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

    if (!response.ok) {
      console.log('problem');
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
      } else {
        console.log('Useres retrieved');
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
      console.log(data);
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
