import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Custom components
import Profile from './profile/Profile';

const Menu = props => {
  return (
    <View style={styles.menuContainer}>
      <Profile />
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
});

export default Menu;
