import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// React navigation
import { useNavigation } from '@react-navigation/native';

// React redux
import { useSelector, useDispatch } from 'react-redux';
import { createChatroom, getChatrooms, getChatroomsUsersInfo } from '../../redux-store/actions/ChatActions';
import { resetUserResearch } from '../../redux-store/actions/UserActions';

// React uuid
import uuid from 'react-native-uuid';

// Common Components
import { images } from '../../assets/images/images';

const ChatUser = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const loggedInUser = useSelector(state => state.user.loggedInUser);
  const myChatrooms = useSelector(state => state.chat.myChatrooms);

  const ownEmail = props.chatUser.email == loggedInUser.email;

  const handleCreateChatroom = invitedUser => {
    let alreadyExists = false;

    myChatrooms.forEach(chatroom => {
      if (chatroom.participants[0] == invitedUser.id || chatroom.participants[1] == invitedUser.id) {
        alreadyExists = true;

        dispatch(resetUserResearch());

        navigation.goBack();
        navigation.navigate('ChatMessages', { chatroomId: chatroom.id, chatroomName: invitedUser.name, participantImage: invitedUser.image, participantName: invitedUser.name });
      }
    });

    if (!alreadyExists) {
      const chatroomId = uuid.v4();
      dispatch(createChatroom(invitedUser, chatroomId));
      dispatch(resetUserResearch());
      dispatch(getChatrooms());
      dispatch(getChatroomsUsersInfo());

      navigation.goBack();
      navigation.navigate('ChatMessages', { chatroomId: chatroomId, chatroomName: invitedUser.name, participantImage: invitedUser.image, participantName: invitedUser.name });
    }
  };

  let path = '';
  switch (props.chatUser.image) {
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
    <TouchableOpacity onPress={() => handleCreateChatroom(props.chatUser)} disabled={props.ownEmail || ownEmail}>
      <View style={styles.chatUser}>
        <View style={styles.imageView}>
          <Image style={styles.tinyLogo} source={path} />
        </View>
        <View style={styles.textView}>
          {!props.ownEmail && !ownEmail ? (
            <Text style={styles.text}>{props.chatUser.email}</Text>
          ) : (
            <Text style={styles.textOwnEmail}>{props.chatUser.email} (You)</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chatUser: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    marginLeft: 25,
  },
  textView: {
    width: '80%',
    textAlign: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'rgb(64,64,64)',
    paddingLeft: 20,
  },
  textOwnEmail: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'darkgray',
    paddingLeft: 20,
  },
  tinyLogo: {
    width: 65,
    height: 65,
    borderRadius: 50
  },
});

export default ChatUser;
