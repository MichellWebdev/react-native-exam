import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

// Utils
import { formatDate } from '../../utils/formatDate';

// Custom components
import EventInfo from '../../components/discover/EventInfo';

const EventsDetail = (props: any) => {
  const { event } = props.route.params;
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.0,
    elevation: 2,
    marginBottom: 25,
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
