// Need to improve:
// (1) require using variable, not string
// (2) time display, latest message display

import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ChatUser = props => {
    const navigation = useNavigation();

    console.log(props)
    return (
        <TouchableOpacity
        // onPress={() => navigation.navigate("ChatMessages", { id: props.chatRoom.id, chatroomName: props.chatRoom.name })}
        >
            <View style={styles.chatUser}>
                <View style={styles.imageView}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../../assets/images/chatroom.png')} />
                </View>
                <View style={styles.textView}>
                    <Text style={styles.text}>{props.chatUser.email}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    chatUser: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 15,
        marginLeft: 25,
    },
    textView: {
        width: '80%',
        textAlign: 'center',
    },
    text: {
        fontWeight: "bold",
        fontSize: 18,
        color: 'rgb(64,64,64)',
        paddingLeft: 20
    },
    imageView: {
        // marginTop: -10,
    },
    tinyLogo: {
        width: 65,
        height: 65,
    },
});

export default ChatUser;