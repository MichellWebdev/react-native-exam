import { State } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import ChatRoom from '../../models/ChatRoom';

export const CREATE_CHATROOM = 'CREATE_CHATROOM';
export const GET_CHATROOMS = 'GET_CHATROOMS';

export const getChatrooms = () => {

    return async (dispatch, getState) => {
        const token = getState().user.idToken;
        const loggedinUser = getState().user.loggedInUser.id;

        const response = await fetch(
            'https://cbsstudentapp-default-rtdb.firebaseio.com/chatrooms.json?auth=' + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        // console.log(Object.keys(data));

        if (!response.ok) {
            console.log('Chatroom retrieval failed')
        } else {
            console.log('Chatrooms retrieved')
            dispatch({ type: GET_CHATROOMS, payload: data });
        }
    }
}

export const createChatroom = (chatroomName, chatroomImage, chatroomUser) => {
    return async (dispatch, getState) => {

        let oneself = false;
        let alreadyExists = false;

        const loggedinUser = getState().user.loggedInUser
        const myChatrooms = getState().chat.myChatrooms

        console.log(chatroomUser)

        // Cannot invite oneself 
        if (chatroomUser == loggedinUser.email) {
            oneself = true;
            console.log('Cannot create chatroom with yourself')
        }

        if (!oneself) {
            myChatrooms.forEach(chatroom => {
                chatroom.participants.forEach(user => {

                    console.log(user.email)
                    if (user.email == chatroomUser) {
                        alreadyExists = true;
                    }
                })
            });

            if (alreadyExists) {
                console.log('Chatroom already exists with this user')
            }

            if (!oneself && !alreadyExists) {
                const token = getState().user.idToken;
                // console.log('token: ', token)
                const loggedinUserEmail = loggedinUser.email;
                // console.log('loggedinUser: ', loggedinUser)

                const createdDate = new Date();

                const response = await fetch(
                    // get url from your! firebase realtime database.

                    // to save a chat message in a chat room:
                    //https://cbsstudents-38267-default-rtdb.firebaseio.com/chatrooms/<chatroom_id>/chatMessages.json?auth=' + token, {
                    'https://cbsstudentapp-default-rtdb.firebaseio.com/chatrooms.json?auth=' + token, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ //javascript to json
                        name: chatroomName,
                        createdDate: createdDate,
                        participants: [loggedinUserEmail, chatroomUser],
                        chatroomImage: chatroomImage
                    })
                });

                const data = await response.json(); // json to javascript
                // console.log(data);

                if (!response.ok) {
                    //There was a problem..
                } else {
                    // chatroom.id = data.name;
                    console.log('Chat Room Created');
                    dispatch({ type: CREATE_CHATROOM, payload: { id: data['name'].name, name: chatroomName, image: chatroomImage, participants: [loggedinUser, chatroomUser], createdDate: createdDate } });
                }
            }
        }
    };
};
