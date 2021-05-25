// Need to improve:
// SOLVED - (1) dispatch(getChatrooms(())) infinite loop?
// (2) getChatroom at login stage (user action /reducer)? So it will automatically retrieve once logged in?

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChatRoom from '../../components/chat/ChatRoom';
import { CHATROOMS } from '../../data/dummy';
import { useSelector, useDispatch } from 'react-redux';
import { getChatroomMessages, getChatrooms, removeNewChatInfo } from '../../redux-store/actions/ChatActions';

const Chat = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // https://stackoverflow.com/questions/62091146/componentwillmount-for-react-functional-component
  const [chatScreenMounted, setChatScreenMounted] = useState(false);
  if (!chatScreenMounted) {
    // dispatch(removeNewChatInfo());
    // (already running in HomeScreen.js)
    dispatch(getChatrooms());
    // (already running in HomeScreen.js)
    dispatch(getChatroomMessages());
  }
  useEffect(() => {
    setChatScreenMounted(true);
  }, []);

  const myChatrooms = useSelector(state => state.chat.myChatrooms);
  const myChatroomMessages = useSelector(state => state.chat.myChatroomMessages);

  let latestMessages = [];
  let chatroomCopy = [];

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
          // console.log(message.chatroomId, message.text, message.createdDate)
          // console.log(latestTime < message.createdDate)

          if (latestTime < message.createdDate) {
            latestTime = message.createdDate;
            latestMessage = message;
            latestMessages.push(latestMessage);
            // console.log(latestMessage)
          }
        }
      });
    });
  }

  // console.log(latestMessages)

  return (
    <View style={styles.container}>
      {noChatroom ? (
        <View style={styles.noChatroomContainer}>
          <Text style={styles.noChatroomText}>Looks like you don't have any chat yet.</Text>
          {/* <Text style={styles.noChatroomText}>You don't have any chat yet.</Text> */}
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
    marginBottom: 250,
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

// Old (using dummy data)
// const myChatrooms = []
// CHATROOMS.forEach(chatroom => {
//   chatroom.participants.forEach(user => {
//     if (user.id == '1') {
//       myChatrooms.push(chatroom)
//     }
//   })
// })

// if (props.route.params != undefined) {
//   const { openChatUserEmail } = props.route.params;

//   // const newChatroom = useSelector(state => state.chat.newChatroom);

//   // newChatroom.forEach(chatroom => {
//   //   chatroom.participants.forEach(userEmail => {
//   //     if (userEmail == openChatUserEmail) {
//   //       // alreadyExists = true;
//   //       // navigation.goBack();
//   //       // console.log(userEmail)
//   //       // console.log(openChatUserEmail)
//   //       navigation.navigate("ChatMessages", { id: chatroom.id, chatroomName: userEmail });
//   //       // navigation.navigate("CHAT", { openChat: user });
//   //     }
//   //   });
//   // });
// }
