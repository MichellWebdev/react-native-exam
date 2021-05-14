// Need to improve:
// (1) search: x button
// (2) search: cancel button

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/common/Input';
import ChatUser from '../../components/chat/ChatUser';
import { createChatroom, getChatrooms } from '../../redux-store/actions/ChatActions';
import { searchUsers, resetUserResearch } from '../../redux-store/actions/UserActions'

const CreateChatRoom = props => {
  // Old
  // const [chatroomName, setChatroomName] = useState('');
  // const [chatroomNameValid, setChatroomNameValid] = useState(false);
  // const [chatroomImage, setChatroomImage] = useState('');
  // const [chatroomImageValid, setChatroomImageValid] = useState(true);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [createChatRoomMounted, setCreateChatRoomMounted] = useState(false)
  if (!createChatRoomMounted) { dispatch(getChatrooms('')); }
  useEffect(() => { setCreateChatRoomMounted(true) }, [])

  const iconName = 'search-outline'
  const saerchPlaceholder = 'Search user email'
  // const errorMessageEmail = 'Please fill out search field'

  let matchFound;

  const loggedInUser = useSelector(state => state.user.loggedInUser);
  const searchMatchingUsers = useSelector(state => state.user.searchUsers)
  const myChatrooms = useSelector(state => state.chat.myChatrooms);
  // console.log(myChatrooms)

  const [chatroomUserEmail, setChatroomUserEmail] = useState('');
  const [chatroomUserEmailValid, setChatroomUserEmailValid] = useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState('Please fill out search field');
  const [ownEmail, setOwnEmail] = useState(false);

  const handleEmailInput = emailInput => {
    setChatroomUserEmail(emailInput)

    if (searchMatchingUsers != null && searchMatchingUsers.length == 1) {
      if (searchMatchingUsers[0].email.startsWith(emailInput) && loggedInUser.email.startsWith(emailInput)) {
        setErrorMessageEmail(`Cannot create a chat with your own email`);
        setOwnEmail(true)
        setChatroomUserEmailValid(false)
        // console.log('here')
      } else {
        setErrorMessageEmail(`Please fill out search field`);
        setOwnEmail(false)
        dispatch(searchUsers(emailInput))
      }
    } else {
      if (emailInput == loggedInUser.email) {
        setErrorMessageEmail(`Cannot create a chat with your own email`);
        setOwnEmail(true)
        setChatroomUserEmailValid(false)
      } else {
        setErrorMessageEmail(`Please fill out search field`);
        setOwnEmail(false)
        dispatch(searchUsers(emailInput))
      }
    }
  }

  const handleCancel = () => {
    dispatch(resetUserResearch())
    navigation.goBack()
  }

  if (searchMatchingUsers != null && searchMatchingUsers.length == 0) {
    matchFound = false
  } else {
    matchFound = true
  }

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

      <View style={styles.userSearch}>
        <View style={styles.userSearchInput}>
          <Input
            iconName={iconName}
            inputValid={chatroomUserEmailValid}
            placeholder={saerchPlaceholder}
            errorMessage={errorMessageEmail}
            autoCapitalize={'none'}
            onValid={valid => setChatroomUserEmailValid(valid)}
            setContent={content => handleEmailInput(content)}
          />
        </View>
        <View style={styles.userSearchButton}>
          <Button title='Cancel' onPress={() => handleCancel()}></Button>
        </View>
      </View>

      {/* <Button title='Create Chatroom' onPress={handleCreateChatroom} /> */}

      <View>
        {/* <FlatList
          data={searchMatchingUsers}
          renderItem={itemData => <ChatUser chatUser={itemData.item}></ChatUser>}
          keyExtractor={item => item.id}
        /> */}
        {!matchFound
          ?
          <View style={styles.noUserFound}>
            <Text style={styles.noUserFoundText}>User not found</Text>
            {/* <Text style={styles.noUserFoundText}>Please try another email.</Text> */}
          </View>
          :
          <FlatList
            data={searchMatchingUsers}
            renderItem={itemData => <ChatUser chatUser={itemData.item} ownEmail={ownEmail}></ChatUser>}
            keyExtractor={item => item.id}
          />}
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
  },
  userSearch: {
    flexDirection: 'row',
    height: 100,
    // marginBottom: 10,
  },
  userSearchInput: {
    minWidth: '80%',
    paddingTop: 20,
    marginLeft: 5,
  },
  userSearchButton: {
    minWidth: '20%',
    paddingTop: 20,
    marginLeft: -15,
    marginTop: 5
  },
  noUserFound: {
    margin: 25,
    // padding: 20,
  },
  noUserFoundText: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    color: 'gray',
    textAlign: 'center',
  },
});

export default CreateChatRoom;
