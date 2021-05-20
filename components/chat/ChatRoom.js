// Need to improve:
// (1) require using variable, not string
// (2) time display, latest message display
// (3) chatroom name - user name instead of email

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { getChatroomsUsersInfo } from '../../redux-store/actions/ChatActions';
// import { getChatroomMessages } from '../../redux-store/actions/ChatActions';

const ChatRoom = props => {
    const navigation = useNavigation();
    const loggedInUser = useSelector(state => state.user.loggedInUser);
    const chatroomsUsersInfo = useSelector(state => state.chat.chatroomsUsersInfo)

    // Time Stamp
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();

    let displayTime;
    let latestText;

    // Message Read
    let read = false;
    if (props.latestMessages.read) {
        read = true;
    }

    // Lastest Message
    let latestMessageExists = false;
    if (props.latestMessages !== undefined && props.latestMessages !== null && props.latestMessages.length !== 0) {
        props.latestMessages.forEach(message => {
            if (message.chatroomId == props.chatRoom.id) {
                const m = message.createdDate;
                const mYear = m.getFullYear();
                const mMonth = m.getMonth();
                const mDay = m.getDate();

                if (year !== mYear) {
                    displayTime = mYear
                } else if (month !== mMonth || day !== mDay) {
                    displayTime = mDay + ' ' + monthNames[mMonth]
                } else {
                    if (m.getMinutes() < 10) {
                        displayTime = [m.getHours(), '0' + m.getMinutes()].join(':')
                    } else {
                        displayTime = [m.getHours(), m.getMinutes()].join(':')
                    }
                }

                if (message.writtenBy == loggedInUser.id) {
                    latestText = '(You) ' + message.text
                    read = true;
                } else {
                    latestText = message.text
                    // read = false;
                }

                latestMessageExists = true;
            }
        })
    }

    // Another participant name
    let participantName = '';
    chatroomsUsersInfo.forEach(user => {
        if (user.id == props.chatRoom.participants[0]) {
            participantName = user.name
        } else if (user.id == props.chatRoom.participants[1]) {
            participantName = user.name
        }
    })

    return (
        <TouchableOpacity onPress={() => navigation.navigate("ChatMessages", { chatroomId: props.chatRoom.id, chatroomName: participantName })}>
            <View style={styles.chatRoom}>
                <View style={styles.imageView}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../../assets/images/chatroom.png')} />
                </View>
                <View style={styles.textView}>

                    <Text style={styles.text}>
                        <View>
                            <Text style={styles.text}>{participantName}</Text>
                            <Text ellipsizeMode='tail' numberOfLines={1} >{latestText}</Text>
                        </View>
                    </Text>
                </View>
                <View style={styles.dotView}>
                    {
                        latestMessageExists
                            ?
                            <View style={[read ? styles.undot : styles.dot]}></View>
                            :
                            <View style={styles.undot}></View>
                    }
                    <Text>{displayTime}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    chatRoom: {
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: 10,
        // paddingLeft: 20,
        // paddingRight: 5,
        // paddingTop: 20,
        width: '90%',
        // height: 80
    },
    textView: {
        // paddingLeft: 5,
        // paddingRight: 5,
        width: '75%'
    },
    message: {

    },
    text: {
        fontWeight: "bold",
    },
    dotView: {
        marginLeft: 'auto'
        // alignItems: 'center',
        // margin: 5
    },
    imageView: {
        // marginTop: -10
    },
    dot: {
        height: 12,
        width: 12,
        backgroundColor: '#5050A5',
        borderRadius: 100 / 2,

        // borderRadius: '50%',
        // display: 'inline-block'
    },
    undot: {
        height: 12,
        width: 12,
        backgroundColor: 'white',
        borderRadius: 100 / 2,

        // borderRadius: '50%',
        // display: 'inline-block'
    },
    tinyLogo: {
        // width: 50,
        // height: 50,
    },
});

export default ChatRoom;



// New
// <TouchableOpacity onPress={
//     props.chatRoom.participants[0].id == loggedInUser.id
//         ?
//         () => navigation.navigate("ChatMessages", { chatroomId: props.chatRoom.id, chatroomName: props.chatRoom.participants[1].email })
//         :
//         () => navigation.navigate("ChatMessages", { chatroomId: props.chatRoom.id, chatroomName: props.chatRoom.participants[0].email })
// }>
{/* <Text style={styles.text}>{
    props.chatRoom.participants[0].id == loggedInUser.id
        ?
        <View>
            <Text style={styles.text}>{props.chatRoom.participants[1].email}</Text>
            <Text ellipsizeMode='tail' numberOfLines={1} >{latestText}</Text>
        </View>
        :
        <View>
            <Text style={styles.text}>{props.chatRoom.participants[0].email}</Text>
            <Text ellipsizeMode='tail' numberOfLines={1} >{latestText}</Text>
        </View>
}
</Text> */}



