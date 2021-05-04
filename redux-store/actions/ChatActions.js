import { State } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import ChatRoom from '../../models/ChatRoom';

export const CREATE_CHATROOM = 'CREATE_CHATROOM';
export const GET_CHATROOMS = 'GET_CHATROOMS';

export const getChatrooms = () => {

    return async (dispatch, getState) => {
        const token = getState().user.idToken;
        const loggedInUserEmail = getState().user.loggedInUser.email;

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
            dispatch({ type: GET_CHATROOMS, payload: { data: data, loggedInUserEmail: loggedInUserEmail } });
        }
    }
}

export const createChatroom = (chatroomName, chatroomImage, chatroomUser) => {
    return async (dispatch, getState) => {

        // let oneself = false;
        // let alreadyExists = false;

        // // Cannot invite oneself 
        // if (chatroomUser == loggedinUser.email) {
        //     oneself = true;
        //     console.log('Cannot create chatroom with yourself')
        // }

        // if (!oneself) {
        //     myChatrooms.forEach(chatroom => {
        //         chatroom.participants.forEach(user => {
        //             if (user == chatroomUser) {
        //                 alreadyExists = true;
        //             }
        //         })
        //     });

        //     // Cannot create chatroom with same user again
        //     if (alreadyExists) {
        //         console.log('Chatroom already exists with this user')
        //     }

        //     if (!oneself && !alreadyExists) {

        //     }
        // }

        const loggedInUser = getState().user.loggedInUser
        const myChatrooms = getState().chat.myChatrooms

        const token = getState().user.idToken;
        // console.log('token: ', token)
        const loggedInUserEmail = loggedInUser.email;
        // console.log('loggedinUser: ', loggedinUser)

        const createdDate = new Date();

        const response = await fetch(
            //https://cbsstudents-38267-default-rtdb.firebaseio.com/chatrooms/<chatroom_id>/chatMessages.json?auth=' + token, {
            'https://cbsstudentapp-default-rtdb.firebaseio.com/chatrooms.json?auth=' + token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                name: chatroomName,
                createdDate: createdDate,
                participants: [loggedInUserEmail, chatroomUser],
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
            dispatch({ type: CREATE_CHATROOM, payload: { id: data['name'].name, name: chatroomName, image: chatroomImage, participants: [loggedInUserEmail, chatroomUser], createdDate: createdDate } });
        }
    };
};
