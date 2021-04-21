import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Home = props => {
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
