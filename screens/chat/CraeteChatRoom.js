import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/common/Input';
import { createChatroom } from '../../redux-store/actions/ChatActions';
import { getChatrooms } from '../../redux-store/actions/ChatActions';

const CreateChatRoom = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [chatroomName, setChatroomName] = useState('');
  const [chatroomNameValid, setChatroomNameValid] = useState(false);

  const [chatroomUser, setChatroomUser] = useState('');
  const [chatroomUserValid, setChatroomUserValid] = useState(false);

  const [chatroomImage, setChatroomImage] = useState('');
  const [chatroomImageValid, setChatroomImageValid] = useState(true);

  const loggedInUser = useSelector(state => state.user.loggedInUser);
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

  return (
    <View style={styles.container}>
      <Input
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
      />

      <Button title='Create Chatroom' onPress={handleCreateChatroom} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreateChatRoom;
