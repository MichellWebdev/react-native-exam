import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput, Image } from 'react-native';
import ChatRoom from '../../components/chat/ChatRoom';
import ChatMessage from '../../components/chat/ChatMessage';
import { useSelector, useDispatch } from 'react-redux';
import {
  getChatrooms,
  sendMessage,
  getChatroomMessages,
  getChatroomsUsersInfo,
} from '../../redux-store/actions/ChatActions';

const ChatMessages = props => {
  const dispatch = useDispatch();

  // let buttonDisabled = false;
  const [value, onChangeText] = useState('Write message');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { chatroomId } = props.route.params;
  // console.log(id);

  // https://stackoverflow.com/questions/62091146/componentwillmount-for-react-functional-component
  // dispatch(getChatrooms());
  const [chatMessagesScreenMounted, setChatMessagesScreenMounted] = useState(false);
  if (!chatMessagesScreenMounted) {
    dispatch(getChatrooms());
    dispatch(getChatroomsUsersInfo());
    dispatch(getChatroomMessages(chatroomId));
  }
  useEffect(() => {
    setChatMessagesScreenMounted(true);
  }, []);

  // const myChatrooms = useSelector(state => state.chat.myChatrooms);
  const myChatroomMessages = useSelector(state => state.chat.myChatroomMessages);
  const openedNewChatId = useSelector(state => state.chat.openedNewChatId);
  let openingChatroomMessages = [];

  let validChatroomId = chatroomId + '';
  let noMessages = false;

  if (myChatroomMessages == null || myChatroomMessages.length == 0) {
    noMessages = true;
  } else {
    noMessages = false;

    if (openedNewChatId != null || openedNewChatId != undefined) {
      if (chatroomId == openedNewChatId[0]) {
        validChatroomId = openedNewChatId[1];
      }
    }

    // console.log('openedNewChatId: ', openedNewChatId)
    // console.log('chatroomId: ', chatroomId)
    // console.log('validChatroomId: ', validChatroomId)

    myChatroomMessages.forEach(message => {
      // if (message.chatroomId == chatroomId) {
      if (message.chatroomId == validChatroomId) {
        openingChatroomMessages.push(message);
      }
    });

    // console.log(openingChatroomMessages)
  }

  const handleTextInput = text => {
    onChangeText(text);
    text.length == 0 ? setButtonDisabled(true) : setButtonDisabled(false);
  };

  const handleSend = () => {
    // dispatch(sendMessage(chatroomId, value));
    // console.log(validChatroomId)
    dispatch(sendMessage(validChatroomId, value));
    dispatch(getChatroomMessages(validChatroomId));
    onChangeText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.messages}>
        {noMessages ? (
          <Text></Text>
        ) : (
          <FlatList
            data={openingChatroomMessages}
            renderItem={itemData => (
              <ChatMessage chatmessage={itemData.item} img={require('../../assets/images/user.png')} />
            )}
          />
        )}
      </View>
      <View style={styles.inputView}>
        <Image style={styles.tinyLogo} source={require('../../assets/images/user.png')} />
        <TextInput style={styles.textInput} onChangeText={text => handleTextInput(text)} value={value} />
        <Button disabled={buttonDisabled} title='Send' onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  messages: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: 'lightgray',
    marginLeft: 10,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  inputView: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 5,
  },
  tinyLogo: {
    marginTop: -5,
  },
});

export default ChatMessages;

// Old Code
// const chatMessages = useSelector(state => state.chat.chatrooms).find(room => room.id === id).chatMessages;

// const test = useSelector(state => state.chat.test);
// console.log("test");
// console.log(test);

// const handleSend = () => {
//     console.log("value " + value);
//     dispatch(addToChats(value, id));
// };
