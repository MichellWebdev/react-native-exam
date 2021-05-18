import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const ChatMessage = props => {

    const loggedInUser = useSelector(state => state.user.loggedInUser);

    // Time Stamp
    const now = new Date();
    const year = now.getFullYear();

    const m = props.chatmessage.createdDate;
    const mYear = m.getFullYear();
    const mMonth = m.getMonth();
    const mDay = m.getDate();

    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    let time;
    if (m.getMinutes() < 10) {
        time = [m.getHours(), '0' + m.getMinutes()].join(':') + ', '
    } else {
        time = [m.getHours(), m.getMinutes()].join(':') + ', '
    }

    if (year !== mYear) {
        time += mDay + ' ' + monthNames[mMonth] + ', ' + mYear
    } else {
        time += mDay + ' ' + monthNames[mMonth]
    }


    // isMe flag
    const isMe = loggedInUser.id === props.chatmessage.writtenBy.id;

    let name;
    if (!isMe) {
        name = 'From ' + props.chatmessage.writtenBy.email + ', ';
    }


    // Profile Image
    let image;
    if (!isMe) {
        image = <Image
            style={styles.tinyLogo}
            source={props.img} />
    }


    return (
        <View style={styles.outerContainer}>
            <View style={[styles.container, isMe ? styles.reverseContainer : '']}>
                {image}
                <View style={[styles.messageView, isMe ? styles.messageViewFromMe : '']}>
                    <Text style={[styles.message, isMe ? styles.messageFromMe : '']}>
                        {props.chatmessage.text}</Text>
                </View>
            </View>
            <View style={[styles.timeContainer, isMe ? styles.reverseContainer : '']}>
                <Text style={styles.time}>{name}  {time}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10,
    },
    timeContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 3,
    },
    reverseContainer: {
        flexDirection: 'row-reverse',

    },
    message: {
        color: '#333333'
    },
    messageFromMe: {
        color: 'white',

    },
    messageView: {
        //  flex: 0.8,
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 15,
        padding: 10,
        maxWidth: '55%',
    },
    messageViewFromMe: {
        backgroundColor: '#5050A5',
        right: 0,
        marginRight: 5,
        maxWidth: '55%',
    },
    tinyLogo: {
        marginTop: -5
    },
    time: {
        color: '#333333',
        marginLeft: 60,
        fontSize: 11,
        // paddingTop: 3
    },
});

export default ChatMessage;