import { State } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

export const CREATE_CHATROOM = 'SAVE_CHATROOM';

export const createChatroom = (chatroomName, chatroomImage, chatroomUser) => {


    return async (dispatch, getState) => {

        // let chatroom = new ChatRoom('', new Date(), chatroomName, []);
        const token = getState().user.idToken;
        console.log('token: ', token)

        const createdDate = new Date();
        const loggedinUser = '1'

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
                participants: [loggedinUser, chatroomUser],
                chatroomImage: chatroomImage
            })
        });

        const data = await response.json(); // json to javascript
        console.log(data);

        if (!response.ok) {
            //There was a problem..
        } else {
            // chatroom.id = data.name;
            dispatch({ type: CREATE_CHATROOM, payload: { chatroomName, chatroomImage, chatroomUser, createdDate } });
        }
    };
};
