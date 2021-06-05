import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput, Image } from 'react-native';

// React redux
import { useSelector, useDispatch } from 'react-redux';
import {
  getChatrooms,
  sendMessage,
  getChatroomMessages,
  getChatroomsUsersInfo,
  setChatroomMessagesRead,
} from '../../redux-store/actions/ChatActions';

// Custom components
import ChatMessage from '../../components/chat/ChatMessage';
import { images } from '../../assets/images/images';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ChatMessages = props => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state.user.loggedInUser || {});

  // let buttonDisabled = false;
  const [value, onChangeText] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { chatroomId } = props.route.params;
  const { participantImage } = props.route.params;
  const { participantName } = props.route.params;

  // https://stackoverflow.com/questions/62091146/componentwillmount-for-react-functional-component
  const [chatMessagesScreenMounted, setChatMessagesScreenMounted] = useState(false);
  if (!chatMessagesScreenMounted) {
    dispatch(getChatrooms());
    dispatch(getChatroomsUsersInfo());
    // dispatch(setChatroomMessagesRead(chatroomId));
    dispatch(getChatroomMessages(chatroomId));
  }
  useEffect(() => {
    setChatMessagesScreenMounted(true);
  }, []);

  setInterval(() => {
    dispatch(getChatroomMessages(chatroomId));
  }, 10000);

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

    myChatroomMessages.forEach(message => {
      if (message.chatroomId == validChatroomId) {
        openingChatroomMessages.push(message);
      }
    });
  }

  const handleTextInput = text => {
    onChangeText(text);
    text.length == 0 ? setButtonDisabled(true) : setButtonDisabled(false);
  };

  const handleSend = () => {
    dispatch(sendMessage(validChatroomId, value));
    dispatch(getChatroomMessages(validChatroomId));
    onChangeText('');
  };

  let path = '';
  switch (loggedInUser.image) {
    case 0:
      path = images.default.uri;
      break;
    case 1:
      path = images.user1.uri;
      break;
    case 2:
      path = images.user2.uri;
      break;
    case 3:
      path = images.user3.uri;
      break;
    case 4:
      path = images.user4.uri;
      break;
    default:
      path = require('../../assets/images/profile-image-placeholder.png');
  }

  return (
    <View style={styles.container}>
      <View style={styles.messages}>
        {noMessages ? (
          <Text></Text>
        ) : (
          <FlatList
            data={openingChatroomMessages}
            showsVerticalScrollIndicator={false}
            renderItem={itemData => (
              <ChatMessage chatmessage={itemData.item} img={participantImage} participantName={participantName} />
            )}
          />
        )}
      </View>
      <View style={styles.inputView}>
        {loggedInUser.image === '' ? (
          <Image style={styles.tinyLogo} source={require('../../assets/images/profile-image-placeholder.png')} />
        ) : (
          <Image style={styles.tinyLogo} source={path} />
        )}
        <TextInput
          autoCorrect={false}
          style={styles.textInput}
          onChangeText={text => handleTextInput(text)}
          value={value}
          placeholder={'Write message'} />
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
  },
  inputView: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    alignItems: 'center',
  },
  tinyLogo: {
    marginTop: -3,
    width: 30,
    height: 30,
    borderRadius: 150,
  },
});

export default ChatMessages;
