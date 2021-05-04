import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import ChatRoom from '../../components/chat/ChatRoom';
import { CHATROOMS } from '../../data/dummy';
import { useSelector, useDispatch } from 'react-redux';
import { getChatrooms } from '../../redux-store/actions/ChatActions'

const Chat = props => {

  const dispatch = useDispatch();
  dispatch(getChatrooms());

  const myChatrooms = []

  CHATROOMS.forEach(chatroom => {
    chatroom.participants.forEach(user => {
      if (user.id == '1') {
        myChatrooms.push(chatroom)
      }
    })
  })

  return (
    <View style={styles.container}>

      <FlatList
        data={myChatrooms}
        renderItem={itemData => (
          <ChatRoom chatRoom={itemData.item}></ChatRoom>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default Chat;
