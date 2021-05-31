import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

// React redux
import { useDispatch } from 'react-redux';
import { getChatroomMessages, getChatrooms, getChatroomsUsersInfo } from '../redux-store/actions/ChatActions';

// Dummy data
import { EVENTS, STUDORGS } from '../data/dummy';

// Custom components
import EventBox from '../components/discover/EventBox';
import StudentOrgBox from '../components/discover/StudentOrgBox';

const Home = () => {
  const dispatch = useDispatch();
  const [homeScreenMounted, setHomeScreenMounted] = useState(false);

  if (!homeScreenMounted) {
    dispatch(getChatrooms());
    dispatch(getChatroomMessages());
    dispatch(getChatroomsUsersInfo());
  }

  useEffect(() => {
    setHomeScreenMounted(true);
  }, []);

  return (
    <View style={styles.homeContainer}>
      <FlatList
        data={EVENTS || STUDORGS}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}
        renderItem={itemData => (
          <View>
            <EventBox
              boxBackgroundColor='rgba(46, 49, 49, 0.5)'
              boxBackgroundImage={itemData.item.image}
              event={itemData.item}
            />
            <StudentOrgBox
              boxBackgroundColor='rgba(46, 49, 49, 0.5)'
              boxBackgroundImage={itemData.item.orgImage}
              studentOrg={itemData.item}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    margin: 20,
  },
});

export default Home;
