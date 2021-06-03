import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// React redux
import { useSelector } from 'react-redux';

const ChatMessage = props => {
  const loggedInUser = useSelector(state => state.user.loggedInUser);

  // Time Stamp
  const now = new Date();
  const year = now.getFullYear();

  const m = props.chatmessage.createdDate;
  const mYear = m.getFullYear();
  const mMonth = m.getMonth();
  const mDay = m.getDate();

  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  let time;
  if (m.getMinutes() < 10) {
    time = [m.getHours(), '0' + m.getMinutes()].join(':') + ', ';
  } else {
    time = [m.getHours(), m.getMinutes()].join(':') + ', ';
  }

  if (year !== mYear) {
    time += mDay + ' ' + monthNames[mMonth] + ', ' + mYear;
  } else {
    time += mDay + ' ' + monthNames[mMonth];
  }

  // isMe flag
  const isMe = loggedInUser.id === props.chatmessage.writtenBy;

  let name;
  if (!isMe) {
    name = 'From ' + props.chatmessage.writtenBy + ', ';
  }

  // Profile Image
  let image;
  if (!isMe) {
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
    image = <Image style={styles.tinyLogo} source={props.img} />;
  }

  return (
    <View>
      <View style={[styles.container, isMe ? styles.reverseContainer : '']}>
        {image}
        <View style={[styles.messageView, isMe ? styles.messageViewFromMe : '']}>
          <Text style={[styles.message, isMe ? styles.messageFromMe : '']}>{props.chatmessage.text}</Text>
        </View>
      </View>
      <View style={[styles.timeContainer, isMe ? styles.reverseContainer : '']}>
        <Text style={styles.time}>
          {name} {time}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
  },
  timeContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 3,
  },
  reverseContainer: {
    flexDirection: 'row-reverse',
  },
  message: {
    color: '#333333',
  },
  messageFromMe: {
    color: 'white',
  },
  messageView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 15,
    padding: 10,
    maxWidth: '55%',
  },
  messageViewFromMe: {
    backgroundColor: '#5050A5',
    maxWidth: '55%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 5,
  },
  tinyLogo: {
    marginRight: 10,
  },
  time: {
    color: '#333333',
    marginLeft: 60,
    fontSize: 11,
  },
});

export default ChatMessage;
