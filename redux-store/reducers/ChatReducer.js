import ChatRoom from '../../models/ChatRoom'
import User from '../../models/User';
import { GET_CHATROOMS, CREATE_CHATROOM, SEND_MESSAGE } from '../actions/ChatActions';

const initialState = {
    myChatrooms: null,
    openedNewChatId: null,
};

const ChatReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CHATROOMS:

            let chatrooms = [];

            if (action.payload.data != null) {
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
                for (const [key, value] of Object.entries(action.payload.data)) {
                    // console.log(key);
                    // console.log(Object.keys(value))
                    value.participants.forEach(user => {
                        if (user == action.payload.loggedInUserEmail) {
                            chatrooms.push(new ChatRoom(key, value.participants, value.createdDate, value.messages))
                        }
                    });
                }
            }

            // console.log(chatrooms)

            return {
                ...state,
                myChatrooms: chatrooms
            };

        case CREATE_CHATROOM:
            // const chatroom = new ChatRoom(action.payload.localId, action.payload.chatroomName)
            // console.log('keys ', Object.keys(action.payload));

            const newChatroom = new ChatRoom(action.payload.id, action.payload.participants, action.payload.createdDate, [])

            // console.log([...state.myChatrooms, newChatroom])
            // const ids = 

            return {
                ...state,
                myChatrooms: [...state.myChatrooms, newChatroom],
                openedNewChatId: [action.payload.systemId, action.payload.id]
                // newChatroom: [...state.newChatroom, newChatroom]
            };

        case SEND_MESSAGE:
            return {
                ...state,
            }

        default:
            return state;
    }
};

export default ChatReducer;
