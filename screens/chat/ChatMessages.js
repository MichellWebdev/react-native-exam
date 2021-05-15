import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput, Image } from 'react-native';
import ChatRoom from '../../components/chat/ChatRoom';
import ChatMessage from '../../components/chat/ChatMessage';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage } from '../../redux-store/actions/ChatActions';

const ChatMessages = props => {

  const dispatch = useDispatch();

  // const chatMessages = useSelector(state => state.chat.chatrooms).find(room => room.id === id).chatMessages;

  // const test = useSelector(state => state.chat.test);
  // console.log("test");
  // console.log(test);

  // const handleSend = () => {
  //     console.log("value " + value);
  //     dispatch(addToChats(value, id));
  // };

  // let buttonDisabled = false;
  const [value, onChangeText] = useState('Write message');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { id } = props.route.params;
  // console.log(id);

  const myChatrooms = useSelector(state => state.chat.myChatrooms);

  const handleTextInput = text => {
    onChangeText(text);
    text.length == 0 ? setButtonDisabled(true) : setButtonDisabled(false);
  };

  const handleSend = () => {
    dispatch(sendMessage(id, value));
  };

  return (
    <View style={styles.container}>
      <View style={styles.messages}>
        <FlatList
          data={myChatrooms.messages}
          renderItem={itemData => (
            <ChatMessage chatmessage={itemData.item} img={require('../../assets/images/user.png')}></ChatMessage>
          )}></FlatList>
      </View>

      <View style={styles.inputView}>
        <Image style={styles.tinyLogo} source={require('../../assets/images/user.png')} />

        <TextInput style={styles.textInput} onChangeText={text => handleTextInput(text)} value={value} />

        <Button disabled={buttonDisabled} title='Send' onPress={handleSend}></Button>
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
