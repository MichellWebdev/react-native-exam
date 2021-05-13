import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

// Custom components
import EventInfo from '../../components/discover/EventInfo';

// Need to improve:
// FlatList gives warning - using SafeAreaView on EventsScreen.tsx worked
// but here it is not working because there are more than one box
// formatDate should also formatTime for FlatList (and not show year)

// Can be deleted when we move schedule to own component
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

const EventsDetail = (props: any) => {
  // For later, when connected to database
  const { title } = props.route.params;
  const { event } = props.route.params;

  const image = { uri: event.image };

  return (
    <ScrollView>
      <View style={styles.eventsDetailContainer}>
        <EventInfo
          image={image}
          eventName={event.eventName}
          eventStartDate={event.startDate}
          eventEndDate={event.endDate}
          eventLocation={event.location}
          eventGroupName={event.groupName}
        />
        <View style={styles.eventsDetailLower}>
          <Text>{event.description}</Text>
        </View>
        <View style={styles.eventsDetailLower}>
          <FlatList
            data={event.schedules}
            renderItem={itemData => (
              <Text>
                {formatDate(itemData.item.time)} {itemData.item.content}
              </Text>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  eventsDetailContainer: {
    marginTop: 30,
  },
  eventsDetailUpper: {
    backgroundColor: 'white',
  },
  eventsDetailLower: {
    margin: 20,
    backgroundColor: 'white',
  },
  evensDetailImage: {
    resizeMode: 'cover',
    height: 250,
  },
  eventDetailText: {
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
});

export default EventsDetail;
