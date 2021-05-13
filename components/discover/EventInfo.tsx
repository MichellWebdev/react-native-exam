import React, { useState } from 'react';
import { ImageBackground, Image, StyleSheet, Text, View } from 'react-native';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// Custom components
import Button from '../common/Button';

// https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
function formatDate(date: Date) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('.');
}

interface EventInfoProps {
  image: any;
  eventName: string;
  eventStartDate: Date;
  eventEndDate: Date;
  eventLocation: string;
  eventGroupName: string;
  interestedInEvent: any;
  goingToEvent: any;
}

const EventInfo = ({
  image,
  eventName,
  eventStartDate,
  eventEndDate,
  eventLocation,
  eventGroupName,
  interestedInEvent,
  goingToEvent,
}: EventInfoProps) => {
  return (
    <View style={styles.eventInfo}>
      <ImageBackground style={styles.eventInfoImage} source={image} />
      <View style={styles.eventInfoText}>
        <Text style={styles.eventHeader}>{eventName}</Text>
        <View style={styles.eventTimeLocation}>
          <Ionicons name='time' color='black' size={15} />
          <Text style={styles.eventTimeText}>
            {formatDate(eventStartDate)} - {formatDate(eventEndDate)}
          </Text>
        </View>
        <View style={styles.eventTimeLocation}>
          <Ionicons name='location' color='black' size={15} />
          <Text style={styles.eventLocationText}>{eventLocation}</Text>
        </View>
        <View style={styles.eventGroup}>
          <View style={styles.groupContainer}>
            <Image style={styles.eventGroupImage} source={require('../../assets/images/cbsStudentsLogo.png')} />
            <Text style={styles.groupNameText}>{eventGroupName}</Text>
          </View>
          <View style={styles.chatIcon}>
            <Ionicons name='chatbubbles' color='white' size={20} />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            secondaryBtn
            buttonWidth={'50%'}
            buttonText={'Interested'}
            onPress={() => {
              console.log('interested..');
            }}
          />
          <Button
            secondaryBtn
            buttonWidth={'50%'}
            buttonText={'Going'}
            onPress={() => {
              console.log('going...');
            }}
          />
        </View>
        <View style={styles.eventParticipants}>
          <View style={styles.participants}>
            <Ionicons name='star' size={20} />
            <Text style={styles.goingText}>{interestedInEvent} Interested</Text>
          </View>
          <View style={styles.participants}>
            <Ionicons name='checkbox-outline' size={20} />
            <Text style={styles.goingText}>{goingToEvent} Going</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  eventInfo: {
    marginBottom: 25,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.0,

    elevation: 2,
  },
  eventInfoImage: {
    resizeMode: 'cover',
    height: 250,
  },
  eventInfoText: {
    margin: 20,
  },
  eventHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventTimeLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventTimeText: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 17,
  },
  eventLocationText: {
    marginLeft: 10,
    fontSize: 17,
  },
  eventGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#F1F1F1',
    borderRadius: 5,
    padding: 7,
  },
  groupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventGroupImage: {
    width: 40,
    height: 40,
  },
  groupNameText: {
    fontWeight: 'bold',
  },
  chatIcon: {
    backgroundColor: '#504FA5',
    padding: 7,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 10,
  },
  eventParticipants: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  participants: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  goingText: {
    marginLeft: 10,
    marginRight: 25,
  },
});

export default EventInfo;
