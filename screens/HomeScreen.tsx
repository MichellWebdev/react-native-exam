import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Custom components
import Events from './discover/EventsScreen';
import StudentOrg from './discover/StudentOrgScreen';

const Home = () => {
  return (
    <View style={styles.homeContainer}>
      <Events />
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
});

export default Home;
