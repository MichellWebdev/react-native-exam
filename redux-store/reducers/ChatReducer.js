import ChatRoom from '../../models/ChatRoom'
import User from '../../models/User';
import { GET_CHATROOMS, CREATE_CHATROOM } from '../actions/ChatActions';

const initialState = {
    myChatrooms: []
};

const ChatReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CHATROOMS:

            let chatrooms = [];

            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
            for (const [key, value] of Object.entries(action.payload.data)) {
                // console.log(key);
                // console.log(Object.keys(value))
                value.participants.forEach(user => {
                    if (user == action.payload.loggedInUserEmail) {
                        chatrooms.push(new ChatRoom(key, value.name, value.participants, value.chatroomImage, value.createdDate))
                    }
                });
            }

            return {
                ...state,
                myChatrooms: chatrooms
            };

        case CREATE_CHATROOM:
            // const chatroom = new ChatRoom(action.payload.localId, action.payload.chatroomName)
            // console.log('keys ', Object.keys(action.payload));

            const newChatroom = new ChatRoom(action.payload.id, action.payload.name, action.payload.participants, action.payload.image, action.payload.createdDate)
            console.log(newChatroom)
            return {
                ...state
            };

        default:
            return state;
    }
};

export default ChatReducer;