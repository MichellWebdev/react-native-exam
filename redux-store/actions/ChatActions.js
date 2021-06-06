import ChatMessage from '../../models/ChatMessage';
import ChatRoom from '../../models/ChatRoom';

export const CREATE_CHATROOM = 'CREATE_CHATROOM';
export const GET_CHATROOMS = 'GET_CHATROOMS';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const GET_CHATROOM_MESSAGES = 'GET_CHATROOM_MESSAGES';
export const GET_CHATROOMS_USERS_INFO = 'GET_CHATROOM_USER_INFO';
export const REMOVE_NEW_CHAT_INFO = 'REMOVE_NEW_CHAT_INFO';
export const SET_CHATROOM_MESSAGES_READ = 'SET_CHATROOM_MESSAGES_READ';

export const getChatrooms = () => {
  return async (dispatch, getState) => {
    const token = getState().user.idToken;
    const loggedInUser = getState().user.loggedInUser;

    const response = await fetch('https://cbsstudentapp-default-rtdb.firebaseio.com/chatrooms.json?auth=' + token, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.log('Chatroom retrieval failed');
    } else {
      // console.log('Chatrooms retrieved');
      dispatch({ type: GET_CHATROOMS, payload: { data: data, loggedInUserId: loggedInUser.id } });
    }
  };
};

export const createChatroom = (invitedUser, chatroomId) => {
  return async (dispatch, getState) => {
    const loggedInUser = getState().user.loggedInUser;
    const token = getState().user.idToken;

    const myChatrooms = getState().chat.myChatrooms;

    const loggedInUserEmail = loggedInUser.email;

    const createdDate = new Date();

    // When users are only saved as email
    const participants = [loggedInUser.id, invitedUser.id];

    const response = await fetch('https://cbsstudentapp-default-rtdb.firebaseio.com/chatrooms.json?auth=' + token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        createdDate: createdDate,
        participants: participants,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log('Chat Room Not Created');
    } else {
      console.log('Chat Room Created');

      const newChatroom = new ChatRoom(data.name, participants, createdDate, []);
      dispatch({ type: CREATE_CHATROOM, payload: { systemId: chatroomId, newChatroom: newChatroom } });
    }
  };
};

export const sendMessage = (chatRoomId, message) => {
  return async (dispatch, getState) => {
    const loggedInUser = getState().user.loggedInUser;
    const token = getState().user.idToken;

    const myChatrooms = getState().chat.myChatrooms;
    const newChatId = getState().chat.openedNewChatId;
    const createdDate = new Date();

    const writtenBy = loggedInUser.id;

    const response = await fetch('https://cbsstudentapp-default-rtdb.firebaseio.com/chatmessages.json?auth=' + token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        chatroomId: chatRoomId,
        writtenBy: writtenBy,
        text: message,
        createdDate: createdDate,
        read: false,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log('Chat Message Not Sent');
    } else {
      console.log('Chat Message Sent');

      const newMessage = new ChatMessage(data.name, chatRoomId, writtenBy, message, createdDate, false);
      dispatch({ type: SEND_MESSAGE, payload: newMessage });
    }
  };
};

export const getChatroomMessages = chatroomId => {
  return async (dispatch, getState) => {
    const token = getState().user.idToken;

    const response = await fetch('https://cbsstudentapp-default-rtdb.firebaseio.com/chatmessages.json?auth=' + token, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.log('Chatroom Messages Retrieval Failed');
    } else {
      // console.log('Chatroom Messages Retrieved');
      dispatch({ type: GET_CHATROOM_MESSAGES, payload: { data: data, chatroomId: chatroomId } });
    }
  };
};

export const getChatroomsUsersInfo = () => {
  return async (dispatch, getState) => {
    const token = getState().user.idToken;
    const loggedInUser = getState().user.loggedInUser;
    const chatrooms = getState().chat.myChatrooms;

    const response = await fetch('https://cbsstudentapp-default-rtdb.firebaseio.com/users.json?auth=' + token, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.log('Chatroom User Information Retrieval Failed');
    } else {
      // console.log('Chatroom User Information Retrieved');
      dispatch({ type: GET_CHATROOMS_USERS_INFO, payload: { data: data, myId: loggedInUser.id } });
    }
  };
};

export const removeNewChatInfo = () => {
  return {
    type: REMOVE_NEW_CHAT_INFO,
    payload: '',
  };
};

export const setChatroomMessagesRead = chatroomId => {
  return async (dispatch, getState) => {
    const token = getState().user.idToken;
    const loggedInUser = getState().user.loggedInUser;
    const myChatroomMessages = getState().chat.myChatroomMessages;

    for (let index = 0; index < myChatroomMessages.length; index++) {
      if (myChatroomMessages[index].chatroomId == chatroomId && myChatroomMessages[index].writtenBy != loggedInUser.id) {
        const response1 = await fetch('https://cbsstudentapp-default-rtdb.firebaseio.com/chatmessages/' + myChatroomMessages[index].id + '.json?auth=' + token, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            read: true
          }),
        });

        if (!response1.ok) {
          console.log('Chat messages not read');
        } else {
          console.log('Chat messages read');

          const response2 = await fetch('https://cbsstudentapp-default-rtdb.firebaseio.com/chatmessages.json?auth=' + token, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const data = await response2.json();

          if (!response2.ok) {
            console.log('Chatroom messages retrieval failed');
          } else {
            // console.log('Chatroom messages Retrieved');
            dispatch({ type: SET_CHATROOM_MESSAGES_READ, payload: data });
          }
        }
      }
    }
  };
}