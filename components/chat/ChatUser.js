// Need to improve:
// (1) require using variable, not string
// (2) time display, latest message display

import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { createChatroom, getChatrooms } from '../../redux-store/actions/ChatActions';

const ChatUser = props => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const loggedInUser = useSelector(state => state.user.loggedInUser);
    const myChatrooms = useSelector(state => state.chat.myChatrooms);

    const ownEmail = (props.chatUser.email == loggedInUser.email)

    const handleCreateChatroom = invitedUser => {

        let alreadyExists = false;

        myChatrooms.forEach(chatroom => {
            chatroom.participants.forEach(user => {
                if (user == invitedUser.email) {
                    alreadyExists = true;
                    navigation.navigate("ChatMessages", { id: chatroom.id, chatroomName: user });
                }
            });
        });

        if (!alreadyExists) {
            dispatch(createChatroom(invitedUser));
            dispatch(getChatrooms());

            myChatrooms.forEach(chatroom => {
                chatroom.participants.forEach(user => {
                    if (user == invitedUser.email) {
                        alreadyExists = true;
                        navigation.navigate("ChatMessages", { id: chatroom.id, chatroomName: user });
                    }
                });
            });
        }

        // dispatch(createChatroom(chatroomName, chatroomImage, chatroomUser));
        // navigation.goBack();

        // console.log(invitedUserId)

        // let oneself = false;
        // let alreadyExists = false;

        // Cannot invite oneself
        // if (chatroomUser == loggedInUser.email) {
        //     oneself = true;
        //     console.log('Cannot create chatroom with yourself');
        // } else {
        //     myChatrooms.forEach(chatroom => {
        //         chatroom.participants.forEach(user => {
        //             if (user == chatroomUser) {
        //                 alreadyExists = true;
        //             }
        //         });
        //     });

        //     if (alreadyExists) {
        //         console.log('Chatroom already exists with this user');
        //     } else {
        //         dispatch(createChatroom(chatroomName, chatroomImage, chatroomUser));
        //         dispatch(getChatrooms());
        //         navigation.goBack();
        //     }
        // }
    };

    return (
        <TouchableOpacity
            onPress={() => handleCreateChatroom(props.chatUser)}
            disabled={props.ownEmail || ownEmail}
        >
            <View style={styles.chatUser}>
                <View style={styles.imageView}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../../assets/images/chatroom.png')} />
                </View>
                <View style={styles.textView}>
                    {!props.ownEmail && !ownEmail
                        ?
                        <Text style={styles.text}>{props.chatUser.email}</Text>
                        :
                        <Text style={styles.textOwnEmail}>{props.chatUser.email} (You)</Text>
                    }
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
    textOwnEmail: {
        fontWeight: "bold",
        fontSize: 18,
        color: 'darkgray',
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