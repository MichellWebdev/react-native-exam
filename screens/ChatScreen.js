import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import ChatRoom from '../components/chat/ChatRoom';
import { CHATROOMS } from '../data/dummy';
import { useSelector, useDispatch } from 'react-redux';

const Chat = props => {
  return (
    <View style={styles.container}>

      <FlatList
        data={CHATROOMS}
        renderItem={itemData => (
          <ChatRoom chatroom={itemData.item}></ChatRoom>
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
