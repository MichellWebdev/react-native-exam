import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { EVENTS } from '../../data/dummy';
import EventBox from '../../components/discover/EventBox';
import { SafeAreaView } from 'react-native-safe-area-context';

const Events = () => {

    return (
        <SafeAreaView style={styles.eventScreenContainer}>
            <View>
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    eventScreenContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: -15,
    }
});

export default Events;