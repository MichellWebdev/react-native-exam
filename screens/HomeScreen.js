import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { getChatroomMessages, getChatrooms } from '../redux-store/actions/ChatActions';

const Home = props => {

  const dispatch = useDispatch();

  const [homeScreenMounted, setHomeScreenMounted] = useState(false)
  if (!homeScreenMounted) { dispatch(getChatrooms()); dispatch(getChatroomMessages()); }
  useEffect(() => { setHomeScreenMounted(true) }, [])

  return (
    <View style={styles.homeContainer}>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
});

export default Home;
