import ChatMessage from '../../models/ChatMessage';
import ChatRoom from '../../models/ChatRoom';
import User from '../../models/User';

import {
  GET_CHATROOMS,
  CREATE_CHATROOM,
  SEND_MESSAGE,
  GET_CHATROOM_MESSAGES,
  GET_CHATROOMS_USERS_INFO,
  REMOVE_NEW_CHAT_INFO,
} from '../actions/ChatActions';

const initialState = {
  myChatrooms: null,
  openedNewChatId: null,
  myChatroomMessages: null,
  chatroomsUsersInfo: null,
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHATROOMS:
      let chatrooms = [];

      if (action.payload.data != null) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
        for (const [key, value] of Object.entries(action.payload.data)) {
          if (
            value.participants[0] == action.payload.loggedInUserId ||
            value.participants[1] == action.payload.loggedInUserId
          ) {
            chatrooms.push(new ChatRoom(key, value.participants, new Date(value.createdDate), value.messages));
          }
        }
      }

      return {
        ...state,
        myChatrooms: chatrooms,
      };

    case CREATE_CHATROOM:
      return {
        ...state,
        myChatrooms: [...state.myChatrooms, action.payload.newChatroom],
        openedNewChatId: [action.payload.systemId, action.payload.newChatroom.id],
      };

    case SEND_MESSAGE:
      return {
        ...state,
        myChatroomMessages: [...state.myChatroomMessages, action.payload],
      };

    case GET_CHATROOM_MESSAGES:
      let chatroomMessages = [];

      if (action.payload.data != null) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
        for (const [key, value] of Object.entries(action.payload.data)) {
          state.myChatrooms.forEach(chatroom => {
            if (value.chatroomId == chatroom.id) {
              chatroomMessages.push(
                new ChatMessage(key, value.chatroomId, value.writtenBy, value.text, new Date(value.createdDate), value.read)
              );
            }
          });
        }
      }

      return {
        ...state,
        myChatroomMessages: chatroomMessages,
      };

    case GET_CHATROOMS_USERS_INFO:
      let chatroomsUsers = [];

      if (action.payload.data != null) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
        for (const [key, value] of Object.entries(action.payload.data)) {
          if (state.myChatrooms !== undefined || state.myChatrooms !== null) {
            state.myChatrooms.forEach(chatroom => {
              if (chatroom.participants[0] == action.payload.myId && chatroom.participants[1] == value.id) {
                chatroomsUsers.push(new User(value.id, value.name, value.email, value.profile, null, null, null));
              } else if (chatroom.participants[1] == action.payload.myId && chatroom.participants[0] == value.id) {
                chatroomsUsers.push(new User(value.id, value.name, value.email, value.profile, null, null, null));
              }
            });
          }
        }
      }

      return {
        ...state,
        chatroomsUsersInfo: chatroomsUsers,
      };

    case REMOVE_NEW_CHAT_INFO:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default ChatReducer;
