import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

// Redux
import { useDispatch } from 'react-redux';
import { getChatroomMessages, getChatrooms } from '../redux-store/actions/ChatActions';

// Dummy data
import { EVENTS, HOME, STUDORGS } from '../data/dummy';

// Custom components
import EventBox from '../components/discover/EventBox';
import StudentOrgBox from '../components/discover/StudentOrgBox';

// TODO:
// Fix home so studentsorgs image and info works as well
// I've tried to create another model but I can't get it to work
// Alternative is to only have either events or studentorgs on homepage

const Home = () => {
  const dispatch = useDispatch();

  const [homeScreenMounted, setHomeScreenMounted] = useState(false);
  if (!homeScreenMounted) {
    dispatch(getChatrooms());
    dispatch(getChatroomMessages());
  }
  useEffect(() => {
    setHomeScreenMounted(true);
  }, []);

  return (
    <View style={styles.homeContainer}>
      <FlatList
        data={EVENTS || STUDORGS}
        renderItem={itemData => (
          <View>
            <EventBox
              boxBackgroundColor='rgba(46, 49, 49, 0.5)'
              // boxBackgroundImage={itemData.item.event[0].image}
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
