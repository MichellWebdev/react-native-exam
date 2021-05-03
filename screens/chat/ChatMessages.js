import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput, Image } from 'react-native';
import ChatRoom from '../../components/chat/ChatRoom';
import ChatMessage from '../../components/chat/ChatMessage';
import { CHATMESSAGES } from '../../data/dummy'

const ChatMessages = props => {
    // const dispatch = useDispatch();
    // const [value, onChangeText] = useState('Write message');
    // const chatMessages = useSelector(state => state.chat.chatrooms).find(room => room.id === id).chatMessages;

    // const test = useSelector(state => state.chat.test);
    // console.log("test");
    // console.log(test);

    // const handleSend = () => {
    //     console.log("value " + value);
    //     dispatch(addToChats(value, id));
    // };

    const messages = [];
    const { id } = props.route.params;
    // console.log(id);

    CHATMESSAGES.forEach(message => {
        if (message.chatroomId == id) {
            messages.push(message)
        }
    })

    return (
        <View style={styles.container}>

            <View style={styles.messages}>
                <FlatList
                    data={messages}
                    renderItem={itemData => (
                        <ChatMessage
                            chatmessage={itemData.item}
                            img={require('../../assets/images/user.png')}></ChatMessage>
                    )}>
                </FlatList>
            </View>

            {/* <View style={styles.inputView}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../assets/images/user.png')} />

                <TextInput
                    style={styles.textInput}
                    onChangeText={text => onChangeText(text)}
                    value={value} />

                <Button title="Send" onPress={handleSend}></Button>
            </View> */}

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    messages: {
        flex: 1
    },
    textInput: {
        flex: 1,
        height: 40,
        backgroundColor: 'lightgray',
        marginLeft: 10,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginBottom: 10
    },
    inputView: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 5,

    },
    tinyLogo: {

        marginTop: -5
    },
});

export default ChatMessages;