import React, { useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const EventsDetail = (props: any) => {

    // For later, when connected to database
    const { title } = props.route.params;
    const { event } = props.route.params;

    const image = { uri: event.image };

    return (
        <ScrollView>
            <View style={styles.eventsDetailContainer}>
                <View style={styles.eventsDetailUpper}>
                    <ImageBackground
                        style={styles.evensDetailImage}
                        source={image}
                    />
                    <View>
                        <Text>{event.eventName}</Text>
                        <View >
                            <Ionicons name='time' color='black' />
                            <Text>{event.startDate} - {event.endDate}</Text>
                        </View>
                        <View>
                            <Ionicons name='location' color='black' />
                            <Text> {event.location}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.eventsDetailLower}>
                    <Text>Hi</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    eventsDetailContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 30,
    },
    eventsDetailUpper: {
        width: '100%',
        height: 600,
        backgroundColor: 'white',
        marginBottom: 30,
    },
    eventsDetailLower: {
        width: '100%',
        height: 200,
        minHeight: 100,
        backgroundColor: 'white',
        marginBottom: 30,
    },
    evensDetailImage: {
        resizeMode: 'cover',
        justifyContent: 'center',
        height: 250,
    },
});

export default EventsDetail;