// Old
// <View>
//     {
//         props.chatRoom.participants[0].id == loggedInUser.id
//             ?
//             <TouchableOpacity onPress={() => navigation.navigate("ChatMessages", { chatroomId: props.chatRoom.id, chatroomName: props.chatRoom.participants[1].email })}>
//                 <View style={styles.chatRoom}>

//                     <View style={styles.imageView}>
//                         <Image
//                             style={styles.tinyLogo}
//                             source={require('../../assets/images/chatroom.png')} />
//                     </View>
//                     <View style={styles.textView}>
//                         {
//                             props.chatRoom.participants[0].id == loggedInUser.id
//                                 ?
//                                 <View>
//                                     <Text style={styles.text}>{props.chatRoom.participants[1].email}</Text>
//                                     {/* <Text ellipsizeMode='tail' numberOfLines={1} >{latestMessage}</Text> */}
//                                 </View>
//                                 :
//                                 <View>
//                                     <Text style={styles.text}>{props.chatRoom.participants[0].email}</Text>
//                                     {/* <Text ellipsizeMode='tail' numberOfLines={1} >{latestMessage}</Text> */}
//                                 </View>
//                         }
//                     </View>
//                     <View style={styles.dotView}>
//                         <View style={styles.dot}></View>
//                     </View>
//                 </View>
//             </TouchableOpacity>
//             :
//             <TouchableOpacity onPress={() => navigation.navigate("ChatMessages", { chatroomId: props.chatRoom.id, chatroomName: props.chatRoom.participants[0].email })}>
//                 <View style={styles.chatRoom}>

//                     <View style={styles.imageView}>
//                         <Image
//                             style={styles.tinyLogo}
//                             source={require('../../assets/images/chatroom.png')} />
//                     </View>
//                     <View style={styles.textView}>
//                         {
//                             props.chatRoom.participants[0].id == loggedInUser.id
//                                 ?
//                                 <View>
//                                     <Text style={styles.text}>{props.chatRoom.participants[1].email}</Text>
//                                     {/* <Text ellipsizeMode='tail' numberOfLines={1} >{latestMessage}</Text> */}
//                                 </View>
//                                 :
//                                 <View>
//                                     <Text style={styles.text}>{props.chatRoom.participants[0].email}</Text>
//                                     {/* <Text ellipsizeMode='tail' numberOfLines={1} >{latestMessage}</Text> */}
//                                 </View>
//                         }
//                     </View>
//                     <View style={styles.dotView}>
//                         <View style={styles.dot}></View>
//                     </View>
//                 </View>
//             </TouchableOpacity>
//     }
// </View>





// Older
// let noMessages = false;
// if (openedChatroomMessages == null || openedChatroomMessages.length == 0) { noMessages = true; } else { noMessages = false; }

// const lastPos = props.chatroom.chatMessages.length - 1;
// let lastMessageText = '';
// let displayTime = '';
// if (lastPos > -1) {
//     lastMessageText = props.chatroom.chatMessages[props.chatroom.chatMessages.length - 1].message;
//     const lastTime = props.chatroom.chatMessages[props.chatroom.chatMessages.length - 1].createdDate;

//     // Should only do this if on the same date as today...
//     displayTime = lastTime.getHours() + ":" + lastTime.getMinutes();
// }

// <TouchableOpacity onPress={() => navigation.navigate("ChatMessages", { id: props.chatRoom.id, chatroomName: anotherEmail })}>
//     <View style={styles.chatRoom}>

//         <View style={styles.imageView}>
//             <Image
//                 style={styles.tinyLogo}
//                 source={require('../../assets/images/chatroom.png')} />
//         </View>
//         <View style={styles.textView}>
//             {
//                 props.chatRoom.participants[0] == loggedInUser.email
//                     ?
//                     <Text style={styles.text}>{props.chatRoom.participants[1]}</Text>
//                     :
//                     <Text style={styles.text}>{props.chatRoom.participants[0]}</Text>
//             }
//             {/* <Text ellipsizeMode='tail' numberOfLines={1} >{lastMessageText}</Text> */}
//         </View>
//         <View style={styles.dotView}>
//             <View style={styles.dot}></View>
//             {/* <Text>{displayTime}</Text> */}
//         </View>

//         {/* <Button title="Navigate somewhere" 
//             onPress={() => navigation.navigate("nameOfNavigationRouteEgMenu")} /> */}

//     </View>
// </TouchableOpacity>