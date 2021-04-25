import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import StyleSheetFactory from '../common/StyleSheetFactory';
import DiscoverEvent from '../../models/DiscoverEvent'


interface EventBoxLabels {
    boxBackgroundColor: string;
    boxBackgroundImage: string;
    event: DiscoverEvent;
}

const EventBox = ({
    boxBackgroundColor,
    boxBackgroundImage,
    event,
}: EventBoxLabels) => {

    const navigation = useNavigation();

    const styles = StyleSheetFactory.getSheet(boxBackgroundColor, boxBackgroundImage);
    const image = { uri: boxBackgroundImage };

    return (
        <View style={styles.eventBoxContainer}>
            <TouchableOpacity
                onPress={() => navigation.navigate("EventsDetail", { title: event.eventName })}
            >
                <ImageBackground
                    style={styles.eventBoxImage}
                    resizeMode='cover'
                    source={image}
                >
                    <View style={styles.eventBoxContentsContainer} >
                        <Text style={styles.eventBigBold}>{event.eventName}</Text>
                        <Text style={styles.eventSmallNonbold}>{event.groupName}</Text>
                        <View style={styles.eventBoxLabelContainer}>
                            <Ionicons name='time' color='white' />
                            <Text style={styles.eventSmallBold}>{event.startDate}</Text>
                        </View>
                        <View style={styles.eventBoxLabelContainer}>
                            <Ionicons name='location' color='white' />
                            <Text style={styles.eventSmallNonbold}> {event.location}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default EventBox;
