import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Chat = props => {
  return (
    <View style={styles.chatContainer}>
      <Text>Chat</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
});

export default Chat;
