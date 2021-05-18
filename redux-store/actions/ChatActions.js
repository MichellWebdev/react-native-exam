import { State } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import ChatMessage from '../../models/ChatMessage';
import ChatRoom from '../../models/ChatRoom';

export const CREATE_CHATROOM = 'CREATE_CHATROOM';
export const GET_CHATROOMS = 'GET_CHATROOMS';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const GET_CHATROOM_MESSAGES = 'GET_CHATROOM_MESSAGES';

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
            // console.log(data)
        } else {
            console.log('Chatrooms retrieved')
            dispatch({ type: GET_CHATROOMS, payload: { data: data, loggedInUserEmail: loggedInUserEmail } });
        }
    }
}

export const createChatroom = (invitedUser, chatroomId) => {
    return async (dispatch, getState) => {

        // Moved to CreateChatRoom.js
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
        const token = getState().user.idToken;

        const myChatrooms = getState().chat.myChatrooms

        // console.log('token: ', token)
        const loggedInUserEmail = loggedInUser.email;
        // console.log('loggedinUser: ', loggedinUser)

        const createdDate = new Date();

        // When users are only saved as email
        // const participants = [loggedInUser.email, invitedUser.email]
        const participants = [{ email: loggedInUser.email, image: loggedInUser.image, name: loggedInUser.name }, { email: invitedUser.email, image: invitedUser.image, name: invitedUser.name }]

        const response = await fetch(
            //https://cbsstudents-38267-default-rtdb.firebaseio.com/chatrooms/<chatroom_id>/chatMessages.json?auth=' + token, {
            'https://cbsstudentapp-default-rtdb.firebaseio.com/chatrooms.json?auth=' + token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                createdDate: createdDate,
                participants: participants
            })
        });

        const data = await response.json(); // json to javascript
        // console.log(data.name);

        if (!response.ok) {
            //There was a problem..
            console.log('Chat Room Not Created');
        } else {
            // chatroom.id = data.name;
            console.log('Chat Room Created');

            const newChatroom = new ChatRoom(data.name, participants, createdDate, []);
            dispatch({ type: CREATE_CHATROOM, payload: { systemId: chatroomId, newChatroom: newChatroom } });
        }
    };
};

export const sendMessage = (chatRoomId, message) => {

    return async (dispatch, getState) => {

        const loggedInUser = getState().user.loggedInUser
        const token = getState().user.idToken;

        const myChatrooms = getState().chat.myChatrooms
        const newChatId = getState().chat.openedNewChatId
        const createdDate = new Date();

        const writtenBy = { email: loggedInUser.email, image: loggedInUser.image, name: loggedInUser.name }

        let chatroomKey;

        if (newChatId != null && newChatId != undefined && chatRoomId == newChatId[0]) {
            myChatrooms.forEach(chatroom => {
                if (chatroom.id == newChatId[1]) {
                    chatroomKey = newChatId[1]
                }
            });
        } else {
            chatroomKey = chatRoomId
        }

        // console.log(chatroomKey)

        const response = await fetch(
            //https://cbsstudents-38267-default-rtdb.firebaseio.com/chatrooms/<chatroom_id>/chatMessages.json?auth=' + token, {
            // 'https://cbsstudentapp-default-rtdb.firebaseio.com/chatrooms/' + chatroomKey + '/messages.json?auth=' + token, {
            'https://cbsstudentapp-default-rtdb.firebaseio.com/chatmessages.json?auth=' + token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                chatroomId: chatroomKey,

                // When users are only saved as email
                // writtenBy: loggedInUser.email,

                // When users are saved with name, profile image, email
                writtenBy: writtenBy,
                text: message,
                createdDate: createdDate
            })
        });

        const data = await response.json(); // json to javascript
        // console.log(data);

        if (!response.ok) {
            console.log('Chat Message Not Sent');
        } else {
            // chatroom.id = data.name;
            console.log('Chat Message Sent');

            // When users are only saved as email
            // const newMessage = new ChatMessage(data.name, chatroomKey, loggedInUser.email, message, createdDate)

            const newMessage = new ChatMessage(data.name, chatroomKey, writtenBy, message, createdDate)
            dispatch({ type: SEND_MESSAGE, payload: newMessage });
        }
    };
};

export const getChatroomMessages = chatroomId => {
    return async (dispatch, getState) => {
        const token = getState().user.idToken;
        const loggedInUserEmail = getState().user.loggedInUser.email;

        const response = await fetch(
            'https://cbsstudentapp-default-rtdb.firebaseio.com/chatmessages.json?auth=' + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        // console.log(Object.keys(data));

        if (!response.ok) {
            console.log('Chatroom Messages Retrieval Failed')
            // console.log(data)
        } else {
            console.log('Chatroom Messages Retrieved')
            dispatch({ type: GET_CHATROOM_MESSAGES, payload: { data: data, chatroomId: chatroomId } });
        }
    }
};