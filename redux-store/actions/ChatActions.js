import { State } from 'react-native-gesture-handler';

export const SAVE_CHATROOM = 'SAVE_CHATROOM';

export const saveChatRoom = (email, password) => {
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
