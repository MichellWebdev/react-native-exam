import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Discover = props => {
  return (
    <View style={styles.discoverContainer}>
      <Text>Discover</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  discoverContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
});

export default Discover;
