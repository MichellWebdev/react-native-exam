import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// React navigation
import { useNavigation } from '@react-navigation/native';

// React redux
import { useSelector } from 'react-redux';

// Common component
import { images } from '../../assets/images/images';

const ChatRoom = props => {
  const navigation = useNavigation();
  const loggedInUser = useSelector(state => state.user.loggedInUser);
  const chatroomsUsersInfo = useSelector(state => state.chat.chatroomsUsersInfo);

  // Time Stamp
  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  let displayTime;
  let latestText;

  // Message Read
  let read = false;
  if (props.latestMessages.read) {
    read = true;
  }

  // Lastest Message
  let latestMessageExists = false;
  if (props.latestMessages !== undefined && props.latestMessages !== null && props.latestMessages.length !== 0) {
    props.latestMessages.forEach(message => {
      if (message.chatroomId == props.chatRoom.id) {
        const m = message.createdDate;
        const mYear = m.getFullYear();
        const mMonth = m.getMonth();
        const mDay = m.getDate();

        if (year !== mYear) {
          displayTime = mYear;
        } else if (month !== mMonth || day !== mDay) {
          displayTime = mDay + ' ' + monthNames[mMonth];
        } else {
          if (m.getMinutes() < 10) {
            displayTime = [m.getHours(), '0' + m.getMinutes()].join(':');
          } else {
            displayTime = [m.getHours(), m.getMinutes()].join(':');
          }
        }

        if (message.writtenBy == loggedInUser.id) {
          latestText = '(You) ' + message.text;
          read = true;
        } else {
          latestText = message.text;
          read = false;
        }

        latestMessageExists = true;
      }
    });
  }

  // Another participant name
  let participantName = '';
  let participantImage = '';
  // going through the participants in the chatroom
  chatroomsUsersInfo.forEach(user => {
    if (user.id == props.chatRoom.participants[0]) {
      participantName = user.name;
      participantImage = user.image;
    } else if (user.id == props.chatRoom.participants[1]) {
      participantName = user.name;
      participantImage = user.image;
    }
  });

  // Profile image
  let path = '';
  switch (participantImage) {
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
      path = require('../../assets/images/images.js');
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ChatMessages', {
            chatroomId: props.chatRoom.id,
            chatroomName: participantName,
            participantImage: path,
            participantName: participantName,
          })
        }>
        <View style={styles.chatRoom}>
          <View style={styles.imageContainer}>
            <Image style={styles.tinyLogo} source={path} />
          </View>
          <View style={styles.textView}>
            <View>
              <Text style={styles.text}>{participantName}</Text>
              <Text ellipsizeMode='tail' numberOfLines={1}>
                {latestText}
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.dotView}>
              {latestMessageExists ? (
                <View style={[read ? styles.undot : styles.dot]}></View>
              ) : (
                <View style={styles.undot}></View>
              )}
            </View>
            <Text>{displayTime}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  chatRoom: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 20,
  },
  textView: {
    flex: 2,
    marginLeft: 15,
    marginRight: 15,
    maxWidth: 225,
  },
  text: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 17,
  },
  dotView: {
    marginLeft: 'auto',
    marginBottom: 10,
    marginRight: 13,
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,

    elevation: 1,
    marginRight: 5,
    marginLeft: 5,
  },
  dot: {
    height: 12,
    width: 12,
    // backgroundColor: '#5050A5',
    backgroundColor: '#FF1493',
    borderRadius: 100 / 2,
    marginLeft: 7,
  },
  undot: {
    height: 12,
    width: 12,
    borderRadius: 100 / 2,
  },
  tinyLogo: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});

export default ChatRoom;
