import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import Input from '../../components/common/Input';
import { createChatroom } from '../../redux-store/actions/ChatActions'

const CreateChatRoom = props => {
    const dispatch = useDispatch();

    const [chatroomName, setChatroomName] = useState('');
    const [chatroomNameValid, setChatroomNameValid] = useState(false);

    const [chatroomUser, setChatroomUser] = useState('');
    const [chatroomUserValid, setChatroomUserValid] = useState(false);

    const [chatroomImage, setChatroomImage] = useState('');
    const [chatroomImageValid, setChatroomImageValid] = useState(true);

    return (
        <View style={styles.container}>
            <Input
                label="Chatroom Name"
                error="Please fill out the chatroom name"
                text={chatroomName}
                nameValid={chatroomNameValid}
                onValid={valid => setChatroomNameValid(valid)}
                setContent={content => setChatroomName(content)}
                autoCapitalize={'none'} />
            <Input
                label="Chatroom Image"
                error="Please choose the chatroom image"
                text={chatroomImage}
                nameValid={chatroomImageValid}
                onValid={valid => setChatroomImageValid(valid)}
                setContent={content => setChatroomImage(content)}
                autoCapitalize={'none'} />
            <Input
                label="Invited User Name"
                error="Please fill out the inviting user name"
                text={chatroomUser}
                nameValid={chatroomUserValid}
                onValid={valid => setChatroomUserValid(valid)}
                setContent={content => setChatroomUser(content)}
                autoCapitalize={'none'} />

            <Button title="Create Chatroom" onPress={() => { dispatch(createChatroom(chatroomName, chatroomImage, chatroomUser)) }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CreateChatRoom;
