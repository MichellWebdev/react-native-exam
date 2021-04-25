import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EventsDetail = (props: any) => {

    const { title } = props.route.params;
    console.log('t', title)
    return (
        <View style={styles.eventScreenContainer}>
            <Text>Hi</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    eventScreenContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 30,
    },
});

export default EventsDetail;