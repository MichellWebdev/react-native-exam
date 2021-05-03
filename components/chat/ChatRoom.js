// Need to improve:
// (1) require using variable, not string

import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ChatRoom = props => {
    const navigation = useNavigation();

    // const lastPos = props.chatroom.chatMessages.length - 1;
    // let lastMessageText = '';
    // let displayTime = '';
    // if (lastPos > -1) {
    //     lastMessageText = props.chatroom.chatMessages[props.chatroom.chatMessages.length - 1].message;
    //     const lastTime = props.chatroom.chatMessages[props.chatroom.chatMessages.length - 1].createdDate;

    //     // Should only do this if on the same date as today...
    //     displayTime = lastTime.getHours() + ":" + lastTime.getMinutes();
    // }

    return (
        <TouchableOpacity onPress={() => navigation.navigate("ChatMessages", { id: props.chatRoom.id, chatroomName: props.chatRoom.name })}>
            <View style={styles.chatRoom}>

                <View style={styles.imageView}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../../assets/images/chatroom.png')} />
                </View>
                <View style={styles.textView}>
                    <Text style={styles.text}>{props.chatRoom.name}</Text>
                    {/* <Text ellipsizeMode='tail' numberOfLines={1} >{lastMessageText}</Text> */}
                </View>
                <View style={styles.dotView}>
                    <View style={styles.dot}></View>
                    {/* <Text>{displayTime}</Text> */}
                </View>

                {/* <Button title="Navigate somewhere" 
                    onPress={() => navigation.navigate("nameOfNavigationRouteEgMenu")} /> */}

            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    chatRoom: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    textView: {
        paddingLeft: 5,
        paddingRight: 5,
        width: '80%'
    },
    message: {

    },
    text: {
        fontWeight: "bold",
    },
    dotView: {
        marginLeft: 'auto'

    },
    imageView: {
        marginTop: -10
    },
    dot: {
        height: 12,
        width: 12,
        backgroundColor: '#5050A5',
        borderRadius: 100 / 2,

        // borderRadius: '50%',
        // display: 'inline-block'
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
});

export default ChatRoom;