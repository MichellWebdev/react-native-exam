// Need to improve:
// (1) search: x button
// (2) search: cancel button

import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/common/Input';
import ChatUser from '../../components/chat/ChatUser';
import { createChatroom, getChatrooms } from '../../redux-store/actions/ChatActions';
import { searchUsers } from '../../redux-store/actions/UserActions'

const CreateChatRoom = props => {
  // Old
  // const [chatroomName, setChatroomName] = useState('');
  // const [chatroomNameValid, setChatroomNameValid] = useState(false);
  // const [chatroomImage, setChatroomImage] = useState('');
  // const [chatroomImageValid, setChatroomImageValid] = useState(true);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [chatroomUserEmail, setChatroomUserEmail] = useState('');
  const [chatroomUserEmailValid, setChatroomUserEmailValid] = useState(false);

  const loggedInUser = useSelector(state => state.user.loggedInUser);
  const searchMatchingUsers = useSelector(state => state.user.searchUsers);
  const myChatrooms = useSelector(state => state.chat.myChatrooms);
  // console.log(myChatrooms)

  const handleCreateChatroom = () => {
    let oneself = false;
    let alreadyExists = false;

    // Cannot invite oneself
    if (chatroomUser == loggedInUser.email) {
      oneself = true;
      console.log('Cannot create chatroom with yourself');
    } else {
      myChatrooms.forEach(chatroom => {
        chatroom.participants.forEach(user => {
          if (user == chatroomUser) {
            alreadyExists = true;
          }
        });
      });

      if (alreadyExists) {
        console.log('Chatroom already exists with this user');
      } else {
        dispatch(createChatroom(chatroomName, chatroomImage, chatroomUser));
        dispatch(getChatrooms());
        navigation.goBack();
      }
    }
  };

  const handleEmailInput = emailInput => {
    setChatroomUserEmail(emailInput)
    dispatch(searchUsers(emailInput));
  }

  const iconName = 'search-outline'
  const saerchPlaceholder = 'Search user email'
  const errorMessageEmail = 'Please fill out search field'

  return (
    // <View style={styles.container}>
    <View style={styles.createChatContainer}>

      {/* <Input
          label='Chatroom Name'
          error='Please fill out the chatroom name'
          text={chatroomName}
          nameValid={chatroomNameValid}
          onValid={valid => setChatroomNameValid(valid)}
          setContent={content => setChatroomName(content)}
          autoCapitalize={'none'}
        />
        <Input
          label='Chatroom Image'
          error='Please choose the chatroom image'
          text={chatroomImage}
          nameValid={chatroomImageValid}
          onValid={valid => setChatroomImageValid(valid)}
          setContent={content => setChatroomImage(content)}
          autoCapitalize={'none'}
        />
      <Input
        label='Invited User Name'
        error='Please fill out the inviting user name'
        text={chatroomUser}
        nameValid={chatroomUserValid}
        onValid={valid => setChatroomUserValid(valid)}
        setContent={content => setChatroomUser(content)}
        autoCapitalize={'none'}
      /> */}

      <View>
        <Input
          iconName={iconName}
          inputValid={chatroomUserEmailValid}
          placeholder={saerchPlaceholder}
          errorMessage={errorMessageEmail}
          autoCapitalize={'none'}
          onValid={valid => setChatroomUserEmailValid(valid)}
          setContent={content => handleEmailInput(content)}
        />
        <Button title='Cancel' onPress={() => navigation.goBack()}></Button>
      </View>

      {/* <Button title='Create Chatroom' onPress={handleCreateChatroom} /> */}

      <View>
        <FlatList
          data={searchMatchingUsers}
          renderItem={itemData => <ChatUser chatUser={itemData.item}></ChatUser>}
          keyExtractor={item => item.id}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  createChatContainer: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
    marginTop: 30,
  },
});

export default CreateChatRoom;
