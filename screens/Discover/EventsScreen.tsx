import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { EVENTS } from '../../data/dummy';
import EventBox from '../../components/discover/EventBox';

const Events = () => {

    return (
        <View style={styles.eventScreenContainer}>
            <FlatList
                data={EVENTS}
                renderItem={itemData => (
                    <EventBox
                        boxBackgroundColor='rgba(46, 49, 49, 0.5)'
                        boxBackgroundImage={itemData.item.image}
                        event={itemData.item}
                    />
                )}
                keyExtractor={item => item.id}
            />
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

export default Events;