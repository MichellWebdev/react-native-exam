// Need to improve:
// (1) dispatch(getChatrooms(())) infinite loop?

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import ChatRoom from '../../components/chat/ChatRoom';
import { CHATROOMS } from '../../data/dummy';
import { useSelector, useDispatch } from 'react-redux';
import { getChatrooms } from '../../redux-store/actions/ChatActions';

const Chat = props => {
  const dispatch = useDispatch();

  // https://stackoverflow.com/questions/62091146/componentwillmount-for-react-functional-component
  // dispatch(getChatrooms());
  const [chatScreenMounted, setChatScreenMounted] = useState(false)
  if (!chatScreenMounted) { dispatch(getChatrooms()); }
  useEffect(() => { setChatScreenMounted(true) }, [])

  // Old (using dummy data)
  // const myChatrooms = []
  // CHATROOMS.forEach(chatroom => {
  //   chatroom.participants.forEach(user => {
  //     if (user.id == '1') {
  //       myChatrooms.push(chatroom)
  //     }
  //   })
  // })

  const myChatrooms = useSelector(state => state.chat.myChatrooms);

  return (
    <View style={styles.container}>
      <FlatList
        data={myChatrooms}
        renderItem={itemData => <ChatRoom chatRoom={itemData.item}></ChatRoom>}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
});

export default Chat;
