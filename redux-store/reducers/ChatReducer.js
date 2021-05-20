import ChatMessage from '../../models/ChatMessage';
import ChatRoom from '../../models/ChatRoom'
import User from '../../models/User';
import { GET_CHATROOMS, CREATE_CHATROOM, SEND_MESSAGE, GET_CHATROOM_MESSAGES, GET_CHATROOMS_USERS_INFO } from '../actions/ChatActions';

const initialState = {
    myChatrooms: null,
    openedNewChatId: null,
    myChatroomMessages: null,
    chatroomsUsersInfo: null
};

const ChatReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CHATROOMS:

            let chatrooms = [];

            // console.log('logged in ID: ', action.payload.loggedInUserId)

            if (action.payload.data != null) {
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
                for (const [key, value] of Object.entries(action.payload.data)) {
                    // console.log(key);
                    // console.log(Object.keys(value))

                    if (value.participants[0] == action.payload.loggedInUserId || value.participants[1] == action.payload.loggedInUserId) {
                        chatrooms.push(new ChatRoom(key, value.participants, new Date(value.createdDate), value.messages))
                    }
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
                    // chatroomMessages.push(new ChatMessage(key, value.chatroomId, value.writtenBy, value.text, new Date(value.createdDate), value.read))

                    // When users are saved with email, name, profile image
                    state.myChatrooms.forEach(chatroom => {
                        if (value.chatroomId == chatroom.id) {
                            chatroomMessages.push(new ChatMessage(key, value.chatroomId, value.writtenBy, value.text, new Date(value.createdDate), value.read))
                        }
                    })
                    // if (value.chatroomId == action.payload.chatroomId) {
                    //     // console.log(value)
                    //     chatroomMessages.push(new ChatMessage(key, value.chatroomId, value.writtenBy, value.text, new Date(value.createdDate), value.read))
                    // }
                }
            }

            // console.log(chatroomMessages)

            return {
                ...state,
                myChatroomMessages: chatroomMessages,
            };

        case GET_CHATROOMS_USERS_INFO:
            let chatroomsUsers = [];

            if (action.payload.data != null) {
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
                for (const [key, value] of Object.entries(action.payload.data)) {
                    // console.log(key);
                    // console.log(Object.keys(value))


                    if (state.myChatrooms !== undefined || state.myChatrooms !== null) {
                        state.myChatrooms.forEach(chatroom => {
                            // console.log('0: ', chatroom.participants[0])
                            // console.log('1: ', chatroom.participants[1])
                            // console.log('myId: ', action.payload.myId)

                            if (chatroom.participants[0] == action.payload.myId && chatroom.participants[1] == value.id) {
                                chatroomsUsers.push(new User(value.id, value.name, value.email, value.profile, null, null, null));
                            } else if (chatroom.participants[1] == action.payload.myId && chatroom.participants[0] == value.id) {
                                chatroomsUsers.push(new User(value.id, value.name, value.email, value.profile, null, null, null));
                            }
                        })
                    }
                }
            }

            // console.log('chatroom users: ', chatroomsUsers)

            return {
                ...state,
                chatroomsUsersInfo: chatroomsUsers
            };

        default:
            return state;
    }
};

export default ChatReducer;


// old
// value.participants.forEach(user => {
//     // When users are only saved as email
//     // if (user == action.payload.loggedInUserEmail) {

//     // When users are saved with email, name, profile image

// });