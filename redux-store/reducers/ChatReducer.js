import ChatMessage from '../../models/ChatMessage';
import ChatRoom from '../../models/ChatRoom'
import User from '../../models/User';
import { GET_CHATROOMS, CREATE_CHATROOM, SEND_MESSAGE, GET_CHATROOM_MESSAGES } from '../actions/ChatActions';

const initialState = {
    myChatrooms: null,
    openedNewChatId: null,
    myChatroomMessages: null,
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
                        // When users are only saved as email
                        // if (user == action.payload.loggedInUserEmail) {

                        // When users are saved with email, name, profile image
                        if (user.id == action.payload.loggedInUserId) {
                            chatrooms.push(new ChatRoom(key, value.participants, new Date(value.createdDate), value.messages))
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

            // const newChatroom = new ChatRoom(action.payload.id, action.payload.participants, action.payload.createdDate, [])

            // console.log([...state.myChatrooms, newChatroom])
            // const ids = 

            return {
                ...state,
                myChatrooms: [...state.myChatrooms, action.payload.newChatroom],
                openedNewChatId: [action.payload.systemId, action.payload.newChatroom.id]
                // newChatroom: [...state.newChatroom, newChatroom]
            };

        case SEND_MESSAGE:

            // const newMessage = new ChatMessage(action.payload.name)

            return {
                ...state,
                myChatroomMessages: [...state.myChatroomMessages, action.payload]
            }

        case GET_CHATROOM_MESSAGES:

            let chatroomMessages = [];

            if (action.payload.data != null) {
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
                for (const [key, value] of Object.entries(action.payload.data)) {
                    // console.log(key);
                    // console.log(Object.keys(value))
                    chatroomMessages.push(new ChatMessage(key, value.chatroomId, value.writtenBy, value.text, new Date(value.createdDate)))

                    // When users are saved with email, name, profile image
                    // if (value.chatroomId == action.payload.chatroomId) {
                    //     // console.log(value)
                    //     chatroomMessages.push(new ChatMessage(key, value.chatroomId, value.writtenBy, value.text, new Date(value.createdDate)))
                    // }
                }
            }

            // console.log(chatroomMessages)

            return {
                ...state,
                myChatroomMessages: chatroomMessages,
            };

        default:
            return state;
    }
};

export default ChatReducer;
