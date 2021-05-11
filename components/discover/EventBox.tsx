import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import StyleSheetFactory from '../common/StyleSheetFactory';
import DiscoverEvent from '../../models/DiscoverEvent';

interface EventBoxLabels {
  boxBackgroundColor: string;
  boxBackgroundImage: string;
  event: DiscoverEvent;
}

const EventBox = ({ boxBackgroundColor, boxBackgroundImage, event }: EventBoxLabels) => {
  const navigation = useNavigation();

  const styles = StyleSheetFactory.getSheet(boxBackgroundColor, boxBackgroundImage);
  const image = { uri: boxBackgroundImage };

  const date = formatDate(event.startDate);

  // https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
  function formatDate(date: Date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('.');
  }

  return (
    <View style={styles.eventBoxContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('EventsDetail', { title: event.eventName, event: event })}>
        <ImageBackground style={styles.eventBoxImage} resizeMode='cover' source={image}>
          <View style={styles.eventBoxContentsContainer}>
            <Text style={styles.eventName}>{event.eventName}</Text>
            <Text style={styles.eventGroup}>{event.groupName}</Text>
            <View style={styles.eventBoxLabelContainer}>
              <Ionicons name='time' color='white' />
              <Text style={styles.eventDate}>{date}</Text>
            </View>
            <View style={styles.eventBoxLabelContainer}>
              <Ionicons name='location' color='white' />
              <Text style={styles.eventLocation}> {event.location}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default EventBox;
