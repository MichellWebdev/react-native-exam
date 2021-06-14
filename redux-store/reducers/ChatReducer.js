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
  SET_CHATROOM_MESSAGES_READ,
} from '../actions/ChatActions';

const initialState = {
  myChatrooms: null,
  openedNewChatId: null,
  myChatroomMessages: null,
  chatroomsUsersInfo: null,
  newMessage: null,
  allChatMessages: null,
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHATROOMS: {
      let chatrooms = [];

      if (action.payload.data != null) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
        for (const [key, value] of Object.entries(action.payload.data)) {
          if (
            // checking if either one of the participants are in the chat
            value.participants[0] == action.payload.loggedInUser ||
            value.participants[1] == action.payload.loggedInUser
          ) {
            // This is where we add the chatrooms that belong to me
            // So whenever we find a match then we push to the chatrooms array
            // and then add the chatrooms to my Chatrooms
            chatrooms.push(new ChatRoom(key, value.participants, new Date(value.createdDate), value.messages));
          }
        }
      }

      return {
        ...state,
        // only save the chatrooms that belong to me
        myChatrooms: chatrooms,
      };
    }

    case CREATE_CHATROOM: {
      return {
        ...state,
        myChatrooms: [...state.myChatrooms, action.payload.newChatroom],
        openedNewChatId: [action.payload.systemId, action.payload.newChatroom.id],
      };
    }

    case SEND_MESSAGE: {
      let anyUnreadMessage = false;
      state.myChatrooms.forEach(chatroom => {
        if (
          chatroom.participants[0] == action.payload.loggedInUser ||
          chatroom.participants[1] == action.payload.loggedInUser
        ) {
          state.allChatMessages.forEach(message => {
            if (
              message.chatroomId == chatroom.id &&
              message.writtenBy != action.payload.loggedInUser &&
              message.read == false
            ) {
              anyUnreadMessage = true;
            }
          });
        }
      });

      if (anyUnreadMessage) {
        return {
          ...state,
          myChatroomMessages: [...state.myChatroomMessages, action.payload.newMessage],
          newMessage: true,
        };
      } else {
        return {
          ...state,
          myChatroomMessages: [...state.myChatroomMessages, action.payload.newMessage],
          newMessage: null,
        };
      }
    }

    case GET_CHATROOM_MESSAGES: {
      let chatroomMessages = [];
      let allChatMessages = [];

      let anyUnread = false;

      if (action.payload.data != null) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
        for (const [key, value] of Object.entries(action.payload.data)) {
          state.myChatrooms.forEach(chatroom => {
            if (value.chatroomId == chatroom.id) {
              if (value.writtenBy != action.payload.loggedInUser && !value.read) {
                anyUnread = true;
              }

              chatroomMessages.push(
                new ChatMessage(key, value.chatroomId, value.writtenBy, value.text, new Date(value.createdDate), value.read)
              );
            }
          });
        }

        for (const [key, value] of Object.entries(action.payload.data)) {
          allChatMessages.push(
            new ChatMessage(key, value.chatroomId, value.writtenBy, value.text, new Date(value.createdDate), value.read)
          );
        }
      }

      if (anyUnread) {
        return {
          ...state,
          myChatroomMessages: chatroomMessages,
          allChatMessages: allChatMessages,
          newMessage: true,
        };
      } else {
        return {
          ...state,
          myChatroomMessages: chatroomMessages,
          allChatMessages: allChatMessages,
          newMessage: null,
        };
      }
    }

    // grabbing user information (all users)
    case GET_CHATROOMS_USERS_INFO: {
      let chatroomsUsers = [];

      if (action.payload.data != null) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
        // it's a key value pairs database so we grab the keys and values and go through each of them
        for (const [key, value] of Object.entries(action.payload.data)) {
          if (state.myChatrooms !== undefined || state.myChatrooms !== null) {
            state.myChatrooms.forEach(chatroom => {
              // Checking if one of the participants ID is the same as the logged in user
              // and then push the chatrooms to the chatroomUsersInfo so we have the necessary info
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
    }

    case REMOVE_NEW_CHAT_INFO: {
      return {
        ...state,
      };
    }

    case SET_CHATROOM_MESSAGES_READ: {
      chatroomMessages = [];

      if (action.payload != null) {
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

      let anyUnread = false;
      state.myChatrooms.forEach(chatroom => {
        if (
          chatroom.participants[0] == action.payload.loggedInUser ||
          chatroom.participants[1] == action.payload.loggedInUser
        ) {
          state.allChatMessages.forEach(message => {
            if (
              action.payload.chatroomId != message.chatroomId &&
              message.writtenBy != action.payload.loggedInUser &&
              message.read == false
            ) {
              anyUnread = true;
            }
          });
        }
      });

      if (anyUnread) {
        return {
          ...state,
          myChatroomMessages: chatroomMessages,
          newMessage: true,
        };
      } else {
        return {
          ...state,
          myChatroomMessages: chatroomMessages,
          newMessage: null,
        };
      }
    }

    default:
      return state;
  }
};

export default ChatReducer;
