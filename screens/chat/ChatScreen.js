import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// React redux
import { useSelector, useDispatch } from 'react-redux';
import { getChatroomMessages, getChatrooms, removeNewChatInfo } from '../../redux-store/actions/ChatActions';

// Custom components
import ChatRoom from '../../components/chat/ChatRoom';

const Chat = () => {
  const dispatch = useDispatch();

  // https://stackoverflow.com/questions/62091146/componentwillmount-for-react-functional-component
  const [chatScreenMounted, setChatScreenMounted] = useState(false);
  if (!chatScreenMounted) {
    dispatch(getChatrooms());
    dispatch(getChatroomMessages());
  }

  useEffect(() => {
    setChatScreenMounted(true);
  }, []);

  const myChatrooms = useSelector(state => state.chat.myChatrooms);
  const myChatroomMessages = useSelector(state => state.chat.myChatroomMessages);

  let latestMessages = [];
  let myChatroomsCopy = [];

  let noChatroom = false;
  if (myChatrooms == null || myChatrooms.length == 0) {
    noChatroom = true;
  } else if (myChatrooms == undefined) {
    noChatroom = false;
  } else if (myChatroomMessages !== null && myChatroomMessages !== undefined && myChatroomMessages.length !== 0) {
    noChatroom = false;
    myChatroomsCopy = [...myChatrooms];

    myChatrooms.forEach(chatroom => {
      let latestTime = new Date(1900, 1, 1);
      let latestMessage;

      myChatroomMessages.forEach(message => {
        if (message.chatroomId == chatroom.id) {
          if (latestTime < message.createdDate) {
            latestTime = message.createdDate;
            latestMessage = message;
            latestMessages.push(latestMessage);
          }
        }
      });
    });
  }

  return (
    <View style={styles.container}>
      {noChatroom ? (
        <View style={styles.noChatroomContainer}>
          <Text style={styles.noChatroomText}>Looks like you don't have any chat yet.</Text>
          <Text style={styles.noChatroomText}>Try creating one!</Text>
        </View>
      ) : (
        <FlatList
          data={myChatrooms}
          renderItem={itemData => <ChatRoom chatRoom={itemData.item} latestMessages={latestMessages}></ChatRoom>}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noChatroomContainer: {
    marginTop: 250,
  },
  noChatroomText: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    fontSize: 20,
    color: '#989898',
    textAlign: 'center',
  },
});

export default Chat;
