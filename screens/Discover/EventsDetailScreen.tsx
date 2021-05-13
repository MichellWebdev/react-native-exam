import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

// Custom components
import EventInfo from '../../components/discover/EventInfo';

// Need to improve:
// FlatList gives warning - using SafeAreaView on EventsScreen.tsx worked
// but here it is not working because there are more than one box
// formatDate should also formatTime for FlatList (and not show year)
// TODO: Move schedule into it's own component??

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

  console.log(event.interested.length);

  const image = { uri: event.image };

  return (
    <ScrollView>
      <View>
        <EventInfo
          image={image}
          eventName={event.eventName}
          eventStartDate={event.startDate}
          eventEndDate={event.endDate}
          eventLocation={event.location}
          eventGroupName={event.groupName}
          interestedInEvent={event.interested.length}
          goingToEvent={event.going.length}
        />
        <View style={styles.eventsDetailLower}>
          <Text style={styles.eventDescriptionText}>{event.description}</Text>
        </View>
        <View style={styles.eventsDetailLower}>
          <View style={styles.eventDetailsSchedule}>
            <Text style={styles.eventScheduleHeader}>Schedule</Text>
            <FlatList
              data={event.schedules}
              renderItem={itemData => (
                <View style={styles.eventScheduleText}>
                  <Text style={styles.eventScheduleTime}>{formatDate(itemData.item.time)}</Text>
                  <Text>{itemData.item.content}</Text>
                </View>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  eventsDetailLower: {
    backgroundColor: 'white',
    marginTop: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.0,
    elevation: 2,
  },
  eventDescriptionText: {
    margin: 20,
  },
  eventDetailsSchedule: {
    margin: 20,
  },
  eventScheduleHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#32305D',
  },
  eventScheduleText: {
    flexDirection: 'row',
    paddingLeft: 30,
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#F1F1F1',
  },
  eventScheduleTime: {
    marginRight: 20,
  },
});

export default EventsDetail;
