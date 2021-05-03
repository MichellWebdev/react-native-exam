import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import ChatRoom from '../../components/chat/ChatRoom';
import { CHATROOMS } from '../data/dummy';
import { useSelector, useDispatch } from 'react-redux';

const CreateChatRoom = props => {
    return (
        <View>
            <Text> Create Chatroom</Text>
        </View>
    );
);

export default CreateChatRoom;
