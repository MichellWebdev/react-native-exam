import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { EVENTS } from '../../models/dummy';
import EventBox from '../../components/discover/EventBox';

const Events = () => {

    return (
        <View>
            <FlatList
                data={EVENTS}
                renderItem={itemData => (
                    <EventBox chatroom={itemData.item}></EventBox>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

export default Events;